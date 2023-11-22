const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs all game posts made by logged-in user
router.get("/", async (req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      where: { userId: res.locals.user.id },
    });
    const responseData = {
      games: games
    };
    res.json(responseData);
  } catch (err) {
    next(err);
  }
});

// POSTs new game while logged in as current user
router.post("/", async (req, res, next) => {
  try {
    const { gameTitle, gameTime, gameImage, gameReview } = req.body;
    if (!gameTitle || !gameTime) {
      throw new ServerError(400, "Must provide game title & game time.");
    }
    const newGame = await prisma.game.create({
      data: {
        title: gameTitle, time: gameTime, imageUrl: gameImage, review: gameReview,
        user: {
          connct: { id: res.locals.user.id }
        }
      },
    });
    res.json(newGame);
  } catch (err) {
    next(err);
  }
});