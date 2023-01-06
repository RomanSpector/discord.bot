import { ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonStyle } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("wa")
    .setDescription("Link WeakAuras last version")

const button = new ButtonBuilder()
    .setLabel("Download")
    .setURL("https://github.com/Bunny67/WeakAuras-WotLK/archive/refs/heads/master.zip")
    .setStyle(ButtonStyle.Link)
    .setEmoji({ name: `🔃` })

const embeds = new EmbedBuilder()
    .setTitle("WeakAuras")
    .setColor("#13ffff")
    .setImage("https://i.imgur.com/wwbxeCG.jpeg")
    .setURL("https://github.com/Bunny67/WeakAuras-WotLK")
    .setDescription("WeakAuras is a powerful and flexible framework that allows the display of highly customizable graphics on World of Warcraft's user interface to indicate buffs, debuffs, and other relevant information. This addon was created to be a lightweight replacement for Power Auras but has since introduced more functionalities while remaining efficient and easy to use.")

const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button)

export async function execute(interaction: CommandInteraction) {
    return interaction.reply({ embeds: [embeds], components: [actionRow] })
}
