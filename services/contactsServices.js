import Contact from "../db/models/Contact.js";

export const getContacts = (query) =>
  Contact.findAll({
    where: query,
  });

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const addContact = (data) => Contact.create(data);

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const deleteContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.destroy();

  return contact;
};
