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
};

export type Address = {
    id: number;
    street: string;
    barangay: string;
    city: string;
    province: string;
};

export type Link = {
    url: string | null;
    label: string;
    active: boolean;
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
