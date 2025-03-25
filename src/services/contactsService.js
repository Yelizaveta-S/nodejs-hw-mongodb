import Contact from '../models/contact.js';

export async function getAllContactsService(
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite,
) {
  const pageNumber = Number(page);
  const limit = Number(perPage);
  const skip = (pageNumber - 1) * limit;
  const order = sortOrder === 'desc' ? -1 : 1;

  const filter = { userId };
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
    hasNextPage: pageNumber < totalPages,
  };
}

export const getContactByIdService = async (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const createContactService = async (contactData, userId) => {
  return Contact.create({ ...contactData, userId });
};

export const updateContactService = async (contactId, updateData, userId) => {
  return Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true },
  );
};

export const deleteContactService = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
