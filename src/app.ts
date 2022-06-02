import express from "express";
const app = express();

app.get("/", (req, res) => {
	res.send("welcome to server");
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is operational on port: ${PORT}`);
});
