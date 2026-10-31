import dotenv from "dotenv"

dotenv.config({ quiet: true });

const VALID_VIDEO_CODECS = ['VP8', 'H264', 'H265', 'VP9', 'AV1'];

export function parseVideoCodec(value: string): "VP8" | "H264" | "H265" {
	if (typeof value === "string") value = value.trim().toUpperCase();
	if (VALID_VIDEO_CODECS.includes(value)) return value as "VP8" | "H264" | "H265";
	return "H264";
}

export function parsePreset(value: string): "ultrafast" | "superfast" | "veryfast" | "faster" | "fast" | "medium" | "slow" | "slower" | "veryslow" {
	if (typeof value === "string") value = value.trim().toLowerCase();
	switch (value) {
		case "ultrafast": case "superfast": case "veryfast": case "faster": case "fast":
		case "medium": case "slow": case "slower": case "veryslow":
			return value as "ultrafast" | "superfast" | "veryfast" | "faster" | "fast" | "medium" | "slow" | "slower" | "veryslow";
		default: return "ultrafast";
	}
}

export function parseBoolean(value: string | undefined): boolean {
	return typeof value === "string" && value.trim().toLowerCase() === "true";
}

function parseAdminIds(value: string): string[] {
	try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) return parsed.filter(id => typeof id === 'string' && id.trim() !== '');
	} catch {
		if (value.includes(',')) return value.split(',').map(id => id.trim()).filter(id => id !== '');
	}
	return value.trim() ? [value.trim()] : [];
}

export default {
	token: process.env.TOKEN || '',
	prefix: process.env.PREFIX || '',
	guildId: process.env.GUILD_ID || '',
	cmdChannelId: process.env.COMMAND_CHANNEL_ID || '',
	videoChannelId: process.env.VIDEO_CHANNEL_ID || '',
	adminIds: process.env.ADMIN_IDS ? parseAdminIds(process.env.ADMIN_IDS) : [],
	videosDir: process.env.VIDEOS_DIR || './videos',
	previewCacheDir: process.env.PREVIEW_CACHE_DIR || './tmp/preview-cache',
	ytdlpCookiesPath: process.env.YTDLP_COOKIES_PATH || '',
	respect_video_params: parseBoolean(process.env.STREAM_RESPECT_VIDEO_PARAMS),
	bitrateOverride: parseBoolean(process.env.STREAM_BITRATE_OVERRIDE),
	width: parseInt(process.env.STREAM_WIDTH || '1280', 10),
	height: parseInt(process.env.STREAM_HEIGHT || '720', 10),
	fps: parseInt(process.env.STREAM_FPS || '30', 10),
	bitrateKbps: parseInt(process.env.STREAM_BITRATE_KBPS || '1000', 10),
	maxBitrateKbps: parseInt(process.env.STREAM_MAX_BITRATE_KBPS || '2500', 10),
	maxWidth: parseInt(process.env.STREAM_MAX_WIDTH || '0', 10),
	maxHeight: parseInt(process.env.STREAM_MAX_HEIGHT || '0', 10),
	hardwareAcceleratedDecoding: parseBoolean(process.env.STREAM_HARDWARE_ACCELERATION),
	h26xPreset: parsePreset(process.env.STREAM_H26X_PRESET || 'ultrafast'),
	videoCodec: parseVideoCodec(process.env.STREAM_VIDEO_CODEC || 'H264'),
	sessionSecret: process.env.SESSION_SECRET || '',
	server_enabled: parseBoolean(process.env.SERVER_ENABLED),
	server_username: process.env.SERVER_USERNAME || 'admin',
	server_password: process.env.SERVER_PASSWORD || 'admin',
	server_port: parseInt(process.env.SERVER_PORT || '8080', 10),
}