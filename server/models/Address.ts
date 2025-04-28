import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnect";
import { User } from "./User"; // User modelini içeri aktar

interface AddressAttributes {
  id: number;
  userId: number;
  addressLine: string;
  city: string;
  country: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AddressCreationAttributes = Optional<
  AddressAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public userId!: number;
  public addressLine!: string;
  public city!: string;
  public country!: string;
  public postalCode!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    addressLine: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "addresses",
    timestamps: true,
  }
);

// Kullanıcı ile ilişki
