export type Order = {
    _id: string
    user_id: string
    date: string
    status: string
    comment: string
    price: {
        $numberDecimal: string
    }
    restaurant_data?: {
        nom: string
    }
    user_data?: {
        first_name: string
        last_name: string
        address: string
        city: string
        postal_code: string
        phone: string
    }
}