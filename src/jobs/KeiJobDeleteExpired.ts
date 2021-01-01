import { Document } from 'mongoose';
import Audios from '../db/models/AudioModel'; 

interface Audio extends Document {
    expires?: number;
}

export default async (): Promise<void> => {
    const allAudios = await Audios.find({})
    for (let i = 0; i < allAudios.length; i++) {
        const a: Audio = allAudios[i];
        if(a.expires < Math.round(new Date().valueOf())){
            await Audios.findOneAndDelete({id: a.id})
        }
    }
}