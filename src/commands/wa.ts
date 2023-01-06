import { ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } from "@discordjs/builders"
import { CommandInteraction, ButtonStyle } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("wa")
    .setDescription("Link WeakAuras last version")

const button = new ButtonBuilder({
    label: "Download",
    style: ButtonStyle.Link,
    url: "https://github.com/Bunny67/WeakAuras-WotLK/archive/refs/heads/master.zip",
    emoji: { name: `🔃` },
})

const embeds = new EmbedBuilder({
    title: "WeakAuras",
    color: 0x13ffff,
    image: { url: "https://i.imgur.com/wwbxeCG.jpeg" },
    url: "https://github.com/Bunny67/WeakAuras-WotLK",
    description: "WeakAuras is a powerful and flexible framework that allows the display of highly customizable graphics on World of Warcraft's user interface to indicate buffs, debuffs, and other relevant information. This addon was created to be a lightweight replacement for Power Auras but has since introduced more functionalities while remaining efficient and easy to use."
})

const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button)

export async function execute(interaction: CommandInteraction) {
    return interaction.reply({ embeds: [embeds], components: [actionRow] })
}
