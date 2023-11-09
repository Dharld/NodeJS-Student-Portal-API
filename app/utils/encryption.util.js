const CryptoJS = require("crypto-js");
const { secret } = require("../config/config");

function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, secret).toString();
}

function decryptPassword(cryptedPassword) {
  return CryptoJS.AES.decrypt(cryptedPassword, secret).toString(
    CryptoJS.enc.Utf8
  );
}

module.exports = {
  encryptPassword,
  decryptPassword,
};
