import express, { Response } from 'express';
import Audios from '../db/models/AudioModel'; 
import Deleted from '../db/models/DeletedModel'; 
import Package from '../../package.json';

export default async (req: express.Request, res: express.Response): Promise<Response> => {
    const count = await Audios.countDocuments()
    const deleted = await Deleted.count()
    const version = Package.version

    return res.status(200).json({ success: true, count, deleted, version })
}