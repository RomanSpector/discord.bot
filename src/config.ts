import dotenv from "dotenv"
dotenv.config()

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, LOG_CHANNEL_ID, PORT } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN || !LOG_CHANNEL_ID || !PORT) {
    throw new Error("Missing environment variables")
}

const config: Record<string, string> = {
    CLIENT_ID,
    GUILD_ID,
    DISCORD_TOKEN,
    LOG_CHANNEL_ID,
    PORT
}

export default config
