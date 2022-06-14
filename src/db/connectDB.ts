import { Sequelize } from "sequelize";

const connectDb = () => {
	const sequelize = new Sequelize(
		"postgres://adnan:0401@localhost:5432/exercise",
		{
			logging: false,
		}
	);

	sequelize
		.authenticate()
		.catch((err) => console.log(`Ups there was an error: ${err}`));
	return sequelize;
};

export default connectDb;
