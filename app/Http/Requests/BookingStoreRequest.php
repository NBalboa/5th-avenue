<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingStoreRequest extends FormRequest
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
            'table' => 'required|numeric',
            'gcash_reference_id' => 'required_if:has_order,true|nullable|numeric',
            'image' => 'required_if:has_order,true|nullable|image|mimes:png,jpg',
            'carts' => 'required_if:has_order,true|nullable|array',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'no_people' => 'required|numeric|min:1',
            'has_order' => 'required|boolean',
            'total' => 'required|numeric'
        ];
    }
}
