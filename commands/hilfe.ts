import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

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
              name:"adduser",
              inline: true,
              value:"lässt dich einen spieler zum spiel hinzufügen - /adduser name* punkte"
            },
            {
              name:"deleteuser",
              inline: true,
              value:"lässt dich einen spieler vom spiel entfernen - /deleteuser (name/alle)*"
            },
            {
              name:"points",
              inline: true,
              value:"lässt dich einem spieler punkte geben/entziehen - /points name* - öffnet ein 'gui'"
            },
            {
              name:"start",
              inline: true,
              value:"wichtig! nur einmal starten - /start - startet das scoreboard welches live punkte anzeigt"
            },
            {
              name:"hörauf",
              inline: true,
              value:"startet den bot neu und stoppt die live ansicht der punkte (punkten bleiben gespeichert) - schrei 'hörauf'"
            },
            {
              name:"eyhauab",
              inline: true,
              value:"'stoppt' den bot (es crashed ihn komplett ist aber so gewollt) - schrei 'eyhauab'"
            },
          ])

    return embed
  }

} as ICommand
