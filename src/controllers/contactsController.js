import createHttpError from 'http-errors';
import { 
    getAllContactsService, 
    getContactByIdService, 
    createContactService, 
    updateContactService, 
    deleteContactService 
} from '../services/contactsService.js';

export async function getAllContacts(req, res) {
  const contacts = await getAllContactsService();
  res.json({ status: 200, message: 'Contacts retrieved successfully', data: contacts });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({ status: 200, message: 'Contact retrieved successfully', data: contact });
}

export async function createContact(req, res) {
  const contactData = req.body;
  const newContact = await createContactService(contactData);

  res.status(201).json({ status: 201, message: 'Contact created successfully', data: newContact });
}

export async function updateContact(req, res) {
  const { contactId } = req.params;
  const contactData = req.body;

  const updatedContact = await updateContactService(contactId, contactData);

  if (!updatedContact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({ status: 200, message: 'Contact updated successfully', data: updatedContact });
}

export async function deleteContact(req, res) {
  const { contactId } = req.params;

  const deletedContact = await deleteContactService(contactId);

  if (!deletedContact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({ status: 200, message: 'Contact deleted successfully', data: deletedContact });
}