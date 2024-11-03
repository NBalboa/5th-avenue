<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierStoreRequest;
use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
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
}
