import express, { Response } from 'express';
import Audios from '../db/models/AudioModel'; 
import Deleted from '../db/models/DeletedModel'; 

export default async (req: express.Request, res: express.Response): Promise<Response> => {
    if(!req.query.id) return res.status(400).send({ success: false, message: "No audio ID specified" })

    const count = await Audios.count()
    const deleted = await Deleted.count()
    return res.status(200).json({ success: true, count, deleted })
}