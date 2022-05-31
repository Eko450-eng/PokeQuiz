import 'dotenv/config'
import DiscordJS, { Intents, MessageActionRow, MessageButton } from 'discord.js'
import path from 'path'
import WOKCommands from 'wokcommands'

const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on("ready", async()=>{
    client.user.setActivity({ name: "with points", type: "PLAYING" })
    console.log("Running")

    const guild = client.guilds.cache.get(process.env.SERVER_ID)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
    }).setBotOwner('150734620588113920')

})

client.on("messageCreate", async(message)=>{
    if(message.content === "HÖRAUF"){
        message.reply({
            content:"Gleich wieder da",
        }).then(()=>{
            client.destroy()
        })
            .then(()=>{
            client.login(process.env.BOT_TOKEN)
            console.log("Power on")
        })
    }else if(message.content === "EYHAUAB"){
        message.reply({
            content:"Is ja gut ich geh schon",
        }).then(()=>{
            client.destroy()
        })
    }
})

export { client }

client.login(process.env.BOT_TOKEN)
