import { getAllContactsService, getContactByIdService } from '../services/contactsService.js';

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getAllContactsService();
        res.status(200).json({
            status: 200,
            message: 'Contacts retrieved successfully',
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving contacts',
            data: null
        });
    }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
    try {
      const contact = await getContactByIdService(contactId);
        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: 'Contact not found',
                data: null
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Contact retrieved successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving contact',
            data: null
        });
    }
};
