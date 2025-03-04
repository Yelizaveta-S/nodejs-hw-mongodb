import express from 'express';
import Contact from '../models/contact.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Error retrieving contacts' });
    }
});

router.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ message: 'Error retrieving contact' });
    }
});

export default router;
