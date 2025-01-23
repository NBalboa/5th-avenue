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

export type Order<Product> = {
    product: Product;
    order_quantity: number;
};

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

export type TTable = {
    id: number;
    no: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export enum PaymentStatus {
    PENDING = 1,
    PAID = 2,
}

export enum ByQuantityType {
    HIGHEST_TO_LOWEST = 1,
    LOWEST_TO_HIGHEST = 2,
}

export enum OrderStatus {
    PENDING = 1,
    CONFIRMED = 2,
    READY = 3,
    COMPLETED = 4,
}

export enum UserRole {
    ADMIN = 1,
    MANAGER = 2,
    CASHIER = 3,
    CUSTOMER = 4,
}

export enum CartType {
    ORDER = 1,
    BOOKING = 2,
}

export type Cart = {
    id: number;
    product_id: number;
    product: Product;
    table_id: number;
    user_id: number;
    cart_type: CartType;
    quantity: number;
    created_at: string;
    updated_at: string;
};

export type TOrder = {
    id: number;
    customer_id: number | null;
    customer: User;
    table_id: number | null;
    table: TTable;
    tendered_by: number;
    cashier: User;
    amount_render: number;
    total: number;
    payment_status: PaymentStatus;
    order_status: OrderStatus;
    booking: Booking;
    created_at: string;
    updated_at: string;
};

export type ProductSearchFilters = {
    search: string | null;
    category: string | null;
};

export type Item = {
    id: number;
    order_id: number;
    product_id: number;
    product: Product;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    image: string | null;
    profile: string | null;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    phone: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
};

export enum BookingStatus {
    PENDING = 1,
    CONFIRM = 2,
}

export type Booking = {
    id: number;
    table_id: number;
    order_id: number;
    user_id: number;
    confirmed_by: number | null;
    confirmed: User | null;
    table: TTable;
    order: TOrder;
    user: User;
    image: string;
    no_people: string;
    time: string;
    date: string;
    closing_date: string;
    booking_status: BookingStatus;
    gcash_reference_id: string;
    created_at: string;
    updated_at: string;
};

export type Stock = {
    id: number;
    product_id: number;
    supplier_id: number;
    description: string;
    quantity: number;
    supplier: Supplier | null;
    product: Product;
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
