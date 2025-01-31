export function profilePicture(emailEncrypted){
    return `${process.env.REACT_APP_IMAGES_APPLICATIONURL}?emailId=${emailEncrypted}`
}


