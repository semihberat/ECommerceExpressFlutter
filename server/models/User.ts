import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnect";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  createdAt?: Date;
  isVerified?: boolean;
  verificationToken?: string;
  token?: string; // ✅ eklendi
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "customer" | "admin";
  public readonly createdAt!: Date;
  public isVerified?: boolean;
  public verificationToken?: string;
  public token?: string; // ✅ eklendi
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: false,
      defaultValue: "customer",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING, // ✅ eklendi
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    updatedAt: false,
  }
);
