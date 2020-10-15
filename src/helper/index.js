const jwt = require("jsonwebtoken");
const moment = require("moment");

module.exports.generateToken = (userinfo) => {
  return jwt.sign(userinfo, "secret", { expiresIn: "1d" });
};

module.exports.addTime = (delay) => {
  return moment().add(delay, "seconds");
};

module.exports.formatUrl = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
};

module.exports.isUrl = (str) => {
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
};
