const prisma = require("../prisma");

/** Seeds the database with a test user and one game */
const seed = async () => {
  await prisma.user.create({
    data: {
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
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
