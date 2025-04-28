import { User, Product, Category, Favorite } from "../models/index";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const seedData = async () => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: await bcrypt.hash("password123", 10),
      isVerified: true,
      verificationToken: uuidv4(),
      role: "customer",
    });

    console.log("Test user created:", user.email);

    const category1 = await Category.create({ name: "Electronics" });
    const category2 = await Category.create({ name: "Clothing" });
    const category3 = await Category.create({ name: "Books" });

    console.log(
      "Test categories created:",
      category1.name,
      category2.name,
      category3.name
    );

    const product1 = await Product.create({
      name: "Smartphone",
      price: 499.99,
      description: "A high-end smartphone with great features",
      stockQuantity: 100,
      imageUrl: "https://placehold.co/600x400.png",
      categoryId: category1.id,
    });

    const product2 = await Product.create({
      name: "T-Shirt",
      price: 19.99,
      description: "A comfortable cotton t-shirt",
      stockQuantity: 50,
      imageUrl: "https://placehold.co/600x400.png",
      categoryId: category2.id,
    });

    const product3 = await Product.create({
      name: "JavaScript Book",
      price: 29.99,
      description: "A comprehensive guide to JavaScript programming",
      stockQuantity: 200,
      imageUrl: "https://placehold.co/600x400.png",
      categoryId: category3.id,
    });

    console.log(
      "Test products created:",
      product1.name,
      product2.name,
      product3.name
    );

    await Favorite.create({
      userId: user.id,
      productId: product1.id,
    });

    await Favorite.create({
      userId: user.id,
      productId: product2.id,
    });

    console.log("Test favorites created.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
