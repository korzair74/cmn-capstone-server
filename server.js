require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const tamingStatsRouter = require("./routes/tamingStats");
const breedingStatsRouter = require("./routes/breedingStats");
const arkdataRouter = require("./routes/arkdata");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

app.use("/tamingStats", tamingStatsRouter);
app.use("/breedingStats", breedingStatsRouter);
app.use("/arkdata", arkdataRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
