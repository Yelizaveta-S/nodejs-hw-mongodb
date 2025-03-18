import Contact from '../models/contact.js';

export async function getAllContactsService(page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite) {
    const pageNumber = Number(page);
    const limit = Number(perPage);
    const skip = (pageNumber - 1) * limit;
    const order = sortOrder === 'desc' ? -1 : 1;

    const filter = {};
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

    const totalItems = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalItems / limit);

    return {
        data: contacts,
        page: pageNumber,
        perPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages
    };
}

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
