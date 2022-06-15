import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import connectDb from "@/db/connectDB";
import User from "@/models/userModel";

const sequelize: Sequelize = connectDb();

type ExerciseAttributes = {
	id: number;
	date: object;
	description: string;
	duration: string;
	difficulty: string;
	exaustion: string;
	type: string;
	ownerId: number;
};

type ExerciseCreationAttributes = Optional<ExerciseAttributes, "id">;

class Exercise extends Model<ExerciseCreationAttributes, ExerciseAttributes> {
	declare id: number;
	declare date: object;
	declare description: string;
	declare duration: string;
	declare difficulty: string;
	declare exaustion: string;
	declare type: string;
	declare ownerId: number;
}

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
		ownerId: {
			type: DataTypes.NUMBER,
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
