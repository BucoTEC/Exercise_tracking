import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import ResError from "./customError";

const errorHandler = (
	err: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.error(err.stack);
	if (err instanceof ResError) {
		console.log(err);

		return res
			.status(err.status || 500)
			.json(`An error acured: ${err.message}`);
	}
	if (err instanceof Error) {
		console.log(err);

		res.status(500).json(err.message);
	}
};

export default errorHandler;
