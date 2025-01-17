<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use App\Http\Requests\ProductAddQuantityRequest;
use App\Http\Requests\ProductDeleteQuantityRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function store(ProductStoreRequest $request)
    {
        $by_quantity = filter_var($request->input('by_quantity'), FILTER_VALIDATE_BOOLEAN);

        if ($by_quantity === true) {
            $request->validate([
                'quantity' => 'required|numeric',
            ]);
        }


        $validated = $request->all();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product/images', 'public');
        }
        DB::beginTransaction();

        try {
            $product = Product::create([
                'name' => $validated['name'],
                'price' => $validated['price'],
                'category_id' => $validated['category'],
                'image' => $path,
                'quantity' => $validated['quantity']
            ]);
            if ($by_quantity === true) {
                Stock::create([
                    'product_id' => $product->id,
                    'supplier_id' => $validated['supplier'],
                    'quantity' => $validated['quantity'],
                    'description' => 'New Products',
                ]);
            }

            DB::commit();
            return back();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error', $e->getMessage()]);
        }
    }

    public function delete(Product $product)
    {
        $product->is_deleted = IsDeleted::YES->value;
        $product->save();

        return back();
    }


    public function updateAvailable(Request $request, Product $product)
    {

        $product->is_available = $request->input('available') === true ? IsAvailable::NO->value : IsAvailable::YES->value;
        $product->save();

        return back();
    }

    public function update(ProductUpdateRequest $request, Product $product)
    {
        $validated = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product/images', 'public');
        }

        $product->name = $validated['name'];
        $product->category_id = $validated['category'];
        $product->price = $validated['price'];

        if ($validated['image']) {
            $product->image = $path;
        }
        $product->save();

        return back();
    }


    public function index(Request $request)
    {
        $suppliers = Supplier::isNotDeleted()->get();
        $categories = Category::isNotDeleted()->get();

        $category = $request->input('category');
        $search = $request->input('search');
        $products = Product::with('category')->isNotDeleted();

        if ($search) {
            $products = $products->search($search)
                ->orWhereHas('category', function($query) use($search) {
                    $query->isNotDeleted()->search($search);
                });
        }

        if ($category) {
            $products = $products->byCategory($category);
        }

        $products =  $products->isNotDeleted()->latest()->paginate(10)->withQueryString();


        return Inertia::render("Admin/Products", [
            'suppliers' => $suppliers,
            'categories' => $categories,
            'products' => $products,
            'category' => $category,
            'search' => $search,
        ]);
    }


    public function addQuantity(ProductAddQuantityRequest $request, Product $product){
        $data = $request->validated();
        $product->quantity += $data['quantity'];

        Stock::create([
            'product_id'=>  $product->id,
            'supplier_id'=>  $data['supplier'],
            'quantity' => $data['quantity'],
            'description'=>  "Add"
        ]);

        $product->save();

        return back();
    }
    public function deleteQuantity(ProductDeleteQuantityRequest $request, Product $product){
        $data = $request->validated();

        if($product->quantity >= $data['quantity']){
            $product->quantity -= $data['quantity'];

            Stock::create([
                'product_id'=>  $product->id,
                'supplier_id'=>  $data['supplier'],
                'quantity' => $data['quantity'],
                'description'=>  "Delete"
            ]);

            $product->save();
        }

        return back();
    }
}
