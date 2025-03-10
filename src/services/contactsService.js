import Contact from '../models/contact.js';

export const getAllContactsService = async () => {
    return Contact.find();
};

export const getContactByIdService = async (contactId) => {
    return Contact.findById(contactId);
};

export const createContactService = async (contactData) => {
    return Contact.create(contactData);
};

export const updateContactService = async (contactId, updateData) => {
    return Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContactService = async (contactId) => {
    return Contact.findByIdAndDelete(contactId);
};
