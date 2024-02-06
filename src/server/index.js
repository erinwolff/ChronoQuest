require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { createServer: createViteServer } = require("vite");

const PORT = process.env.PORT ?? 80;

/**
 * The app has to be created in a separate async function
 * since we need to wait for the Vite server to be created
 */
const createApp = async () => {
  const app = express();

  // Logging middleware
  app.use(morgan("dev"));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes

  // /api  
  app.use("/api", require("./api"));

  // /api/home
  app.use("/api/home", require("./api/home"));

  // /api/profile
  app.use("/api/profile", require("./api/profile"));

  // /api/details
  app.use("/api/details", require("./api/details"));

  // /api/forum
  app.use("/api/forum", require("./api/forum"));

  // /api/post
  app.use("/api/post", require("./api/postDetails"));

  // /api/post/:id/comments
  app.use("/api/post/:id/comments", require("./api/postDetails"));

  // /api/passwordReset
  app.use('/api/auth', require("./api/auth/passwordReset"));


  // Serve static HTML in production & Vite dev server in development
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../../dist/")));

    // Redirect all non-API routes to the index HTML file
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
    });
  } else {
    // Pulled from https://vitejs.dev/config/server-options.html#server-middlewaremode
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });

    app.use(vite.middlewares);
  }

  // Simple error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).send(err.message ?? "Internal server error.");
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
};

createApp();
