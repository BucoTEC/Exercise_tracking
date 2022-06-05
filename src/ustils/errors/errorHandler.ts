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
		return res
			.status(err.status || 500)
			.json(`An error acured: ${err.message}`);
	}
};

export default errorHandler;
