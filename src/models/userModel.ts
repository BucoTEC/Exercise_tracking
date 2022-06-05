import { DataTypes, Model, Sequelize } from "sequelize";
import connectDb from "@/db/connectDB";

const sequelize: Sequelize = connectDb();

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
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
	},
	{ sequelize, modelName: "user" }
);

const createUserTable = async () => {
	await User.sync();
};
createUserTable();

export default User;
