import {
    GuildBasedChannel,
    ChannelType,
    Client,
    ColorResolvable,
    EmbedBuilder,
    Events,
    GatewayIntentBits,
    Guild,
    GuildMember,
    PartialGuildMember,
    Partials,
    Role,
    CacheType,
    ButtonInteraction
} from 'discord.js';
import config from './config.js';
import * as commandModules from "./commands"
import express from "express"

const app = express()
const port = config.PORT

const commands = Object(commandModules)

const ROLES: Record<string, string> = {
    PVPBOB: "815996884811907104",
    PVEDRAGON: "815997204871380992",
    WARRIOR: "813395545640009760",
    WARLOCK: "813395500958744587",
    DRUID: "813395149635846164",
    PALADIN: "813395357417209868",
    HUTNER: "813395240697593886",
    MAGE: "813395306720264193",
    ROGUE: "813395409204150282",
    PRIEST: "813394876648521768",
    SHAMAN: "813395406938439718",
    DEATHKNIGHT: "813395070149591041"
}

function getLogsChannel(guild: Guild): GuildBasedChannel | undefined {
    return guild.channels.cache.find((channel) => channel.id == config.LOG_CHANNEL_ID)
}

function removeRoleTo(member: GuildMember, role: Role, interaction?: ButtonInteraction<CacheType>): void {
    member.roles.remove(role).then((member) => {
        interaction?.reply({
            content: `The ${role} role was removed to your ${member}`,
            ephemeral: true
        })
    })
}

function addRoleTo(member: GuildMember, role: Role, interaction?: ButtonInteraction<CacheType>): void {
    member.roles.add(role).then((member) => {
        interaction?.reply({
            content: `The ${role} role was added to your ${member}`,
            ephemeral: true
        })
    })
}

function removeOrAddRoleTo(member: GuildMember, role: Role, interaction: ButtonInteraction<CacheType>): void {
    if (member.roles.cache.find(({ id }) => id === role.id))
        removeRoleTo(member, role, interaction)
    else
        addRoleTo(member, role, interaction)
}

function eventGuildMemberAddOrRemove(member: GuildMember | PartialGuildMember, color: ColorResolvable): void {
    const channel = getLogsChannel(member.guild);
    if (channel && channel.type === ChannelType.GuildText) {
        const embeds = new EmbedBuilder({
            timestamp: Date(),
            author: {
                name: `${member.user.tag} jusst ${(color === "Green") ? "join" : "leave"}!`,
                iconURL: member.user.avatarURL() || "https://cdn.siasat.com/wp-content/uploads/2021/05/Discord.jpg"
            }
        }).setColor(color)

        channel.send({ embeds: [embeds] })
        channel.setName(`member-count-${channel.guild.memberCount}`)
    }
}

// -------------------------------------------------------------

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
    ],

    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.on("ready", () => {
    console.log("Discord 🤖 ready! ✨🎉💥")
})

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        const { commandName } = interaction
        commands[commandName].execute(interaction, client)
    }

    if (interaction.isButton() && interaction.guild) {
        const role = interaction.guild.roles.cache.get(ROLES[interaction.customId.toUpperCase()])
        const member = interaction.guild.members.cache.get(interaction.user.id)

        if (member && role) {
            return removeOrAddRoleTo(member, role, interaction);
        }
    }
})

client.on(Events.GuildMemberAdd, (member) => { eventGuildMemberAddOrRemove(member, "Green") })
client.on(Events.GuildMemberRemove, (member) => { eventGuildMemberAddOrRemove(member, "Red") })

client.login(config.DISCORD_TOKEN)

app.get('/', function (request, response) { response.send(`Монитор активен. Локальный адрес: http://localhost:${port}`); })
app.listen(port, () => console.log("Listen for connections."))
