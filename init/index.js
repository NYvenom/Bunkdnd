if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MAPTILER_API_KEY = process.env.MAP_API_KEY;
const MONGO_URL = "mongodb://127.0.0.1:27017/Bunkdnd";

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  for (let obj of initData.data) {
    const query = encodeURIComponent(obj.location);
    const url = `https://api.maptiler.com/geocoding/${query}.json?key=${MAPTILER_API_KEY}`;
    const res = await fetch(url);
    const geoData = await res.json();
    if (geoData.features && geoData.features.length > 0) {
      obj.geometry = geoData.features[0].geometry;
    } else {
      console.log(`No geocode result for: ${obj.location}`);
    }
    obj.owner = "6a9931fe0b7215fa56ead4f7";
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
