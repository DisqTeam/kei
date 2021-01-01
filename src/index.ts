import config from '../config/main.json';
import { allowedExtensions, allowedTypes } from './utils/allowedlist';
import storage from './utils/multerStorage';
import DB from './db/db';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express()
const db = DB();
app.use(cors())
app.use('/storage', express.static("audio"))

const upload = multer({
    storage: storage,
    limits: { fileSize: 31457280 },
    fileFilter: (req, file, cb) => {
        const fileExt = path.extname(file.originalname).replace(".", "").toLowerCase()
        if(!allowedExtensions.includes(fileExt)){
            return cb(new Error("File extension not allowed"))
        }
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Error("File type not allowed"))
        }
        return cb(null, true)
    }
})

import KeiAudioGet from './routes/KeiAudioGet';
import KeiAudioNew from './routes/KeiAudioNew';

app.get('/', (req: express.Request, res: express.Response) => res.send("uwu"))
app.get('/audio/get', (req: express.Request, res: express.Response) => KeiAudioGet(req, res))
app.post('/audio/new', upload.single('audio_file'), (req: express.Request, res: express.Response) => KeiAudioNew(req, res))
app.use( (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(err.message == "File too large") return res.status(400).json({success: false, description: "File size is over 30MB"})
        if(err.message == "File extension not allowed" || err.message == "File type not allowed")
            return res.status(400).json({success: false, description: err.message})

        console.log(err.stack)
        return res.status(500).json({success: false, description: "A server-side error occured! ｡゜(｀Д´)゜｡"})
})

import KeiJobDeleteExpired from './jobs/KeiJobDeleteExpired';
setTimeout(KeiJobDeleteExpired, 600000)

app.listen(config.port, () => {
    console.log("Kei is now running on port " + config.port)
})