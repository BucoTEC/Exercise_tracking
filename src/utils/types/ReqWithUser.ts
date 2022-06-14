import { Request } from "express";

interface ReqWithUser extends Request {
	userData?: {
		userId: number;
		userEmail: string;
	};
}

export default ReqWithUser;
