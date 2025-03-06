import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getContacts = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.getContacts({ owner });

  res.json(result);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsServices.getContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const addContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

export const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsServices.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.deleteContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
