import createHttpError from 'http-errors';
import { 
    getAllContactsService, 
    getContactByIdService, 
    createContactService, 
    updateContactService, 
    deleteContactService 
} from '../services/contactsService.js';

export async function getAllContacts(req, res, next) {
    try {
        const contacts = await getAllContactsService();
        res.json({ status: 200, message: 'Contacts retrieved successfully', data: contacts });
    } catch (error) {
        next(error);
    }
}

export async function getContactById(req, res, next) {
    try {
        const { contactId } = req.params;
        const contact = await getContactByIdService(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({ status: 200, message: 'Contact retrieved successfully', data: contact });
    } catch (error) {
        next(error);
    }
}

export async function createContact(req, res, next) {
    try {
        const contactData = req.body;
        const newContact = await createContactService(contactData);

        res.status(201).json({ status: 201, message: 'Contact created successfully', data: newContact });
    } catch (error) {
        next(error);
    }
}

export async function updateContact(req, res, next) {
    try {
        const { contactId } = req.params;
        const contactData = req.body;

        const updatedContact = await updateContactService(contactId, contactData);

        if (!updatedContact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({ status: 200, message: 'Contact updated successfully', data: updatedContact });
    } catch (error) {
        next(error);
    }
}

export async function deleteContact(req, res, next) {
    try {
        const { contactId } = req.params;

        const deletedContact = await deleteContactService(contactId);

        if (!deletedContact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}