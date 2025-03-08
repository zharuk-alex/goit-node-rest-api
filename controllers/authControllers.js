import fs from "node:fs/promises";
import path from "node:path";

import * as authServices from "../services/authServices.js";

const avatarsPath = path.resolve("public", "avatars");

export const register = async (req, res) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const login = async (req, res) => {
  const result = await authServices.loginUser(req.body);

  res.json({
    token: result.token,
    user: {
      email: result.user?.email,
      subscription: result.user?.subscription,
    },
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser({ id });
  res.status(204).send();
};

export const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const updateAvatar = async (req, res) => {
  const { id, avatarURL: oldAvatarURL } = req.user;
  let avatarURL = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  }

  const result = await authServices.updateUser({ id }, { avatarURL });

  if (oldAvatarURL) {
    const oldAvatarPath = path.resolve("public", oldAvatarURL);
    try {
      await fs.unlink(oldAvatarPath);
    } catch (error) {
      console.warn(error);
    }
  }

  res.status(200).json({
    avatarURL: result.avatarURL,
  });
};
