export type Article = {
  _id: string
  name: string
  price: number
  nutriscore: string
  category: string
  available: Boolean
  restaurant_id: string
  description?: string;
  image?: string;
  id_media?: string;
  updatedImage?: string;
  insertion?: boolean;
}
