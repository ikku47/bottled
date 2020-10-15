const express = require("express");
const passport = require("passport");
const path = require("path");
const moment = require("moment");
const low = require("lowdb-recursive");
const db = low("db.json");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const routers = require("./routes");

//setting default data
db.defaults({ urls: [], users: [] }).write();

//cors
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "my-app/build")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport")(passport);

app.use("/api", routers);

app.use(
  "/:random([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})",
  (req, res, next) => {
    const url = db.get("urls").find({ id: req.params.random }).value();
    if (url && url.type === "link") {
      res.redirect(url.message);
    } else {
      res.sendFile(path.join(__dirname, "..", "my-app/build", "index.html"));
    }
  }
);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "my-app/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
