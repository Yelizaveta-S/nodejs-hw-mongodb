import express from 'express';
import { getAllContacts, getContactById } from '../services/contactsService.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
    try {
        const result = await getAllContacts();
        if (result.status === 'error') {
            return res.status(500).json({
                status: 500,
                message: result.message,
                data: null
            });
        }
        res.status(200).json({
            status: 200,
            message: result.message || 'Contacts fetched successfully',
            data: result.data || []
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving contacts',
            data: null
        });
    }
});

router.get('/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
        const result = await getContactById(contactId);
        if (result.status === 'error') {
            return res.status(404).json({
                status: 404,
                message: result.message || 'Contact not found',
                data: null
            });
        }
        res.status(200).json({
            status: 200,
            message: result.message || 'Contact found',
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving contact',
            data: null
        });
    }
});

export default router;
