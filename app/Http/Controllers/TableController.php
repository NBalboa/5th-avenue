<?php

namespace App\Http\Controllers;

use App\Http\Requests\TableStoreRequest;
use App\Http\Requests\TableUpdateRequest;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    public function index(Request $request){


        $tables = Table::select('id','no','name', 'description','created_at', 'updated_at');
        $search = $request->input('search');

        if($search){
            $tables = $tables->search($search);
        }

        $tables = $tables->paginate(10)->withQueryString();

        return Inertia::render('Admin/Tables', [
            'tables' => $tables,
        ]);
    }



    public function store(TableStoreRequest $request){
        $data = $request->validated();

        Table::create([
            'no' => $data['no'],
            'name' => $data['name'],
            'description' => $data['description']
        ]);

        return back();
    }


    public function update(TableUpdateRequest $request, Table $table){
        $data = $request->validated();
        $table->name = $data['name'];
        $table->description = $data['description'];
        $table->save();

        return back();
    }
}
