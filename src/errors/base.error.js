class BaseError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    send(res) {
		res.status(this.status).send({
			status: this.status,
			message: this.message,
		});
	}
}

export default BaseError;