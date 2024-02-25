const sendResponse = require("../utils/sendResponse");
const {
  BAD_REQUEST,
  INTERNAL_SERVER,
  CREATED,
  UNAUTHORIZED,
  OK,
} = require("../utils/httpstatus");
const {
  BLANK_DATA_ERROR,
  INVALID_EMAIL,
  INTERNAL_ERROR,
  USER_EXISTING_ERROR,
  EMAIL_PASSWORD_ERROR,
  WRONG_CREDENTIALS,
  AUTHENTICATION_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROVIDE_DATA,
  STAFF_CREATE,
} = require("../utils/message");
const { isValidEmail } = require("../utils/commonFunc");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Staff = require("../models/staffSchema");
const Token = require("../models/tokenSchema");
const createStaff = async (req, res) => {
  try {
    //NOTE -  Extracting name, email, and password from the request body
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return sendResponse(res, BAD_REQUEST, PROVIDE_DATA);
    }
    //NOTE -  Check if any of the required fields (name, email, password) are blank
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return sendResponse(res, BAD_REQUEST, BLANK_DATA_ERROR);
    }

    //NOTE - Check if the email is a valid format
    if (!isValidEmail(email)) {
      return sendResponse(res, BAD_REQUEST, INVALID_EMAIL);
    }

    //NOTE - Check if a staff with the same email already exists
    const isStaffExist = await Staff.findOne({ email: email });
    if (isStaffExist) {
      return sendResponse(res, BAD_REQUEST, USER_EXISTING_ERROR);
    }

    //NOTE -  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //NOTE -  Create a new staff member
    await Staff.create({ name, email, password: hashedPassword });

    //NOTE - Return success response
    return sendResponse(res, CREATED, STAFF_CREATE);
  } catch (error) {
    //NOTE - If any error occurs during the process, return internal server error
    return sendResponse(res, INTERNAL_SERVER, INTERNAL_ERROR);
  }
};

const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //NOTE - Check if email and password are provided
    if (!email || !password) {
      return sendResponse(res, BAD_REQUEST, EMAIL_PASSWORD_ERROR);
    }

    //NOTE - Check if any of the required fields (email, password) are blank
    if (email.trim() === "" || password.trim() === "") {
      return sendResponse(res, BAD_REQUEST, BLANK_DATA_ERROR);
    }

    //NOTE - Check if the email is in a valid format
    if (!isValidEmail(email)) {
      return sendResponse(res, BAD_REQUEST, INVALID_EMAIL);
    }

    //NOTE - Get the staff from the database using the provided email
    const staff = await Staff.findOne({ email: email });

    //NOTE - If no such staff exists in the database, return unauthorized access
    if (!staff) {
      return sendResponse(res, UNAUTHORIZED, AUTHENTICATION_FAILED);
    }

    //NOTE - Compare the provided password with the one stored in the database
    const isPasswordMatched = await bcrypt.compare(password, staff.password);

    //NOTE - If passwords don't match, return unauthorized access
    if (!isPasswordMatched) {
      return sendResponse(res, UNAUTHORIZED, WRONG_CREDENTIALS);
    }

    //NOTE - Check if a token already exists for the staff
    const isTokenExists = await Token.findOne({ staffId: staff._id });

    //NOTE - If token exists and it's not expired, use that token to log in
    if (isTokenExists) {
      const currentDate = new Date();
      if (currentDate >= isTokenExists.expiredDate) {
        //NOTE - Update the existing token's expiry date
        let token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        const currentDate = new Date(); // Get the current date
        currentDate.setDate(currentDate.getDate() + 1); // Add one day to the current date
        const expiredDate = currentDate; // Assign the updated date to the expiredDate variable

        await Token.findByIdAndUpdate(
          isTokenExists._id,
          { $set: { token, expiredDate } },
          { new: true }
        );
        return sendResponse(res, OK, LOGIN_SUCCESS, { token: token });
      }
      return sendResponse(res, OK, LOGIN_SUCCESS, {
        token: isTokenExists?.token,
      });
    }

    //NOTE - Generate and attach a new token to the response body
    let token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const currentDate = new Date(); // Get the current date
    currentDate.setDate(currentDate.getDate() + 1); // Add one day to the current date
    const expiredDate = currentDate; // Assign the updated date to the expiredDate variable
    //  NOTE -  new entry in token if staff is logging first time
    await Token.create({ staffId: staff._id, token, expiredDate });
    return sendResponse(res, OK, LOGIN_SUCCESS, { token: token });
  } catch (error) {
    console.log(error);
    //NOTE - If any error occurs during the process, return internal server error
    return sendResponse(res, INTERNAL_SERVER, INTERNAL_ERROR);
  }
};

const staffLogout = async (req, res) => {
  try {
    const { id } = req.userData;
    await Token.findOneAndUpdate(
      { staffId: new mongoose.Types.ObjectId(id) }, // Corrected typo here
      { expiredDate: new Date() },
      { new: true }
    );
    return sendResponse(res, OK, LOGOUT_SUCCESS);
  } catch (error) {
    console.log(error)
    //NOTE - If any error occurs during the process, return internal server error
    return sendResponse(res, INTERNAL_SERVER, INTERNAL_ERROR);
  }
};

module.exports = { createStaff, staffLogin, staffLogout };
