import express from "express";
import fs from "fs/promises";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Failisüsteemi seadistamine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "products.json");
const filePath = DATA_FILE;

// Middleware staatiliste failide jaoks
app.use(express.static("public"));

// Funktsioon: Laadi andmed FakeStore API-st ja salvesta faili
const fetchAndSaveProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  await fs.writeFile("./data/products.json", JSON.stringify(products, null, 2));
};

// Funktsioon: Kontrolli, kas fail on tühi
const isFileEmpty = async (path) => {
  try {
    const rawData = await fs.readFile(path, "utf-8");
    return !rawData.trim(); // Kontrollime, kas fail on tühi (või ainult tühikud)
  } catch (error) {
    console.error("Viga faili lugemisel", error);
    return true; // Kui tekib viga, eeldame, et fail on tühi või puudub
  }
};

// API: Tagasta lokaalsest JSON-failist andmed
app.get("/api/products", async (req, res) => {
  try {
    // Seadista vastuse päised
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    // Kontrolli, kas fail on tühi
    const emptyFile = await isFileEmpty(filePath);

    // Kui fail on tühi, lae andmed API-st ja salvesta need
    if (emptyFile) {
      console.log("Fail on tühi. Laadin andmed FakeStore API-st...");
      await fetchAndSaveProducts();
    }

    // Loe andmed failist
    const rawData = await fs.readFile(filePath, "utf-8");

    // Parssige andmed
    const products = JSON.parse(rawData);

    // Tagasta andmed kasutajale
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  console.log(req.params);
  try {
    // Seadista vastuse päised
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    // Loe andmed failist
    const rawData = await fs.readFile(filePath, "utf-8");

    // Parssige andmed
    const products = JSON.parse(rawData);

    const categoryProducts = products.filter(
      (item) => item.category === req.params.category
    );
    res.status(200).json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus" });
  }
});

// Endpoint to get categories
app.get("/api/products/categories", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const categories = data.map((item) => item.category);
    const uniqueArray = [...new Set(categories)];

    if (uniqueArray) {
      res.json(uniqueArray);
    } else {
      res.status(404).json({ message: "Kategooria lugemine ebaõnnestus" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

// Endpoint to get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const product = data.find((p) => p.id === parseInt(req.params.id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

// Käivita server
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
