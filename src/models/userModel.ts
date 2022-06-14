import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import connectDb from "@/db/connectDB";

const sequelize: Sequelize = connectDb();

// TODO add sequlize ts
type UserAttributes = {
	id: number;
	username: string;
	email: string;
	password: string;
};
type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
	declare id: number;
	declare username: string;
	declare email: string;
	declare password: string;
}

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
