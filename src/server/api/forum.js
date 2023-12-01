const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs all the forum posts made by all users
router.get("/", async(req, res, next)=> {
  try{
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (err){
    next(err);
  }
});

// POSTs new forum post while logged in as current user
router.post("/", async (req, res, next) => {
  try {
    const { postTitle, postDetails } = req.body;
    if (!postTitle || !postDetails) {
      throw new ServerError(400, "Must provide title & post.");
    }
    const newPost = await prisma.post.create({
      data: {
        title: postTitle, postContent: postDetails, 
        user: {
          connect: { id: res.locals.user.id }
        }
      },
    });
    res.json(newPost);
  } catch (err) {
    next(err);
  }
});