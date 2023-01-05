import { SlashCommandBuilder } from "@discordjs/builders"
import { ChannelType, Client, CommandInteraction, InteractionType, TextChannel } from "discord.js"
import { createTicket } from "../firebase"

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Create a new help ticket.")
    .addStringOption((option) =>
        option
            .setName("description")
            .setDescription("Describe your problem")
            .setRequired(true)
    )

export async function execute(interaction: CommandInteraction, clinet: Client) {
    if (!interaction?.channelId) {
        return
    }

    const channel = await clinet.channels.fetch(interaction.channelId)
    if (!channel || channel.type !== ChannelType.GuildText || !interaction.isChatInputCommand()) {
        return
    }

    const thread = await (channel as TextChannel).threads.create({
        name: `support-${Date.now()}`,
        reason: `Support ticket ${Date.now()}`
    })

    const problemDescription = interaction.options.getString("description")
    const { user } = interaction;

    if (!problemDescription) {
        return
    }

    thread.send( `**User:** <@${user}>\n**Problem:** ${problemDescription}`)

    await createTicket(thread.id, problemDescription)

    return interaction.reply({
        content: "Help is on the way!",
        ephemeral: true
    })
}
