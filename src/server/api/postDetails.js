const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs a forum post & its comments specified by the postId
router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      return next({
        status: 404,
        message: `Could not find post with id ${id}.`,
      });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

/** POSTs new comment while logged in as current user */
router.post("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { postComment } = req.body;
    if (!postComment ) {
      throw new ServerError(400, "Must provide comment." );
    }
    const newComment = await prisma.comment.create({
      data: {
        comment: postComment, 
        user: {
          connect: { id: res.locals.user.id },
        },
        post: {
          connect: {id: id},
        }
      },
    });
    res.json(newComment);
  } catch (err) {
    next(err);
  }
});

/** Checks if post exists and belongs to given user */
const validatePost = (user, post) => {
  if (!post) {
    throw new ServerError(404, "Post not found.");
  }

  if (post.userId !== user.id) {
    throw new ServerError(403, "This post does not belong to you.");
  }
};

/** Checks if comment exists and belongs to given user */
const validateComment = (user, comment) => {
  if (!comment) {
    throw new ServerError(404, "Comment not found.");
  }

  if (comment.userId !== user.id) {
    throw new ServerError(403, "This comment does not belong to you.");
  }
};

// DELETEs a single forum post made by logged-in user
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const post = await prisma.post.findUnique({ where: { id } });
    validatePost(res.locals.user, post);

    await prisma.post.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// DELETEs a single comment made by logged-in user
router.delete("/:id/comment", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const comment = await prisma.comment.findUnique({ where: { id } });
    validateComment(res.locals.user, comment);

    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


