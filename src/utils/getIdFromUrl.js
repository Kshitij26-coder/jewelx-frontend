export const getIdFromUrl = url => {
     const parts = url.split('/');
     const lastPart = parts[parts.length - 1];
     return lastPart;
};
