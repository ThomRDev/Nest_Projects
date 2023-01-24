type CallbackType = 
    (error: Error, acceptFile: boolean) => void

export const fileFilter = (req:Express.Request,file:Express.Multer.File,callback:CallbackType) => {
    
    // esto lanza un error por el lado de nest
    if(!file) return callback(new Error('File is empty'),false)

    const fileExtension = file.mimetype.split('/')[1]
    const validExtensions = ['jpg','jpeg','png','gif'];
    if(!validExtensions.includes(fileExtension)) {
        // false, ya que no se acepta
        return callback(null,false)
    }
    return callback(null,true)
}