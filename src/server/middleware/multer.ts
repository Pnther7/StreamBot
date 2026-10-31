import multer, { StorageEngine } from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import fs from 'fs';
import config from '../../config.js';

const videoExtensions = new Set(['.mp4', '.mkv', '.webm', '.mov', '.avi', '.m4v', '.mpg', '.mpeg', '.ts', '.m3u8']);

if (!fs.existsSync(config.videosDir)) {
	fs.mkdirSync(config.videosDir, { recursive: true });
}

export const storage: StorageEngine = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, config.videosDir),
	filename: (_req, file, cb) => {
		const extension = path.extname(path.basename(file.originalname)).toLowerCase();
		if (!videoExtensions.has(extension)) return cb(new Error('Unsupported video file extension.'), '');
		cb(null, `${randomUUID()}${extension}`);
	}
});

export const upload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 * 1024, files: 1, fields: 4 },
	fileFilter: (_req, file, cb) => {
		const extension = path.extname(path.basename(file.originalname)).toLowerCase();
		if (!videoExtensions.has(extension)) return cb(new Error('Only supported video file extensions are allowed.'));
		cb(null, true);
	}
});