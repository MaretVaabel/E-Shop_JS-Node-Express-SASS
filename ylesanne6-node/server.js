import express from "express";
import fs from "fs/promises";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const app = express();
const PORT = 3000;

// Failisüsteemi seadistamine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data", "products.json");
const customersFilePath = path.join(__dirname, "data", "customers.json");
const favoritesFilePath = path.join(__dirname, "data", "favorites.json");

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
      res.status(200).json(uniqueArray);
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
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Toote andmete lugemine ebaõnnestus" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

// Endpoint to get a favorites products by client id
app.get("/api/favorites/:userID", async (req, res) => {
  try {
    const favoritesData = JSON.parse(
      await fs.readFile(favoritesFilePath, "utf-8")
    );

    const favoritesIds = favoritesData[req.params.userID] || [];

    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    const products = data.filter((product) =>
      favoritesIds.includes(product.id)
    );

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Toote andmete lugemine ebaõnnestus" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

// Endpoint to add a favorite product by ID
app.post("/api/favorites/:userID/:productId", async (req, res) => {
  try {
    const emptyFile = await isFileEmpty(favoritesFilePath);
    if (emptyFile) {
      //make the object, that has client id as key and array of product ids as value
      const newData = {
        [req.params.userID]: [parseInt(req.params.productId)],
      };
      await fs.writeFile(favoritesFilePath, JSON.stringify(newData, null, 2));
      return res.status(200).json(newData);
    }

    const favoritesData = JSON.parse(
      await fs.readFile(favoritesFilePath, "utf-8")
    );

    //take the client favorite product id array from file
    const favoritesIds = favoritesData[req.params.userID] || [];

    //add id to the file array
    favoritesIds.push(parseInt(req.params.productId));
    const uniqueIds = [...new Set(favoritesIds)];
    favoritesData[req.params.userID] = uniqueIds;

    // write new array to file
    await fs.writeFile(
      favoritesFilePath,
      JSON.stringify(favoritesData, null, 2)
    );
    //See json, mis sa siin tagastad on näha ka veebilhitseja network tab'is
    res.status(200).json(uniqueIds);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Andmete kirjutamine lemmikutesse ebaõnnestus" });
  }
});

// Endpoint to delete a favorite product by ID
app.delete("/api/favorites/:userID/:productId", async (req, res) => {
  try {
    const favoritesData = JSON.parse(
      await fs.readFile(favoritesFilePath, "utf-8")
    );
    //take the client favorite product id array from file
    const favoritesIds = favoritesData[req.params.userID] || [];
    //delete id from the file

    const newArray = favoritesIds.filter(
      (id) => id !== parseInt(req.params.productId)
    );
    favoritesData[req.params.userID] = newArray;
    // write new array to file
    await fs.writeFile(
      favoritesFilePath,
      JSON.stringify(favoritesData, null, 2)
    );

    res.status(200).json(favoritesData);
  } catch (error) {
    res.status(404).json({ message: "Andmete kirjutamine ebaõnnestus" });
  }
});

//Endpoint for collecting the users
app.post("/api/user/:user", async (req, res) => {
  try {
    const customersData = JSON.parse(
      await fs.readFile(customersFilePath, "utf-8")
    );

    const userData = customersData.find((obj) => obj.name === req.params.user);
    console.log(customersData, randomUUID());

    if (!userData) {
      //make the object, that has client id as key and array of product ids as value
      const newData = {
        id: randomUUID(),
        name: req.params.user,
      };

      await fs.writeFile(
        customersFilePath,
        JSON.stringify([...customersData, newData], null, 2)
      );
      return res.status(200).json(newData);
    }
    return res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: "Sisse logimine ebaõnnestus" });
  }
});

// Käivita server
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
