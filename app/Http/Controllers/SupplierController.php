<?php

namespace App\Http\Controllers;

use App\Enums\IsDeleted;
use App\Http\Requests\SupplierStoreRequest;
use App\Http\Requests\SupplierUpdateRequest;
use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Laravel\Prompts\search;

class SupplierController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search');

        $suppliers = Supplier::with('address');
        if ($search) {
            $suppliers = $suppliers->whereAny(
                [
                    'name',
                    'phone',
                    'email',
                    'telephone',
                ],
                'like',
                '%' . $search . '%'
            )
                ->orWhereHas('address', function ($query) use ($search) {
                    $query->whereAny([
                        'street',
                        'barangay',
                        'city',
                        'province'
                    ], 'like', '%' . $search . '%');
                });
        }

        $suppliers = $suppliers->isNotDeleted()->latest()->paginate(10)->withQueryString();
        return Inertia::render("Admin/Suppliers", [
            'suppliers' => $suppliers,
            'search' => $search
        ]);
    }

    public function update(SupplierUpdateRequest $request, Supplier $supplier)
    {
        $validated = $request->all();

        $supplier->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'telephone' => $validated['telephone']
        ]);

        $address = Address::where('supplier_id', $supplier->id)->first();

        $address->update([
            'street' => $validated['street'],
            'barangay' => $validated['barangay'],
            'city' => $validated['city'],
            'province' => $validated['province'],
        ]);

        return back();
    }


    public function store(SupplierStoreRequest $request)
    {
        $validated = $request->all();

        $supplier = Supplier::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'telephone' => $validated['telephone']
        ]);

        Address::create([
            'street' => $validated['street'],
            'barangay' => $validated['barangay'],
            'city' => $validated['city'],
            'province' => $validated['province'],
            'supplier_id' => $supplier->id
        ]);

        return back();
    }


    public function delete(Supplier $supplier)
    {
        $supplier->is_deleted = IsDeleted::YES->value;
        $supplier->save();

        return to_route("suppliers.index");
    }
}
