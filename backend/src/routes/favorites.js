const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.user.userId;
    await prisma.city.create({
      data: {
        name: city,
        users: { connect: { id: userId } }
      }
    });
    res.status(201).json({ message: 'City added to favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding city to favorites' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const favorites = await prisma.city.findMany({
      where: { users: { some: { id: userId } } }
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

module.exports = router;