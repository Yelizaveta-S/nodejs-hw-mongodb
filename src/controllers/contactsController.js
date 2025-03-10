import createError from 'http-errors';
import { 
    getAllContactsService, 
    getContactByIdService, 
    createContactService, 
    updateContactService, 
    deleteContactService 
} from '../services/contactsService.js';
import mongoose from 'mongoose';

export const getAllContacts = async (req, res) => {
    const contacts = await getAllContactsService();
    res.status(200).json({
        status: 200,
        message: 'Contacts retrieved successfully',
        data: contacts
    });
};

export const getContactById = async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createError(400, 'Invalid contact ID'));
    }

    const contact = await getContactByIdService(contactId);

    if (!contact) {
        return next(createError(404, 'Contact not found')); 
    }

    res.status(200).json({
        status: 200,
        message: 'Contact retrieved successfully',
        data: contact
    });
};

export const createContact = async (req, res) => {
    const newContact = await createContactService(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact
    });
};

export const updateContact = async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createError(404, 'Contact not found'));
    }

    const updatedContact = await updateContactService(contactId, req.body);

    if (!updatedContact) {
        return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact
    });
};

export const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createError(404, 'Contact not found'));
    }

    const deletedContact = await deleteContactService(contactId);

    if (!deletedContact) {
        return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
};

