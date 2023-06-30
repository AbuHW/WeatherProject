const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.city;
  const API_KEY = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    API_KEY +
    "";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const condition = weatherData.weather[0].description;
      res.write("<h1>The temperature is " + temp + "</h1>");
      res.write("<h1>The conditione : " + condition + "</h1>");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Successfuly connected");
});
