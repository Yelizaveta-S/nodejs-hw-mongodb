import Contact from '../models/contact.js';

export const getAllContactsService = async () => {
    return Contact.find();
};

export const getContactByIdService = async (contactId) => {
    return Contact.findById(contactId);
};


