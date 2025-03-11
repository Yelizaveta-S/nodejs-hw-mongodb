import createHttpError from 'http-errors';
import { 
    getAllContactsService, 
    getContactByIdService, 
    createContactService, 
    updateContactService, 
    deleteContactService 
} from '../services/contactsService.js';

export async function getAllContactsController(req, res) {
    const contacts = await getAllContactsService();
    res.json(contacts);
}

export async function getContactByIdController(req, res) {
    const { contactId } = req.params;

    const contact = await getContactByIdService(contactId);

    if (!contact) {
        throw new createHttpError.NotFound('Contact not found');
    }

    res.json(contact);
}

export async function createContactController(req, res) {
    const contact = req.body;
    const newContact = await createContactService(contact);

    res.status(201).json({
        status: 201,
        message: 'Contact created successfully',
        data: newContact
    });
}

export async function updateContactController(req, res) {
    const { contactId } = req.params;
    const contactData = req.body;

    const updatedContact = await updateContactService(contactId, contactData);

    if (!updatedContact) {
        throw new createHttpError.NotFound('Contact not found');
    }

    res.json({
        status: 200,
        message: 'Contact updated successfully',
        data: updatedContact
    });
}

export async function deleteContactController(req, res) {
    const { contactId } = req.params;

    const deletedContact = await deleteContactService(contactId);

    if (!deletedContact) {
        throw new createHttpError.NotFound('Contact not found');
    }

    res.status(204).send();
}