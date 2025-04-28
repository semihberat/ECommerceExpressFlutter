import express from "express";
import cors from "cors";
import { sequelize } from "./config/dbConnect"; // db.ts dosyasını içeri aktar
import authRoute from "./routes/authRouter";
import homeRoute from "./routes/homeRouter"; // Ana sayfa route'unu içeri aktar
import Synchronize, {
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
} from "./models/index";
import { seedData } from "./test/testSeed";

//test

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*", // Allow specific origin
    methods: ["GET", "POST", "PUT"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies to be sent
    preflightContinue: false, // Do not pass the preflight response to the next handler
    optionsSuccessStatus: 204, // Status code for successful preflight response
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", homeRoute);
app.use("/api/auth", authRoute); // Tüm auth işlemleri /api/auth altında olacak

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API!");
});

// Veritabanı bağlantısını doğrula ve modelleri senkronize et
async function startServer() {
  try {
    // Veritabanı senkronizasyonu
    await Synchronize();
    console.log("✅ Database synchronized");

    // Veritabanı seed işlemi
    await seedData();
    console.log("✅ Database seeded");

    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}

startServer();
