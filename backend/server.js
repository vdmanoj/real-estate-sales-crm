const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const customerRoutes =
  require("./routes/customerRoutes");

const app = express();


// IMPORTANT
// INCREASE PAYLOAD SIZE
app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  extended: true,
  limit: "50mb"
}));


app.use(cors());


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/customers",
  customerRoutes
);


// MONGODB CONNECT
mongoose.connect(
  "mongodb://127.0.0.1:27017/salesDB"
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((err) => {

  console.log(err);
});


// SERVER
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});