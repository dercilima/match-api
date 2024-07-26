import { NotFoundError } from "../errors/not-found.error.js";

const handlePageNotFound = (app) => {
    app.use((req, res, next) => {
        next(new NotFoundError());
    });
};

export default handlePageNotFound;