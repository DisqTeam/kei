import express, { Response } from 'express';
import Audios from '../db/models/AudioModel'; 

export default async (req: express.Request, res: express.Response): Promise<Response> => {
    if(!req.query.id) return res.status(400).send({ success: false, message: "No audio ID specified" })

    const audio = await Audios.findOne(
        {id: req.query.id},
        {"_id": 0, "id": 1, "title": 1, "description": 1, "uploaded": 1, "expires": 1, "filesize": 1, "filename": 1}
    )
    if(!audio) return res.status(400).json({ success: false, description: 'No audio found with that ID.' });
    return res.status(200).json({ success: true, audio })
}