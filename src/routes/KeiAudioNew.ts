import express, { Response } from 'express';
import Audio from '../db/models/AudioModel';
import dayjs from 'dayjs';
import randomstring from 'randomstring';

const KeiAudioNew = async (req: express.Request, res: express.Response): Promise<Response> => {
    if(!req.file) return res.status(400).json({ success: false, description: "No file uploaded!"})
    
    const id = randomstring.generate({length: 6}).toString()

    // TODO: Unlisted
    
    let title: string;
    let description: string;
    req.body.title ? title = req.body.title.toString() : title = "Untitled Audio"
    req.body.description ? description = req.body.description.toString() : description = "A cool audio file uploaded by a cool person."

    if(req.body.title.length > 20) return res.status(400).json({ success: false, description: "Description is over 20 characters"})
    if(req.body.description.length > 90) return res.status(400).json({ success: false, description: "Description is over 90 characters"})

    const uploaded = dayjs().unix()
    const expires = dayjs().add(3, 'day').unix()

    const audioDocument = new Audio({
        id,
        unlisted: true,
        title,
        description,
        ip: req.ip,
        uploaded,
        expires,
        filesize: req.file.size,
        filename: req.file.filename
    })
    await audioDocument.save()

    return res.status(200).json({success: true, id})
}

export default KeiAudioNew