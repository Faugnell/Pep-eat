export type billingDetailsType = {
    "quantity": number,
    "article_data": {
        "article_id": string,
        "name": string,
        "description": string,
        "price": {
            "$numberDecimal": string
        },
        "nutriscore": string,
        "category": string,
        "_id": string
    },
    "_id": string
}

export type promotionType = {
    "type": string,
    "value": {
        "$numberDecimal": string
    },
    "code": string
}
export type restaurantDataType = {
    "_id": string,
    "nom": string,
    "description": string,
    "adresse": string,
    "telephone": string,
    "horaires": string,
    "id_proprietaire": string,
    "siret": string,
    "type_cuisine": string,
    "sponsorise": false,
    "id_media": string,
    "image": string
}

export type ordersDataType= {
    "_id": string,
    "user_id": string,
    "restaurant_id": string,
    "billing_details": Array<billingDetailsType>,
    "date": string,
    "price": {
        "$numberDecimal": string
    },
    "promotions": Array<promotionType>,
    "status": string,
    "comment": string,
    "restaurant_data": restaurantDataType
}
