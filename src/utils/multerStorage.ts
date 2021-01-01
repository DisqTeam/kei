import randomstring from 'randomstring';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'audio');
    },
    filename: function(req, file, cb): void {
        const fileId = randomstring.generate({
            length: 16,
        }).toString()

        cb(null, fileId + path.extname(file.originalname));
    }
});

export default storage;