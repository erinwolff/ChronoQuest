const prisma = require("../prisma");

/** Seeds the database with a test user and one game */
const seed = async () => {
  const user = await prisma.user.upsert({
    where: {
      username: "foo",
    },
    update: {},
    create: {
      username: "foo",
      password: "bar",
      games: {
        create: [
          {
            title: "Farthest Frontier",
            time: "29 Hours",
            imageUrl: "https://static.pressakey.de/gfxgames/boxart/s/Farthest-Frontier-7045-1610445484.jpg",
            review: "If you are like me and are looking for a new Banished, look no further! This satisfies the colony sim itch like no other."
          },
        ],
      },
      posts: {
        create: [
          {
            title: "I can't beat level 99!",
            postContent: "This is super frustrating. Anyone have any ideas? Help!",
          }
        ]
      }
    },
    include: {
      posts: true,
    },
  });


  const postId = user.posts[0].id;

  await prisma.comment.create({
    data: {
      comment: "Have you tried using the stealth armor set?",
      userId: user.id,
      postId: postId,
    }
  })
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
