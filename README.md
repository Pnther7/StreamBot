<div align="center">

<img src="src/server/public/favicon.svg" alt="StreamBot Logo" width="400" height="120"/>

# StreamBot

**A Discord video-streaming codebase with local media, remote sources, queueing, and a web management interface**

</div>

> [!CAUTION]
> **This project is not safe or supported to deploy against Discord.** Its current streaming implementation depends on a Discord selfbot account and unofficial voice/video libraries. Automating a normal user account may violate Discord's Terms of Service and can result in account restrictions or termination.
>
> **Do not use a personal Discord account or deploy this project against Discord.** This repository is retained for code review, maintenance, and exploration of the media-processing architecture. This README intentionally does not provide selfbot-token instructions or deployment steps.

## What the codebase contains

The existing implementation was built around these capabilities:

- **Local media:** reads video files from a configured library.
- **Remote media sources:** supports YouTube, YouTube Live, Twitch, and URLs handled by yt-dlp.
- **Playback queue:** queues media and advances between items.
- **Media processing:** uses FFmpeg for probing, transcoding, and stream preparation.
- **Web management UI:** an Express/EJS interface for library management, uploads, and previews.
- **Runtime configuration:** configurable output dimensions, frame rate, bitrate, codec, and hardware acceleration.

These are descriptions of the existing code, not a statement that the Discord integration is supported or safe to run.

## Streaming compatibility and limitations

The key architectural limitation is the Discord transport:

- The current video-to-voice-channel path relies on unofficial selfbot-oriented integrations.
- Discord's supported bot API does not provide a general, supported way for an ordinary bot account to transmit native video into a voice channel in the way this project does.
- Replacing the selfbot client with an official bot client would therefore **not** be a drop-in migration. It would remove the current native video-streaming capability.
- Keeping the existing streaming implementation intact does not make it compliant with Discord's rules or make deployment safe.

For those reasons, this project should not be represented as an officially supported Discord bot. Any future supported alternative would need a different delivery architecture and would not promise the same in-channel video experience.

## Maintenance direction

Changes to this repository should favor work that can be reviewed and tested without connecting to Discord, such as:

- improving media parsing, validation, and error handling;
- hardening file handling and web-interface security;
- reducing resource leaks in queue and FFmpeg process lifecycle management;
- adding unit tests with mocked Discord and media boundaries;
- documenting the boundary between media processing and Discord-specific transport.

Do not add instructions for obtaining or using a user token, and do not run integration tests against a real Discord account.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

The license does not grant permission to violate Discord's Terms of Service or other applicable terms.
