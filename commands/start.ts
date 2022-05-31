import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ICommand } from "wokcommands";
import { db } from "../firebase";
import { client } from '../index'


export default {
    aliases: ["p"],
    category: "Punkte",
    description: "Zeigt die Punkteverteilung an",

    slash: "both",
    testOnly: false,

  callback: async({ message, text })=>{

    let players
    let leader

    const leaderRef = query(collection(db, "players"), orderBy("value"), limit(1))

    const unsub2 = onSnapshot(leaderRef, (qs)=>{
      players = []
      qs.forEach((doc)=>{
        leader = doc.data().name
      })
    })

    const q = query(collection(db, "players"))
    const unsub = onSnapshot(q, (qs)=>{
      players = []
      qs.forEach((doc)=>{
        players.push({
          name:`${doc.data().name}`,
          value:`${doc.data().value}`,
        })
      })

      try{
        const newEmbed = newMessage.embeds[0]
          newEmbed.setFields(players)
          newMessage.edit({
          embeds: [newEmbed]
        })
      }catch(e){
        console.log("Small ups")
      }

      client.user.setActivity({ name: `The champ: ${leader||""}`, type: "WATCHING" })

    })

    const embed = new MessageEmbed()
          .setDescription('Punkte')
          .setTitle('Leaderboard')
          .setColor('#c4c4c4')
          .setFields(
            [{name:"Loading", value: "Loading"}]
          )

    const newMessage = await message.reply({
      embeds: [embed],
    })
  }

} as ICommand
