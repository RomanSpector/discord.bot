import dotenv from "dotenv"
dotenv.config()

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, LOG_CHNNEL_ID } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN || !LOG_CHNNEL_ID) {
    throw new Error("Missing environment variables")
}

const config: Record<string, string> = {
    CLIENT_ID,
    GUILD_ID,
    DISCORD_TOKEN,
    LOG_CHNNEL_ID
}

export default config
