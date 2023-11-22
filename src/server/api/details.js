const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs a game post specified by the gameId
router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const result = await prisma.game.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find post with id ${id}.`
      });
    }
    res.json(result)
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