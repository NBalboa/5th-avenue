<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffStoreRequest extends FormRequest
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
            "image" => 'required|image|mimes:png,jpg',
            "profile" => 'required|image|mimes:png,jpg',
            "first_name" => 'required|string',
            "last_name" => 'required|string',
            "middle_name" => 'nullable|string',
            "phone" => 'required|string|unique:users',
            "email" => "required|email|string|unique:users",
            "role" => "required|numeric",
            "password" => "required|string|min:8|same:confirm_password",
            "confirm_password" => "required|string"
        ];
    }
}
