require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const supabase = require("./lib/supabase");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend working!" });
});

// Adding all routes here
app.use("/api", routes);

// // Hämta produkter
// app.get("/api/products", async (req, res) => {
//   try {
//     const { data, error } = await supabase.from("products").select("*");

//     if (error) throw error;

//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Skapa en ny beställning
// app.post("/api/orders", async (req, res) => {
//   try {
//     const { orderData } = req.body;

//     const { data, error } = await supabase.from("orders").insert([orderData]);

//     if (error) throw error;

//     // Skicka orderbekräftelse via e-post
//     await sendOrderConfirmation(orderData);

//     res.status(201).json(data);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Funktion för att skicka orderbekräftelse
// async function sendOrderConfirmation(orderData) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: orderData.customerEmail,
//     subject: "Orderbekräftelse",
//     text: `Tack för din beställning! Ordernummer: ${orderData.orderNumber}`,
//   };

//   await transporter.sendMail(mailOptions);
// }

// Check Supabase connection
async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("Media_Projects")
      .select("id")
      .limit(1);
    if (error) throw error;
    console.log("Supabase connection successful");
  } catch (error) {
    console.error("Supabase connection failed:", error);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 3000;

// Start server only after checking Supabase connection
checkSupabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
