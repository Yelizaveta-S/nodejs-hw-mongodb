import express from 'express';
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContact));
router.patch('/:contactId', jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
