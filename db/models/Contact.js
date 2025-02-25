import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";

const Contact = sequelize.define("contacts", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Contact.sync({ force: true });

export default Contact;
