import { DataTypes, Sequelize } from "sequelize";
import { env } from "@config/env";
import { createNamespace } from "cls-hooked";

const namespace = createNamespace("db-transaction");
Sequelize.useCLS(namespace);

const db = new Sequelize(
  env.POSTGRESQL_DATABASE,
  env.POSTGRESQL_USERNAME,
  env.POSTGRESQL_PASSWORD,
  {
    host: env.POSTGRESQL_SERVER,
    dialect: "postgres",
    logging: env.NODE_ENV === "development" ? console.log : false,

    define: { timestamps: false },

    hooks: {
      beforeDefine: (columns: any, model: any) => {
        columns.createDate = {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: () => Date.now(),
          get() {
            const rawValue = this.getDataValue("createDate");
            return rawValue ? parseInt(rawValue as string, 10) : null;
          },
        };

        columns.updateDate = {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: () => Date.now(),
          get() {
            const rawValue = this.getDataValue("updateDate");
            return rawValue ? parseInt(rawValue as string, 10) : null;
          },
        };
      },

      beforeUpdate: (instance: any) => {
        instance.setDataValue("updateDate", Date.now());
      },

      beforeBulkUpdate: (options: any) => {
        options.attributes = options.attributes || {};
        options.attributes.updateDate = Date.now();
      },
    },
  }
);

export const connectDB = async () => {
  try {
    if (env.DB_RESET === "true") await db.sync({ force: true });
    else if (env.NODE_ENV === "development") await db.sync({ alter: true });
    return true;
  } catch (error) {
    console.log("Failed to connect to Postgresql database", error);
  }
  return false;
};

export const disconnectDB = async (fn: Function | null = null) => {
  try {
    await db.close();
    if (fn) fn();
    return true;
  } catch (error) {
    return false;
  }
};

export default db;
