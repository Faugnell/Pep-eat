import { defineStore } from "pinia";

type Article = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const usePanierStore = defineStore("panier", {
    state: () => ({
        articles: [
            {
                id: "1",
                name: "Article 1",
                price: 10,
                quantity: 1,
            },
            {
                id: "2",
                name: "Article 2",
                price: 20,
                quantity: 2,
            },
            {
                id: "3",
                name: "Article 3",
                price: 30,
                quantity: 3,
            },
        ] as Article[],
    }),
    getters: {
        getArticles: (state) => () => state.articles,
        getNumberOfArticles: (state) => () => state.articles.length,
        getTotalPrice: (state) => () => {
            return state.articles.reduce((total, article) => {
                return total + (article.price * article.quantity);
            }, 0);
        }
    },
    actions: {
        addArticle(article: Article) {
            const existingArticle = this.articles.find(a => a.id === article.id);

            if (existingArticle)
                existingArticle.quantity += article.quantity;
            else
                this.articles.push(article);
        },
        removeArticle(articleId: string) {
            this.articles = this.articles.filter(article => article.id !== articleId);
        },
        updateArticleQuantity(articleId: string, quantity: number) {
            const existingArticle = this.articles.find(article => article.id === articleId);

            if (existingArticle)
                existingArticle.quantity = quantity;
        },
        clearPanier() {
            this.articles = [];
        }
    }
});