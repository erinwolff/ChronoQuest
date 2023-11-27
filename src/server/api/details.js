const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs a game post & username specified by the gameId
router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const game = await prisma.game.findUnique({
      where: {
        id: id,
      },
    });
    const user = await prisma.user.findUnique({
      where: { id: game.userId },
    });
    if (!game) {
      return next({
        status: 404,
        message: `Could not find game with id ${id}.`
      });
    }
    const responseData = {
      game: game,
      username: user.username,
    };
    res.json(responseData)
  } catch (err) {
    next(err);
  }
})

/** Checks if post exists and belongs to given user */
const validatePost = (user, game) => {
  if (!game) {
    throw new ServerError(404, "Post not found.");
  }

  if (game.userId !== user.id) {
    throw new ServerError(403, "This post does not belong to you.");
  }
};

// DELETEs a single game post made by logged-in user
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const game = await prisma.game.findUnique({ where: { id } });
    validatePost(res.locals.user, game);

    await prisma.game.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});