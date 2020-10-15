const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const low = require("lowdb-recursive");
const db = low("db.json");
const { generateToken, isUrl, addTime } = require("../helper");

module.exports = {
  getUserMessage: function (req, res, next) {
    const urls = db.get("urls").findAll({ user: req.user.id });
    res.json(urls);
  },
  getMessage: function (req, res, next) {
    const urls = db.get("urls").find({ id: req.params.random }).value();
    if (urls) {
      res.json(urls);
    } else res.status(400).json({ err: "wrong entry" });
  },
  postMessage: function (req, res, next) {
    const id = uuidv4();
    const { message, timer, type } = req.body;
    if (message) {
      db.get("urls")
        .push({
          id,
          message,
          type,
          expiry: addTime(timer),
          user: req.user.id,
        })
        .write();
      return res.json({ id, message, user: req.user.id });
    } else return res.status(400).json({ message: "cant be empty" });
  },
  // login: function (req, res, next) {
  //   const { email, password } = req.body;
  //   if (email && password) {
  //     const user = db.get("users").find({ email }).value();
  //     if (user) {
  //       bcrypt.compare(password, user.password, function (error, isSame) {
  //         if (isSame) {
  //           return res.json({
  //             token: `Bearer ${generateToken({ id: user.id })}`,
  //           });
  //         } else {
  //           return res.status(400).json({ password: "Password not correct" });
  //         }
  //       });
  //     } else return res.status(400).json({ email: "doesnt exist" });
  //   } else return res.status(400).json({ err: "missing field" });
  // },
  auth: function (req, res, next) {
    const random = uuidv4();
    let { email, password } = req.body;
    if (email && password) {
      const user = db.get("users").find({ email }).value();
      if (user) {
        bcrypt.compare(password, user.password, function (error, isSame) {
          if (isSame) {
            return res.json({
              token: `Bearer ${generateToken({ id: user.id })}`,
            });
          } else {
            return res.status(400).json({ password: "Wrong password !" });
          }
        });
      } else {
        password = bcrypt.hashSync(password.toString(), 10);
        db.get("users").push({ id: random, email, password }).write();
        return res.json({ token: `Bearer ${generateToken({ id: user.id })}` });
      }
    } else res.status(400).json({ err: "missing field" });
  },
};
