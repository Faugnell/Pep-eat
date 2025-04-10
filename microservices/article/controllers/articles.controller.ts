import { Request, Response } from 'express';
import { findById } from '../services/articles.service';
import { buildSuccessResponse, buildErrorResponse } from '../utils/responseBuilder';
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
    const { id } = req.params;

    // Vérification de l'ID
    if (!id) {
      return res.status(400).json({ message: "Paramètre 'id' manquant." });
    }

    const article = await articlesService.findById(id);

    if (!article) {
      return res.status(404).json({ message: `Aucun article trouvé avec l'ID ${id}` });
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
      return res.status(400).send(buildErrorResponse(null, 400, "Champs obligatoires manquants : 'name', 'price', 'category'"));
    }

    const article = await articlesService.create(newArticleData);

    if (article === null) {
			return res.status(400).send(buildErrorResponse(null, 400, "Erreur lors de la création de l'article"));
		}

		return res.status(200).send(buildSuccessResponse(article, 200, "Article créé avec succès"));
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    return res.status(500).send(buildErrorResponse(null, 500, "Erreur serveur lors de la création de l'article"));
  }
}

 
export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).send(buildErrorResponse(null, 400, "Paramètre 'id' manquant." ));
    }

    const updatedArticle = await articlesService.updateById(id, updateData);

    if (!updatedArticle) {
      return res.status(404).send(buildErrorResponse(null, 404, `Aucun article trouvé avec l'ID ${id}` ));
    }

    return res.status(200).send(buildSuccessResponse(updatedArticle, 200,"Article mis à jour avec succès"));
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
    return res.status(500).send(buildErrorResponse(null, 500, "Erreur serveur lors de la mise à jour de l'article"));
  }
}
 
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send(buildErrorResponse(null, 400, "Paramètre 'id' manquant."));
    }

    const deleted = await articlesService.deleteById(id);
    
    if (!deleted) {
      return res.status(404).send(buildErrorResponse(null, 404, `Aucun article trouvé avec l'ID ${id}` ));
    }

    return res.status(200).send(buildSuccessResponse(deleted, 200, "Article supprimé avec succès"));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    return res.status(500).send(buildErrorResponse(null, 500, "Erreur serveur lors de la suppression de l'article"));
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