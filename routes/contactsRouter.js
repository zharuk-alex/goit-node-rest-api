import express from "express";
import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getContacts));

contactsRouter.get("/:id", ctrlWrapper(getContactById));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(addContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactById)
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  ctrlWrapper(updateContactById)
);

contactsRouter.delete("/:id", ctrlWrapper(deleteContactById));

export default contactsRouter;
