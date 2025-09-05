const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let votes = {
  males: [0, 0, 0, 0],
  females: [0, 0, 0, 0]
};

// Vote endpoint
app.post("/vote", (req, res) => {
  const { group, index } = req.body;
  if (!votes[group]) return res.status(400).send("Invalid group");
  votes[group][index]++;
  res.json({ success: true, votes });
});

// Results endpoint
app.get("/results", (req, res) => {
  res.json(votes);
});

// Reset endpoint (for admin)
app.post("/reset", (req, res) => {
  votes = { males: [0, 0, 0, 0], females: [0, 0, 0, 0] };
  res.json({ success: true, votes });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
