// success
export const successResponse = (res, message, data = null) => {
  return res.status(200).json({
    success: true,
    message: "Success",
    data,
  });
};

// error 404
export const middleware404 = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
};

// error 500
export const errorResponse = (
  res,
  message = "Internal server error",
  error = null
) => {
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error ? error.message : null,
  });
};

// error 400
export const badRequestResponse = (res, message = "Bad request") => {
  return res.status(400).json({
    status: "error",
    code: 400,
    message: "email or password is incorrect",
  });
};
