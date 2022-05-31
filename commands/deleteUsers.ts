import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ICommand } from "wokcommands";
import { db } from "../firebase";
import playerSchema from '../playersSchema'

export default {
    category: "Spieler",
    description: "Spieler löschen",

    slash: true,
    testOnly: false,

    expectedArgs: "<Name>",
    minArgs: 1,
    maxArgs: 1,

    syntaxError:{
        'english':"Bitte einen Namen angeben",
    },


    callback: async({ interaction, args, channel })=>{
        const name = args[0]

        const confirmation = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setCustomId('delete')
                      .setLabel('Löschen')
                      .setStyle('DANGER'),
                  new MessageButton()
                      .setCustomId('keep')
                      .setLabel('Neee doch nicht')
                      .setStyle('SUCCESS'),
              )

        await interaction.reply({
            content:`${name} wirklich löschen?`,
            components: [confirmation],
        })

        const collector = channel.createMessageComponentCollector({
            max: 1,
        })

        collector.on('collect', (i: ButtonInteraction)=>{})

        collector.on('end', async (collection)=>{
            collection.forEach(async(c)=>{
                if(c.customId != 'delete') return
                await deleteDoc(doc(db, "users", `${name}`))
            })

            await interaction.editReply({
                content: `Aktion getätigt`,
                components: []
            })
              .then(()=>setTimeout(()=>interaction.deleteReply(),100))
        })
    }
} as ICommand
