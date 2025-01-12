<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingCartStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product' => 'required|numeric'
        ];
    }

    // 'table' => 'required|numeric',
    //         'product' => 'required|date',
    //         'time' => 'required|date_format:H:i:s',
    //         'no_people' => 'required|numeric',
    //         'has_order' => 'nullable|boolean',
}
