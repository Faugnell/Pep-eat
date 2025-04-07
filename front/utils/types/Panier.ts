export type ArticlePanier = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export type Panier = {
    userId: string | null;
    articles: ArticlePanier[];
    nombreArticlesUnique: number;
    nombreArticles: number;
    prixTotal: number;
}