import Contact from '../models/contact.js';

export const getAllContacts = async () => {
    try {
        const contacts = await Contact.find();
        return { status: 'success', message: 'Contacts retrieved successfully', data: contacts };
    } catch (error) {
        return { status: 'error', message: error.message || 'Error retrieving contacts', data: null };
    }
};

export const getContactById = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return { status: 'error', message: 'Contact not found', data: null };
        }
        return { status: 'success', message: 'Contact retrieved successfully', data: contact };
    } catch (error) {
        return { status: 'error', message: error.message || 'Error retrieving contact', data: null };
    }
};

