export type Utilisateur = {
    _id: string;
    first_name: string;
    last_name: string;
    role: "client" | "livreur" | "restaurateur";
    city: string;
    postal_code: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    referral_link?: string;
    referral_discount: boolean;
    is_suspended: boolean;
};