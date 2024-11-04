<?php

namespace App\Http\Controllers;

use App\Enums\IsDeleted;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $categories = Category::isNotDeleted();
        $search = $request->input('search');
        if ($search) {
            $categories =  $categories->where('name', 'like', '%' . $search . '%');
        }
        $categories = $categories->latest()->paginate(10);
        return Inertia::render("Admin/Categories", [
            'categories' => $categories,
            'search' => $request->input('search')
        ]);
    }


    public function store(CategoryStoreRequest $request)
    {
        $validated = $request->all();
        Category::create([
            'name' => $validated['name']
        ]);

        return back();
    }


    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $validated = $request->all();
        $category->update([
            'name' => $validated['name']
        ]);

        return back();
    }


    public function delete(Category $category)
    {
        $category->is_deleted = IsDeleted::YES->value;
        $category->save();

        return back();
    }
}
