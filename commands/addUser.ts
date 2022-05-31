import { ICommand } from "wokcommands";
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default {
    category: "Spieler",
    description: "Spieler einstellungen",

    slash: true,
    testOnly: false,

    expectedArgs: "<Name> <Punkte>",
    minArgs: 1,
    maxArgs: 2,

    syntaxError:{
        'english':"Bitte einen Namen angeben",
    },


    callback: async({ interaction, args })=>{
        const name = args[0]
        const points = parseInt(args[1]) || 0

        await setDoc(doc(db, "players", name), {name: `${name}`, value: `${points}`})

        if(interaction){
           interaction.reply({
                content: `${name} wurde ${ points != undefined ? `mit ${points} Punkten hinzugefügt` : "hinzugefügt"}`,
            })
              .then(()=>setTimeout(()=>interaction.deleteReply(),100))
        }
    }
} as ICommand
