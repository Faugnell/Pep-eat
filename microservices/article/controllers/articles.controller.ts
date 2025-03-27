import { Request, Response } from 'express';
import { findById } from '../services/articles.service';
const articlesService = require('../services/articles.service');

export async function list(req: Request, res: Response) {
  try {
    const articles = await articlesService.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles", error });
  }
}

export async function listByRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const articles = await articlesService.findByRestaurant(restaurantId);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles du restaurant", error });
  }
}

export async function listByCategory(req: Request, res: Response) {
  try {
    const { category } = req.params;
    const articles = await articlesService.findByCategory(category);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles de la catégorie", error });
  }
}

export async function read(req: Request, res: Response) {
  try {
    const { articleId } = req.params;

    // Vérification de l'ID
    if (!articleId) {
      return res.status(400).json({ message: "Paramètre 'articleId' manquant." });
    }

    const article = await articlesService.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: `Aucun article trouvé avec l'ID ${articleId}` });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Erreur dans read:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération de l'article par son ID",
      error: (error as Error).message || error,
    });
  }
}
 
export async function create(req: Request, res: Response) {
  try {
    const newArticleData = req.body;

    if (!newArticleData.name || !newArticleData.price || !newArticleData.category) {
      return res.status(400).json({ message: "Champs obligatoires manquants : 'name', 'price', 'category'" });
    }

    const article = await articlesService.create(newArticleData);

    return res.status(201).json({ message: "Article créé avec succès", article });
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la création de l'article",
      error: (error as Error).message || error,
    });
  }
}

 
export async function update(req: Request, res: Response) {
  try {
    const { articleId } = req.params;
    const updateData = req.body;

    if (!articleId) {
      return res.status(400).json({ message: "Paramètre 'articleId' manquant." });
    }

    const updatedArticle = await articlesService.updateById(articleId, updateData);

    if (!updatedArticle) {
      return res.status(404).json({ message: `Aucun article trouvé avec l'ID ${articleId}` });
    }

    return res.status(200).json({ message: "Article mis à jour avec succès", article: updatedArticle });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de l'article",
      error: (error as Error).message || error,
    });
  }
}
 
export async function remove(req: Request, res: Response) {
  try {
    const { articleId } = req.params;

    if (!articleId) {
      return res.status(400).json({ message: "Paramètre 'articleId' manquant." });
    }

    const deleted = await articlesService.deleteById(articleId);

    if (!deleted) {
      return res.status(404).json({ message: `Aucun article trouvé avec l'ID ${articleId}` });
    }

    return res.status(200).json({ message: "Article supprimé avec succès.", article: deleted });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    return res.status(500).json({
      message: "Erreur lors de la suppression de l'article.",
      error: (error as Error).message || error,
    });
  }
}
 
module.exports = {
  list,
  read,
  create,
  update,
  remove,
  listByRestaurant,
  listByCategory,
  findById
};