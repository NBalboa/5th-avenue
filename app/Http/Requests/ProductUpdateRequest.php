<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            'name' => 'required|string',
            'category' => 'required|numeric',
            'price' => 'required|numeric|min:0.01',
            'image' => 'nullable|image|mimes:png,jpg'
        ];
    }

    public function messages()
    {
        return [
            'price.min' => 'The price must be greater than zero 0'
        ];
    }
}