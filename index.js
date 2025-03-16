// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// // Import routes & middleware
// const authRoute = require("./Routes/AuthRoute.js");
// const { userVerification } = require("./Middlewares/AuthMiddleware.js");

// // Import models
// const HoldingsModel = require("./model/HoldingsModel.js");
// const PositionsModel = require("./model/PositionsModel.js");
// const OrdersModel = require("./model/OrdersModel.js");

// const PORT = process.env.PORT || 3002;
// const MONGO_URL = process.env.MONGO_URL;

// const app = express();

// // Middleware
// app.use(cookieParser()); // ✅ Parse cookies before handling requests
// app.use(bodyParser.json());
// app.use(express.json());

// // ✅ Proper CORS Configuration
// app.use(cors({ 
//   origin: ["http://localhost:3000", "http://localhost:3001"], // Allowed origins
//   credentials: true, // ✅ Allow cookies & credentials
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// // Routes
// app.use("/", authRoute);

// // ✅ Debug log for each request (for troubleshooting)
// app.use((req, res, next) => {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   console.log("Cookies:", req.cookies);
//   next();
// });

// // ✅ Routes with Authentication Middleware
// app.post("/newOrder",  async (req, res) => {
//   try {
//     let newOrder = new OrdersModel({
//       name: req.body.name,
//       qty: req.body.qty,
//       price: req.body.price,
//       mode: req.body.mode,
//     });
//     await newOrder.save();
//     res.json({ message: "Order saved!" });
//   } catch (error) {
//     console.error("Error saving order:", error);
//     res.status(500).json({ message: "Error saving order", error: error.message });
//   }
// });

// // app.get("/allOrders", userVerification, async (req, res) => {
// //   try {
// //     let allOrders = await OrdersModel.find({});
// //     res.json(allOrders);
// //   } catch (error) {
// //     console.error("Error fetching orders:", error);
// //     res.status(500).json({ message: "Error fetching orders", error: error.message });
// //   }
// // });
// app.get("/allOrders",  async (req, res) => {
//   console.log("📢 Received request at /allOrders"); // ✅ Debugging log
//   console.log("🔑 Received Token:", req.headers.authorization); // ✅ Check if token is sent

//   try {
//     let allOrders = await OrdersModel.find({});
//     res.json(allOrders);
//   } catch (error) {
//     console.error("❌ Error fetching orders:", error);
//     res.status(500).json({ message: "Error fetching orders", error: error.message });
//   }
// });


// app.get("/allHoldings", async (req, res) => {
//   try {
//     let allHoldings = await HoldingsModel.find({});
//     res.json(allHoldings);
//   } catch (error) {
//     console.error("Error fetching holdings:", error);
//     res.status(500).json({ message: "Error fetching holdings", error: error.message });
//   }
// });


// app.get("/allPositions",  async (req, res) => {
//   try {
//     let allPositions = await PositionsModel.find({});
//     res.json(allPositions);
//   } catch (error) {
//     console.error("Error fetching positions:", error);
//     res.status(500).json({ message: "Error fetching positions", error: error.message });
//   }
// });

// // ✅ MongoDB Connection
// mongoose.connect(MONGO_URL)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Import routes & middleware
const authRoute = require("./Routes/AuthRoute.js")

const { userVerification } = require("./MiddleWares/AuthMiddleware.js");

// Import models
const HoldingsModel = require("./model/HoldingsModel.js");
const PositionsModel = require("./model/PositionsModel.js");
const OrdersModel = require("./model/OrdersModel.js");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(cookieParser()); // ✅ Parse cookies before handling requests
app.use(bodyParser.json());
app.use(express.json());

// ✅ Proper CORS Configuration
app.use(cors({ 
  origin: ["http://localhost:3000", "http://localhost:3001"], // Allowed origins
  credentials: true, // ✅ Allow cookies & credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/", authRoute);

// ✅ Debug log for each request (for troubleshooting)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log("Cookies:", req.cookies);
  next();
});

// ✅ Protected Routes (Require Authentication)
app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.json({ message: "Order saved!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});

app.get("/allOrders", userVerification, async (req, res) => {
  console.log("📢 Received request at /allOrders"); // ✅ Debugging log
  console.log("🔑 Received Token:", req.headers.authorization); // ✅ Check if token is sent

  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

app.get("/allHoldings",userVerification,  async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ message: "Error fetching holdings", error: error.message });
  }
});

app.get("/allPositions", userVerification, async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Error fetching positions", error: error.message });
  }
});

// ✅ MongoDB Connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

