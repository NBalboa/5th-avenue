<?php

namespace App\Http\Controllers;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
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
                'supplier' => 'required|numeric'
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
                    'quantity' => $validated['quantity']
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
            $products = $products->search($search);
        }

        if ($category) {
            $products = $products->byCategory($category);
        }

        $products =  $products->latest()->paginate(10)->withQueryString();

        $products->getCollection()->transform(function ($product) {
            $product->image = Storage::url($product->image);
            return $product;
        });

        return Inertia::render("Admin/Products", [
            'suppliers' => $suppliers,
            'categories' => $categories,
            'products' => $products,
            'category' => $category,
            'search' => $search,
        ]);
    }
}
