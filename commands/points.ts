import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ICommand } from "wokcommands";
import { db } from "../firebase";

export default {
    category: "Punkte",
    description: "Punkte verteilung",

    slash: true,
    testOnly: false,
    permissions: ['Spielleiter'],

    expectedArgs: "<Name>",
    minArgs: 1,
    maxArgs: 1,

    syntaxError:{
        'english':"Bitte einen Namen angeben",
    },


    callback: async({ interaction, args, channel })=>{
        const name = args[0]

        const actionsRow = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setCustomId('one')
                      .setLabel('+1')
                      .setStyle('SUCCESS'),
                  new MessageButton()
                      .setCustomId('two')
                      .setLabel('+2')
                      .setStyle('SUCCESS'),
                  new MessageButton()
                      .setCustomId('three')
                      .setLabel('+3')
                      .setStyle('SUCCESS'),
                  new MessageButton()
                      .setCustomId('four')
                      .setLabel('+4')
                      .setStyle('SUCCESS'),
                  new MessageButton()
                      .setCustomId('removePoint')
                      .setLabel('Entfernen')
                      .setStyle('DANGER'),
              )

          await interaction.reply({
              content:`Was willst du tun?`,
              components: [ actionsRow ],
          })

          const collector = channel.createMessageComponentCollector({
              max: 1,
          })

          collector.on('collect', (i: ButtonInteraction)=>{})

          collector.on('end', async (collection)=>{

            collection.forEach(async(c)=>{
              const docRef = doc(db,"players", `${name}`)
              const docSnap = await getDoc(docRef)
              let points
              if (docSnap.exists()){
                points = parseInt(docSnap.data().value)
              }
              switch(c.customId){
              case "one":
                await updateDoc(docRef,{value:points+1})
                break;
              case "two":
                await updateDoc(docRef,{value:points+2})
                break;
              case "three":
                await updateDoc(docRef,{value:points+3})
                break;
              case "four":
                await updateDoc(docRef,{value:points+4})
                break;
              case "removePoint":
                await updateDoc(docRef,{value:points-1})
                break;
              default:
                break;
              }
            })

            await interaction.editReply({
                content: `Aktion getätigt`,
                components: []
            })
              .then(()=>setTimeout(()=>interaction.deleteReply(),2000))

        })
    }
} as ICommand
