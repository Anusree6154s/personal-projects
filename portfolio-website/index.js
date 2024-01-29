import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const res = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("index.ejs", { data: res.data });
  } catch (error) {
    res.render("index.ejs", {error: error.message,});
  }
});