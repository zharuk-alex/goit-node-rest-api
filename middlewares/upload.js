import multer from "multer";
import path from "node:path";

import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: path.resolve("temp"),
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return callback(HttpError(400, ".exe file not allow"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
