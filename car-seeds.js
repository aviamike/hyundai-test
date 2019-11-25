const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hyundai-dev", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Car = require("./src/api/cars/seed-model");

const cars = [
  {
    _id: "1",
    model: "creta",
    license: "А111АА750",
    reservations: [
      new Date("2019/01/01"),
      new Date("2019/01/02"),
      new Date("2019/01/03"),
      new Date("2019/01/04"),
      new Date("2019/01/05"),
      new Date("2019/01/10")
    ]
  }
];

Car.insertMany(cars).then(() => {
  mongoose.connection.close();
});
