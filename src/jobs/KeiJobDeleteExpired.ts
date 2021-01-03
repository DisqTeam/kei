import { Document } from 'mongoose';
import dayjs from 'dayjs';
import fs from 'fs';
import Audios from '../db/models/AudioModel'; 
import Deleted from '../db/models/DeletedModel';

interface Audio extends Document {
    expires?: number;
    filename?: string;
    id?: string;
}

export default async (): Promise<void> => {
    console.log(`[KeiJobDeleteExpired - ${new Date().toLocaleTimeString()}] Checking for files to delete..`)
    const allAudios = await Audios.find({})
    for (let i = 0; i < allAudios.length; i++) {
        const a: Audio = allAudios[i];
        if(a.expires < dayjs().unix()){
            console.log(`[KeiJobDeleteExpired] Deleted ${a.id}`)
            await Audios.findOneAndDelete({id: a.id})

            const deletedAudio = new Deleted({
                id: a.id,
                timestamp: dayjs().unix()
            })
            await deletedAudio.save()

            fs.unlink(`./audio/${a.filename}`, (err) => {
                if(err) throw err;
            })
        }
    }
}