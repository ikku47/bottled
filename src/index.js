const express = require("express");
const passport = require("passport");
const path = require("path");
const low = require("lowdb-recursive");
const db = low("db.json");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

function isUrl(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

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

app.post(
  "/api",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const random = uuidv4();
    const { message } = req.body;
    if (message) {
      db.get("urls")
        .push({
          id: random,
          message: message,
          user: req.user.id,
        })
        .write();
      return res.json({ id: random, message: message, user: req.user.id });
    } else return res.status(400).json({ message: "cant be empty" });
  }
);

app.post("/api/register", (req, res) => {
  const random = uuidv4();
  console.log(req.body);
  let { email, password } = req.body;
  if (email && password) {
    const isExists = db.get("users").find({ email }).value();
    if (isExists) return res.status(400).json({ email: "already in use" });
    else {
      password = bcrypt.hashSync(password.toString(), 10);
      db.get("users").push({ id: random, email, password }).write();
      jwt.sign(
        {
          id: random,
        },
        "secret",
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) return res.json({ err });
          else {
            return res.json({ token: `Bearer ${token}` });
          }
        }
      );
    }
  } else res.status(400).json({ err: "missing field" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = db.get("users").find({ email }).value();
    if (user) {
      bcrypt.compare(password, user.password, function (error, isSame) {
        if (isSame) {
          jwt.sign(
            {
              id: user.id,
            },
            "secret",
            {
              expiresIn: 36000,
            },
            (err, token) => {
              if (err) return res.status(400).json({ err });
              else {
                return res.json({ token: `Bearer ${token}` });
              }
            }
          );
        } else {
          return res.status(400).json({ password: "Password not correct" });
        }
      });
    } else return res.status(400).json({ email: "doesnt exist" });
  } else return res.status(400).json({ err: "missing field" });
});

app.get(
  "/api",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const urls = db.get("urls").findAll({ user: req.user.id });
    res.json(urls);
  }
);

app.get(
  "/api/:random([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    const urls = db.get("urls").find({ id: req.params.random }).value();
    if (urls) {
      if (isUrl(urls.message)) {
        res.redirect(urls.message);
      } else {
        res.json(urls);
      }
    } else res.status(400).json({ err: "wrong entry" });
  }
);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "my-app/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
