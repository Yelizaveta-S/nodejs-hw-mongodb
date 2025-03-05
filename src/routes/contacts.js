import express from 'express';
import { getAllContacts, getContactById } from '../services/contactsService.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
    try {
        const result = await getAllContacts();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving contacts', data: null });
    }
});

router.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
        const result = await getContactById(contactId);
        if (result.status === 'error') {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving contact', data: null });
    }
});

export default router;
