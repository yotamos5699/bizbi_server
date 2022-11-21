const castumReports = require("./castumReports");
const express = require("express");
const app = express();

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

    let fileCod = await req.body;
    const jsdata = await castumReports.exportCastumersRecords(fileCod);
    console.log(jsdata);
    //let parsed = await JSON.parse(jsdata);
   
    res.send(jsdata);
  
});
