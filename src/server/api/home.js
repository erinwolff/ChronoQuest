const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

// GETs all the game posts made by all users
router.get("/", async(req, res, next)=> {
  try{
    const result = await prisma.game.findMany();
    res.json(result);
  } catch (err){
    next(err);
  }
});