import { Cart } from "./Cart";
import { Category } from "./Category";
import { Favorite } from "./Favorite";
import { Order } from "./Order";
import { OrderItem } from "./OrderItem";
import { OrderProducts } from "./OrderProducts";
import { Payment } from "./Payment";
import { Product } from "./Product";
import { ProductPrice } from "./ProductPrice";
import { Review } from "./Review";
import { Address } from "./Address";
import { User } from "./User";
import { sequelize } from "../config/dbConnect";

// İlişkiler
Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

// Favorilerin ilişkileri
Favorite.belongsTo(User, { foreignKey: "userId" });
Favorite.belongsTo(Product, { foreignKey: "productId" });

// Order ile User arasında ilişki
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user", // İlişkili User objesini bu şekilde çağırabileceğiz
});

// Order ile Product arasında ilişki
Order.belongsToMany(Product, {
  through: "OrderProducts", // Siparişler ve ürünler arasında ilişkiyi yönetmek için bir "through" tablosu oluşturuyoruz
  foreignKey: "orderId",
  otherKey: "productId",
});

// Product ile Order arasında ilişki
Product.belongsToMany(Order, {
  through: "OrderProducts",
  foreignKey: "productId",
  otherKey: "orderId",
});

// Sipariş ve Ürün ilişkilerini kur
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// Sipariş ile ilişki
Payment.belongsTo(Order, { foreignKey: "orderId" });

// Product ile OrderProducts arasında ilişki
Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });

// Product ve ProductPrice arasında ilişki
Product.hasMany(ProductPrice, { foreignKey: "productId" });
ProductPrice.belongsTo(Product, { foreignKey: "productId" });

// Yorumların ilişkileri
Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(Product, { foreignKey: "productId" });
Address.belongsTo(User, { foreignKey: "userId" });
export default async () => {
  try {
    // Veritabanı bağlantısını doğrula
    await sequelize.authenticate();
    console.log("✅ Database connection successful!");

    // Modelleri senkronize et
    await sequelize.sync({ force: true }); // force: true kullanmak, mevcut verileri siler
    console.log("🛠️ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export {
  User,
  Address,
  Cart,
  Category,
  Favorite,
  Order,
  OrderItem,
  OrderProducts,
  Payment,
  Product,
  ProductPrice,
  Review,
};
