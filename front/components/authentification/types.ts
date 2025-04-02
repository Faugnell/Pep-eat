export type FormFieldLogin = {
    label: string;
    model: Ref<string>;
    type: 'email' | 'password';
    placeholder: string;
};

export type FormFieldRegistration = {
    label: string;
    model: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
};

export type User = {
    _id: string;
    first_name: string;
    last_name: string;
    role: string;
    city: string;
    postal_code: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    referral_link: string;
    referral_discount: boolean;
    is_suspended: boolean;
}

export type Data = {
    user: User;
    token: string;
}

export type ApiResponse<T> = {
    code: number;
    ok: boolean;
    data: T;
    message: string;
}