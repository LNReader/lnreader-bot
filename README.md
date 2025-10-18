# lnreader-bot

Discord bot for [LNReader](https://github.com/LNReader/lnreader) community support.

## Features

- `/plugins` - Browse and search available LNReader plugins
- `/issue` - Report bugs or request features
- `/migrate` - Get migration instructions for upgrading LNReader
- `/help` - View all available commands
- `/info` - Display bot information
- `/ping` - Check bot latency

## Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your bot token and settings.

3. Run in development:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## License

MIT License
