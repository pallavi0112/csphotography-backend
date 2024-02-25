const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, INTERNAL_SERVER } = require("../utils/httpstatus");
const {
  AUTHORIZED_ERROR,
  INTERNAL_ERROR,
  TOKEN_EXPIRED,
} = require("../utils/message");
const sendResponse = require("../utils/sendResponse");

const isTokenVerified = (req, res, next) => {
  const isTokenProvided =
    (req.headers.authorization || req.headers.Authorization) &&
    req.headers.authorization.split(" ")[1];

  if (!isTokenProvided) {
    return sendResponse(res, UNAUTHORIZED, AUTHORIZED_ERROR);
  }
  const token =
    req.headers.authorization.split(" ")[1] ||
    req.headers.Authorization.split(" ")[1];
  const tokenKey =
    req.headers.authorization.split(" ")[0] ||
    req.headers.Authorization.split(" ")[0];
  if (tokenKey !== "token") {
    return sendResponse(res, UNAUTHORIZED, AUTHORIZED_ERROR);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //NOTE -  Checking whether the token has expired or not
    const expirationDate = new Date(decodedToken.exp * 1000);
    if (expirationDate <= new Date()) {
      return sendResponse(res, UNAUTHORIZED, TOKEN_EXPIRED);
    }
    if (!decodedToken) {
      return sendResponse(res, UNAUTHORIZED, AUTHORIZED_ERROR);
    }
    req.userData = decodedToken;
    next();
  } catch (err) {
    return sendResponse(res, INTERNAL_SERVER, INTERNAL_ERROR);
  }
};

module.exports = isTokenVerified;
