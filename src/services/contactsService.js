import Contact from '../models/contact.js';

export const getAllContacts = async () => {
    try {
        const contacts = await Contact.find();
        return {
            status: 200,
            message: 'Contacts retrieved successfully',
            data: contacts
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || 'Error retrieving contacts',
            data: null
        };
    }
};

export const getContactById = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return {
                status: 404,
                message: 'Contact not found',
                data: null
            };
        }
        return {
            status: 200,
            message: 'Contact retrieved successfully',
            data: contact
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || 'Error retrieving contact',
            data: null
        };
    }
};


