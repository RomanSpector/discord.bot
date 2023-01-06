import { ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonStyle } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("lib")
    .setDescription("Addons lib")

const button = new ButtonBuilder()
    .setLabel("Download")
    .setURL("https://yadi.sk/d/9wxHrNwl_13LbA")
    .setStyle(ButtonStyle.Link)
    .setEmoji({ name: `🔃` })

const embeds = new EmbedBuilder()
    .setTitle("Libs")
    .setColor("#13ffff")
    .setImage("https://cdn-fifmh.nitrocdn.com/EGioCxfDvAOMyzZnrMzMzxXqCRnQlPIW/assets/static/optimized/rev-aa4e56b/wp-content/uploads/2022/07/How-To-Install-WoW-Addons.jpg")
    .setURL("https://yadi.sk/d/9wxHrNwl_13LbA")
    .setDescription("Библиотеки для некоторых моих ВАшек, чтобы они конкретно отображали информацию. Для установки нужно просто извлеч архив в папку с аддонами и перезапустить игру.")

const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button)

export async function execute(interaction: CommandInteraction) {
    return interaction.reply({ embeds: [embeds], components: [actionRow] })
}
