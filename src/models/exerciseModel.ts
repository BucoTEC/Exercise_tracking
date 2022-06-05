import { DataTypes, Model, Sequelize } from "sequelize";
import connectDb from "@/db/connectDB";
import User from "@/models/userModel";

const sequelize: Sequelize = connectDb();

class Exercise extends Model {}

Exercise.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		difficulty: {
			type: DataTypes.ENUM("1/5", "2/5", "3/5", "4/5", "5/5"),
			allowNull: false,
		},
		exaustion: {
			type: DataTypes.ENUM("1/5", "2/5", "3/5", "4/5", "5/5"),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, modelName: "exercise" }
);

Exercise.belongsTo(User, { foreignKey: "ownerId" });

const createExerciseTable = async () => {
	await Exercise.sync();
};
createExerciseTable();

export default Exercise;
