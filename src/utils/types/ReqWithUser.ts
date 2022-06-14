import { Request } from "express";

interface ReqWithUser extends Request {
	userData?: {
		userId: string;
		userEmail: string;
	};
}

export default ReqWithUser;
