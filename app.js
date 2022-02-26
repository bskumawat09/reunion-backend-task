require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/api", (req, res) => {
	res.send(
		"Welcome to REUNION Backend Task. Please explore all the endpoints."
	);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port `, PORT);
});
