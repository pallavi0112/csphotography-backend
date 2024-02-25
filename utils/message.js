//NOTE -  Messages for CRUD operations
const CREATE_SUCCESS = 'Data created successfully.';
const UPDATE_SUCCESS = 'Data updated successfully.';
const DELETE_SUCCESS = 'Data deleted successfully.';
const GET_SUCCESS = 'Data retrieved successfully.';

//NOTE -  Messages for authentication
const AUTHORIZED_ERROR  = 'unauthorized access';
const LOGIN_SUCCESS = 'Login successful.';
const LOGOUT_SUCCESS = 'Logout successful.';
const INVALID_EMAIL = 'Invalid email address';
const STAFF_CREATE = 'Staff account created successfully.';
const EMAIL_PASSWORD_ERROR = 'Please provide an email and password';
const AUTHENTICATION_FAILED = 'Authentication failed. Please provide valid credentials.';
const WRONG_CREDENTIALS = 'Wrong credentials provided. Please try again.';
const TOKEN_EXPIRED = 'Token has been expired , please login' ;

//NOTE -  Error messages
const BLANK_DATA_ERROR = 'Fields can not be blank.';
const USER_EXISTING_ERROR = 'Staff already exists.';
const DATA_NOT_FOUND_ERROR = 'Data not found.';
const INVALID_ID_ERROR = 'Invalid ID provided.';
const INTERNAL_ERROR = 'Internal server error. Please try again later.';
const PROVIDE_DATA = 'Please provide all data';

module.exports = {
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS,
    GET_SUCCESS,
    AUTHORIZED_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    BLANK_DATA_ERROR,
    USER_EXISTING_ERROR,
    DATA_NOT_FOUND_ERROR,
    INVALID_ID_ERROR,
    INTERNAL_ERROR,
    INVALID_EMAIL,
    STAFF_CREATE,
    EMAIL_PASSWORD_ERROR,
    AUTHENTICATION_FAILED,
    WRONG_CREDENTIALS,
    PROVIDE_DATA,
    TOKEN_EXPIRED
}