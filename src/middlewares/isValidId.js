import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, _res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        return next(createHttpError(400, 'Invalid contact ID format'));
    }

    next();
};