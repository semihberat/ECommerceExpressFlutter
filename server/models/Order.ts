import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnect";
import { User } from "./User"; // User modelini içeri aktar
import { Product } from "./Product"; // Product modelini içeri aktar

// Order tip tanımı
interface OrderAttributes {
  id: number;
  userId: number; // Kullanıcı ID'si
  totalAmount: number; // Toplam tutar
  createdAt?: Date;
}

// Create sırasında 'id' ve 'createdAt' otomatik gelir
type OrderCreationAttributes = Optional<OrderAttributes, "id" | "createdAt">;

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public readonly createdAt!: Date;
}

// Order modeli
Order.init(
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
        model: User, // Referans olarak User tablosunu belirtiyoruz
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    updatedAt: false, // sadece createdAt kullanılacak
  }
);
