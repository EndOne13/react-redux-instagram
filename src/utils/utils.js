export const getPhotoFromState = (photos, photoId) => {
    const photo = photos.find(elem => elem.id === photoId)

    return {...photo}
}

export const getUpdatedPhotoForState = (photos, photoId, data) => {
    const newPhotos = [...photos]
    const photoIndex = newPhotos.findIndex((photo => photo.id === photoId))
    newPhotos[photoIndex] = data;

    return newPhotos
}