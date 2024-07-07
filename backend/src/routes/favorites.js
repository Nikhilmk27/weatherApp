const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require("../middleWare/auth");

const router = express.Router();
const prisma = new PrismaClient();

// ADD FAVOURITE CITY
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.user.userId;

    // Check if the city already exists in the user's favorites
    const existingFavorite = await prisma.city.findFirst({
      where: {
        name: city,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "City already in favorites" });
    }

    // If the city doesn't exist in favorites, add it
    const newCity = await prisma.city.findUnique({
      where: { name: city },
    });

    if (newCity) {
      // City exists, connect it to the user
      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            connect: { id: newCity.id },
          },
        },
      });
    } else {
      // City doesn't exist, create it and connect to the user
      await prisma.city.create({
        data: {
          name: city,
          users: {
            connect: { id: userId },
          },
        },
      });
    }

    res.status(201).json({ message: "City added to favorites", city: city });
  } catch (error) {
    console.error("Error adding city to favorites:", error);
    res.status(500).json({ error: "Error adding city to favorites" });
  }
});

// GET FAVOURITES
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const favorites = await prisma.city.findMany({
      where: { users: { some: { id: userId } } },
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Error fetching favorites" });
  }
});

module.exports = router;
