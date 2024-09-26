// success 200
export const successResponse = (res, message, data = null) => {
  return res.status(200).json({
    success: true,
    message: message || "Success",
    data,
  });
};
