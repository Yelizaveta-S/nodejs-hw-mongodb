import express from 'express';
import { getAllContacts, getContactById } from '../controllers/contactsController.js';

const router = express.Router();

router.get('/contacts', getAllContacts);
router.get('/contacts/:contactId', getContactById);

export default router;
