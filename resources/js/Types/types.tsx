export type TBarangay = {
    name: string;
    psgcCode: string;
    municipalCityCode: string;
};

export type TMunicipality = {
    name: string;
    psgcCode: string;
    provinceCode: string;
};

export type TProvince = {
    name: string;
    psgcCode: string;
    regionCode: string;
};

export type Supplier = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    telephone: string | null;
    address: Address;
    created_at: string;
    updated_at: string;
};

export type Address = {
    id: number;
    user_id: number;
    supplier_id: number;
    street: string;
    barangay: string;
    city: string;
    province: string;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Link = {
    url: string | null;
    label: string;
    active: boolean;
};

export enum IsDeleted {
    YES = 1,
    NO = 0,
}

export enum IsAvailable {
    YES = 1,
    NO = 0,
}

export type Product = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    quantity: number | null;
    image: string;
    is_deleted: IsDeleted;
    is_available: IsAvailable;
    category: Category;
    created_at: string;
    updated_at: string;
};

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};
