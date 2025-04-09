export type livraisonDataType = {
    _id: string,
    order_id: string,
    restaurant_id: string,
    user_id: string,
    status: string,
    cooking_time_start: Date
    cooking_time_end: Date
    delivery_departure_time: Date,
    delivery_estimated_arrival_time: Date,
    delivery_lastest_arrival_time: Date,
    address_number: string,
    address_street: string,
    postal_code: string,
    city: string,
    phone: string,
    is_finish: boolean
    in_progress: boolean
    createdAt: Date,
    updatedAt: Date
}