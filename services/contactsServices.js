import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);
  return contacts[index];
};

export const deleteContactById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};
