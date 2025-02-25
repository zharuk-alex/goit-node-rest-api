import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getContacts = async (req, res) => {
  const result = await contactsServices.getContacts();

  res.json(result);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const addContact = async (req, res) => {
  const result = await contactsServices.addContact(req.body);

  res.status(201).json(result);
};

export const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.deleteContactById(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
