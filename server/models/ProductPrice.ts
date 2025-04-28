import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConnect";
import { Product } from "./Product";

export class ProductPrice extends Model {
  public id!: number;
  public productId!: number;
  public price!: number;
  public date!: Date;
}

ProductPrice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductPrice",
    tableName: "product_prices",
    timestamps: false,
  }
);
