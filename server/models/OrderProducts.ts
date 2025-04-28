import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConnect";

// OrderProducts ilişkisel tablosu tip tanımı
export class OrderProducts extends Model {
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number; // Ürün fiyatı
}

OrderProducts.init(
  {
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProducts",
    tableName: "order_products",
    timestamps: false, // Bu ilişki tablosu zaman damgası gerektirmez
  }
);
// Order ve Product ile ilişkilendirme
