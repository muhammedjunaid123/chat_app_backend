const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const user_repo = require('../repositories/user_repository')


const img_upload = async (image, name, id, res) => {
    try {
        let url = ''
        const bufferStream = streamifier.createReadStream(image.buffer);
        const uploadStream = await cloudinary.uploader.upload_stream({ folder: 'jchat' },
            (error, result) => {
                if (error) {
                    return res.status(500).send(error);
                }
                user_repo.user_profile_update(id, name, res, result.secure_url)

            }
        );
        bufferStream.pipe(uploadStream);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    img_upload
}