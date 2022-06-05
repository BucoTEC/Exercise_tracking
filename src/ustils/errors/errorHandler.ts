import { Request, Response, ErrorRequestHandler } from "express";

import ResError from "./customError";

const errorHandler = (
	err: ErrorRequestHandler,
	req: Request,
	res: Response
) => {
	// console.error(err.stack);
	if (err instanceof ResError) {
		res.status(err.status || 500).json(`An error acured: ${err.message}`);
	}
	if (err instanceof Error) {
		res.status(500).json(err.message);
	}
};

export default errorHandler;
