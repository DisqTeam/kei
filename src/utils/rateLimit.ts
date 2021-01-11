import ratelimit from 'express-rate-limit';

const UploadLimit = ratelimit({
    windowMs: 8 * 60 * 60 * 1000, // 8 Hour
    max: 6,  // 6 Files
    headers: true
});

export {
    UploadLimit
}