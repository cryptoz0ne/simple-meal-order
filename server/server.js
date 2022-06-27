const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

async function initialize () {
    await mongoose
            .connect(process.env.DB_URL, { useNewUrlParser: true })
            .then(() => {
                console.log("DB Connection ... OK!");
            })
            .catch((error) => {
                console.log("DB Connection ... FAIL: ", error);
            });

    const app = express();
    app.use(express.json());
    app.use(cors());

    // Use setTimeout for UI spinner implementation
    app.use((req, res, next) => {
        setTimeout(next, 2000);
    })

    app.get("/", (req, res) => {
        res.send("Server Status... OK!");
    })

    app.use("/api", routes);

    app.listen(4000, () => {
        console.log("Server has started! - http://localhost:4000");
    })
}

initialize();