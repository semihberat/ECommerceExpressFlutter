import { Router } from "express";
import { getHomepageData } from "../controllers/homeController"; // Ana sayfa controller'ını içeri aktar

const router = Router();

// Ana sayfa verilerini almak için route
router.get("/homepage", async (req, res) => {
  try {
    await getHomepageData(req, res);
  } catch (error) {
    console.error("Error in /homepage route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
