const castumReports = require("./castumReports");
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3333;
const cors = require(`cors`);
const bodyParser = require("body-parser");
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => console.log(`matrix UI server ${err ? " on" : "listening"} port ${PORT}`));

app.post("/api/flexdoc", async function (req, res) {
  try {
    let fileCod = await req.body;
    const jsdata = await castumReports.exportCastumersRecords(fileCod);
    console.log(jsdata);
    let parsed = await JSON.parse(jsdata);
    fs.writeFileSync("jsonData.json", JSON.stringify(parsed.status.repdata, null, 2), (err) => console.log);
    res.send(parsed);
  } catch (err) {
    res.send(err);
  }
});
