export type Restaurant = {
    _id: string;
    nom: string;
    description?: string;
    adresse: string;
    telephone?: string;
    horaires?: string;
    id_proprietaire: string;
    siret: string;
    type_cuisine: string;
    sponsorise?: boolean;
    id_media?: string;
    image?: string;
};