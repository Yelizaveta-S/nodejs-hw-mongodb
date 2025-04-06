import createHttpError from 'http-errors';
import { 
    getAllContactsService, 
    getContactByIdService, 
    createContactService, 
    updateContactService, 
    deleteContactService 
} from '../services/contactsService.js';
import cloudinary from 'cloudinary';
import { getEnvVar } from '../utils/getEnvVar.js';
import fs from 'fs/promises';

const ALLOWED_CONTACT_TYPES = ['work', 'home', 'personal'];

export async function getAllContacts(req, res, _next) {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;
    
    const filteredType = ALLOWED_CONTACT_TYPES.includes(type)
      ? type
      : undefined;
    const result = await getAllContactsService(
        req.user._id, 
        page, 
        perPage, 
        sortBy, 
        sortOrder, 
        filteredType, 
        isFavourite
    );

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: result
    });
}

export async function getContactById(req, res, _next) {
        const { contactId } = req.params;
        const contact = await getContactByIdService(contactId, req.user._id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({ status: 200, message: 'Contact retrieved successfully', data: contact });
}

export async function createContact(req, res, _next) {
    const contactData = req.body;
    let photoUrl = null;

    if (req.file) {
        try {
          cloudinary.config({
            cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
            api_key: getEnvVar('CLOUDINARY_API_KEY'),
            api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
          });
        console.log('req.file.path:', req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);
        photoUrl = result.secure_url;
        await fs.unlink(req.file.path);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw createHttpError(500, 'Failed to upload photo');
      }
    }
        const newContact = await createContactService(
          { ...contactData, photo: photoUrl },
          req.user._id,
        );

        res.status(201).json({ status: 201, message: 'Contact created successfully', data: newContact });
}

export async function updateContact(req, res, _next) {
    const { contactId } = req.params;
    const contactData = req.body;
    let photoUrl = null;

    if (req.file) {
        try {
          cloudinary.config({
            cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
            api_key: getEnvVar('CLOUDINARY_API_KEY'),
            api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
          });
        console.log('req.file.path:', req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);
        photoUrl = result.secure_url;
        await fs.unlink(req.file.path);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw createHttpError(500, 'Failed to upload photo');
      }
    }

    const updatedContact = await updateContactService(
      contactId,
      { ...contactData, photo: photoUrl },
      req.user._id,
    );

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Contact updated successfully',
      data: updatedContact,
    });
}

export async function deleteContact(req, res, _next) {
        const { contactId } = req.params;

        const deletedContact = await deleteContactService(contactId, req.user._id);

        if (!deletedContact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(204).end();
}