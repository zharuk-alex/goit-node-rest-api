import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

import {
  register,
  login,
  logout,
  currentUser,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(login));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.get("/current", authenticate, ctrlWrapper(currentUser));

export default authRouter;
