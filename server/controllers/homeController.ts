import type { Request, Response } from "express";
import { Product, Category, Favorite } from "../models"; // Veritabanı modelleri
import { Sequelize } from "sequelize";

export const getHomepageData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // En son eklenen 10 ürünü getir
    const latestProducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    // En popüler (favorilere eklenmiş) 10 ürünü getir
    const popularProducts = await Favorite.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("COUNT", Sequelize.col("productId")), "count"],
      ],
      group: "productId",
      order: [[Sequelize.fn("COUNT", Sequelize.col("productId")), "DESC"]],
      limit: 10,
      include: {
        model: Product,
        attributes: ["id", "name", "price", "description", "stockQuantity"],
      },
    });

    // Tüm kategorileri getir
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });

    // Verileri döndür
    return res.status(200).json({
      latestProducts,
      popularProducts: popularProducts.map((item: any) => item.Product),
      categories,
    });
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
