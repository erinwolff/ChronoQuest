const prisma = require("../prisma");

/** Seeds the database with a test user and one game */
const seed = async () => {
  const user = await prisma.user.upsert({
    where: {
      username: "erinwolff",
    },
    update: {},
    create: {
      username: "erinwolff",
      password: "test",
      games: {
        create: [
          {
            title: "Farthest Frontier",
            time: "29 Hours",
            imageUrl: "https://static.pressakey.de/gfxgames/boxart/s/Farthest-Frontier-7045-1610445484.jpg",
            review: "If you are like me and are looking for a new Banished, look no further! This satisfies the colony sim itch like no other."
          },
          {
            title: "Dark Souls",
            time: "52 Hours",
            imageUrl: "https://steamuserimages-a.akamaihd.net/ugc/932676246162370992/B450ABE8830E05F049C7999F6B9CA902C7C219C5/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
            review: "masterpiece"
          },
          {
            title: "Metro Exodus",
            time: "20 Hours",
            imageUrl: "https://th.bing.com/th/id/OIP.SOdoVZNrwnW1Yimxq_d5XAAAAA?rs=1&pid=ImgDetMain",
            review: "ARTYOM! what a masterpiece. almost had me crying at the end."
          },
          {
            title: "Blasphemous",
            time: "25 Hours",
            imageUrl: "https://th.bing.com/th/id/OIP.ht8MQOksUIBPWuGFKmV4qQAAAA?rs=1&pid=ImgDetMain",
            review: "if you enjoy platformers and souls-like games, you will like Blasphemous. it's reasonably challenging, enough to put me in my place for some time, but the progression is satisfying once you get through a difficult area or figure out a boss fight. one of the better games I've played this year."
          },
          {
            title: "Baldur's Gate 3",
            time: "78 Hours",
            imageUrl: "https://th.bing.com/th/id/OIP.8NdpX3DpSlQFYPlzowFvZgAAAA?rs=1&pid=ImgDetMain",
            review: "an incredible journey"
          },
        ],
      },
      posts: {
        create: [
          {
            title: "Lost Realms",
            postContent: "Just wanted to share my thoughts on the latest game that has completely consumed my life – Lost Realms. If you're into immersive fantasy RPGs, this one's an absolute gem. First things first, the graphics are mind-blowing. The attention to detail in the landscapes, character designs, and even the smallest of creatures is just next level. Every time I wander through the enchanted forest or explore the mysterious dungeons, I find myself pausing just to take in the breathtaking scenery. Now, let's talk about the storyline. It's not your run-of-the-mill hero-saves-the-world cliché. Lost Realms weaves a complex narrative with unexpected twists and turns. The character development is on point, making you genuinely care about the fate of the virtual world and its inhabitants. Trust me; you'll get emotionally invested faster than you can cast a fireball spell. Gameplay-wise, it's a dream for RPG enthusiasts. The skill tree is extensive, giving you the freedom to customize your character's abilities and playstyle. The combat system is fluid and dynamic – you can practically feel the weight of your weapon and the impact of your spells. Oh, and did I mention the soundtrack? Pure magic! The composer deserves a standing ovation. The music seamlessly adapts to the game's atmosphere, enhancing the overall experience. I've even caught myself humming the main theme during my lunch breaks. It's that good. The community aspect is thriving too. Joining guilds, teaming up for epic raids, and engaging in intense PVP battles – it's a social gamer's paradise. I've made some great online friends through Lost Realms, and our guild is becoming a force to be reckoned with. Sure, every game has its quirks, but Lost Realms manages to outweigh its minor flaws with sheer brilliance. It's not just a game; it's an experience. If you haven't jumped into the realms of magic, monsters, and mayhem yet, what are you waiting for? Get ready to lose yourself in Lost Realms!",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });


  const postId = user.posts[0].id;

  await prisma.comment.create({
    data: {
      comment: "BTW if you've played before, share your build! I played as a fire mage & loved it. What about you?",
      userId: user.id,
      postId: postId,
    }
  });
};


seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
