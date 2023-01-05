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
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';
import config from './config.js';
import * as commandModules from "./commands"

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
    return guild.channels.cache.find((channel) => channel.id == config.LOG_CHNNEL_ID)
}

function eventGuildMemberAddOrRemove(member: GuildMember | PartialGuildMember, color: ColorResolvable): void {
    const channel = getLogsChannel(member.guild);
    if (channel && channel.type === ChannelType.GuildText) {
        let embeds = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} just joined!`, iconURL: member.user.avatarURL() || "" })
            .setColor(color)
            .setTimestamp()

        channel.send({ embeds: [embeds] })
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

    const channel = client.channels.cache.get("761857830923665418")

    if (!channel || channel.type !== ChannelType.GuildText) {
        return
    }

    channel.send({
        content: "Select your role by clicking on a button",
        components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
                new ButtonBuilder().setCustomId("PVPBOB").setLabel("PVP Bob").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("PVEDRAGON").setLabel("PVE Dragon").setStyle(ButtonStyle.Primary)),

            new ActionRowBuilder<ButtonBuilder>().setComponents(
                new ButtonBuilder().setCustomId("MAGE").setLabel("Mage").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("DRUID").setLabel("Druid").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("ROGUE").setLabel("Rogue").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("SHAMAN").setLabel("Shaman").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("HUTNER").setLabel("Hunter").setStyle(ButtonStyle.Primary)),

            new ActionRowBuilder<ButtonBuilder>().setComponents(
                new ButtonBuilder().setCustomId("PRIEST").setLabel("Priest").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("PALADIN").setLabel("Paladin").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("WARLOCK").setLabel("Warlock").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("WARRIOR").setLabel("Warrior").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("DEATHKNIGHT").setLabel("Death Knight").setStyle(ButtonStyle.Primary))
        ]
    })
})

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        const { commandName } = interaction
        commands[commandName].execute(interaction, client)
    }

    if (interaction.isButton()) {
        const role = interaction.guild!.roles.cache.get(ROLES[interaction.customId.toUpperCase()])
        const member = interaction.guild!.members.cache.get(interaction.user.id)

        if (!member || !role) {
            return;
        }

        if (member.roles.cache.find(r => r.id === role.id)) {
            member.roles.remove(role).then((member) => {
                interaction.reply({
                    content: `The ${role} role was removed to your ${member}`,
                    ephemeral: true
                })
            })
        }
        else {
            member.roles.add(role).then((member) => {
                interaction.reply({
                    content: `The ${role} role was added to your ${member}`,
                    ephemeral: true
                })
            })
        }
    }
})

client.on(Events.GuildMemberAdd, (member) => { eventGuildMemberAddOrRemove(member, "Green") })
client.on(Events.GuildMemberRemove, (member) => { eventGuildMemberAddOrRemove(member, "Red") })

client.login(config.DISCORD_TOKEN)