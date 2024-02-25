// NOTE - helper function to sending response
const sendResponse = (response, status, message, data = null) => {
  // NOTE - create response object
  const resData = {
    message: message,
  };
  //NOTE - check if data is not null then add it to response object
  if (data) {
    resData.data = data;
  }
  return response.status(status).json(resData);
};
module.exports = sendResponse;