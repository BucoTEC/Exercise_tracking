class ResError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super();
		this.message = message;
		this.status = status;
	}
}

export default ResError;
// TODO fix erorr handler
