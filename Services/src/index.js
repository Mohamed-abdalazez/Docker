const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis

const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
  //url: "redis://host:port",
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to redis..."));
redisClient.connect();

//connect db

const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose
  .connect(URI)
  .then(() => console.log("connected to db..."))
  .catch((err) => console.log("failed to connect to db: ", err));

// just for try
app.get("/", (req, res) => {
  redisClient.set("Anime", "Naruto...");
  res.send("<h1>Hi guess who i am :D</h1>");
});

app.get("/data", async (req, res) => {
  const anime = await redisClient.get("Anime");
  res.send(`<h1>Hi from Redis Server</h1><h2>And I'm ${anime}</h2>`);
});

app.listen(PORT, () => console.log(`Hi Hi! from ${PORT}`));
