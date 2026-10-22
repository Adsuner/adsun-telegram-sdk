// Minimal Node.js (Express) handler for the Adsun Reward URL.
// Panel setting example: https://yourgame.com/reward?userid=[userId]
// Docs: https://adsun.io/docs
import express from "express";

const app = express();
const granted = new Set(); // use your database in production

app.get("/reward", (req, res) => {
  const userId = String(req.query.userid || "");
  const block = String(req.query.block || "");
  if (!/^\d+$/.test(userId)) return res.status(400).send("bad user");

  // Optional: idempotency per user/block/time window
  const key = `${userId}:${block}:${Math.floor(Date.now() / 15000)}`;
  if (!granted.has(key)) {
    granted.add(key);
    // TODO: add coins / lives / booster to userId in your database
    console.log("reward granted", userId, block);
  }
  res.send("ok");
});

app.listen(3000, () => console.log("Reward endpoint on :3000"));
