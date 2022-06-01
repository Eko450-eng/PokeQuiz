import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ICommand } from "wokcommands";
import { db } from "../firebase";
import { client } from '../index'


export default {
    category: "Hilfe",
    description: "Biste stuck?",

    slash: "both",
    testOnly: false,

  callback: async({ message, text })=>{

    const embed = new MessageEmbed()
          .setDescription('Punkte')
          .setTitle('Leaderboard')
          .setColor('#c4c4c4')
          .setFields([
            {
              name:"addUser",
              inline: true,
              value:"Lässt dich einen Spieler zum Spiel hinzufügen - /addUser name* punkte"
            },
            {
              name:"deleteUser",
              inline: true,
              value:"Lässt dich einen Spieler vom Spiel entfernen - /deleteUser (name/alle)*"
            },
            {
              name:"points",
              inline: true,
              value:"Lässt dich einem Spieler Punkte geben/entziehen - /points name* - öffnet ein 'GUI'"
            },
            {
              name:"start",
              inline: true,
              value:"WICHTIG! NUR EINMAL STARTEN - /start - Startet das scoreboard welches LIVE punkte anzeigt"
            },
            {
              name:"HÖRAUF",
              inline: true,
              value:"Startet den Bot neu und stoppt die Live ansicht der Punkte (Punkten bleiben gespeichert) - schrei 'HÖRAUF'"
            },
            {
              name:"EYHAUAB",
              inline: true,
              value:"'Stoppt' den Bot (Es crashed ihn komplett ist aber so gewollt) - schrei 'EYHAUAB'"
            },
          ])

    return embed
  }

} as ICommand
