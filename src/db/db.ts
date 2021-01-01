import mongoose, { Connection } from 'mongoose';
import keys from '../../config/keys.json';


const DB = async (): Promise<Connection> => {
    console.log("[DB] Connecting to DB")
    // Connect to Database
    mongoose.connect(keys.database, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection;

    // Log errors and successes
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => { console.log("[DB] Connected!") });

    return db;
}

// Export DB function
export default DB;