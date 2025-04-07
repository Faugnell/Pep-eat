import { defineStore } from "pinia";
import type { Panier, ArticlePanier } from "~/utils/types/Panier";

const updatePanierBDD = useDebounce(async (panier: Panier) => {
    try {
        if (!panier.userId) throw new Error("L'ID de l'utilisateur est requis");

        await $fetch(`/api/paniers/${panier.userId}`, {
            method: "PUT",
            body: panier
        });
    } catch (err) {
        useToast().add({
            title: "Erreur lors de l'ajout de l'article au panier",
            description: err,
            color: "error"
        });
    }
}, 250);

export const usePanierStore = defineStore("panier", {
    state: () : Panier => ({
        userId: null,
        articles: [],
        nombreArticlesUnique: 0,
        nombreArticles: 0,
        prixTotal: 0
    }),
    getters: {
        getArticles: (state) => () => state.articles,
        getNombreArticlesUnique: (state) => () => state.articles.length,
        getNombreArticles: (state) => () => state.articles.reduce((total: number, article: ArticlePanier) => total + article.quantity, 0),
        getPrixTotal: (state) => () => state.articles.reduce((total: number, article: ArticlePanier) => total + (article.price * article.quantity), 0),
        getArticleById: (state) => (id: string) => {
            return state.articles.find((article: ArticlePanier) => article.id === id);
        },
        isArticleInPanier: (state) => (id: string) => {
            return state.articles.some((article: ArticlePanier) => article.id === id);
        }
    },
    actions: {
        /* Fonction à appeller lors de chaque mise à jour afin de recalculer les informations du panier et mettre à jour le panier dans la base de données */
        _updatePanier() {
            this.nombreArticlesUnique = this.getNombreArticlesUnique();
            this.nombreArticles = this.getNombreArticles();
            this.prixTotal = this.getPrixTotal();
            updatePanierBDD(this.$state);
        },
        addArticle(article: ArticlePanier) {
            const existingArticle = this.articles.find(a => a.id === article.id);

            if (existingArticle)
                existingArticle.quantity += article.quantity;
            else
                this.articles.push(article);

            this._updatePanier();
        },
        removeArticle(articleId: string) {
            this.articles = this.articles.filter(article => article.id !== articleId);
            this._updatePanier();
        },
        updateArticleQuantity(articleId: string, quantity: number) {
            const existingArticle = this.articles.find(article => article.id === articleId);

            if (existingArticle) {
                if (quantity <= 0) {
                    this.removeArticle(articleId);
                } else {
                    existingArticle.quantity = quantity;
                    this._updatePanier();
                }
            }
        },
        clearPanier() {
            this.articles = [];
            this._updatePanier();
        },
        setUserId(userId: string | null) {
            this.userId = userId;
        }
    }
});