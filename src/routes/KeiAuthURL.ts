import express, { Response } from 'express';
import keys from '../../config/keys.json'; 

export default async (req: express.Request, res: express.Response): Promise<Response> => {
    const endpoint = "https://discord.com/api/oauth2/authorize"
    const clientId = keys.discord.clientId;
    const scope = "identify";
    const redirectUri: string = req.get('Origin') + '/auth/cb'

    return res.json({ success: true, url: `${endpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}`})
}