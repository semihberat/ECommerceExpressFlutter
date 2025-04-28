import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnect";
import { User } from "./User"; // User modelini içe aktar
import { Product } from "./Product"; // Product modelini içe aktar

// Favorite tip tanımı
interface FavoriteAttributes {
  id: number;
  userId: number;
  productId: number;
  createdAt?: Date;
}

// Create sırasında 'id' ve 'createdAt' otomatik gelir
type FavoriteCreationAttributes = Optional<
  FavoriteAttributes,
  "id" | "createdAt"
>;

export class Favorite
  extends Model<FavoriteAttributes, FavoriteCreationAttributes>
  implements FavoriteAttributes
{
  public id!: number;
  public userId!: number;
  public productId!: number;
  public readonly createdAt!: Date;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Favorite",
    tableName: "favorites",
    timestamps: true,
    updatedAt: false, // sadece createdAt kullanılacak
  }
);
