import { ICommand } from "wokcommands";

export default {
    category: "System",
    description: "Pong",

    slash: "both",
    testOnly: false,

    callback: async({ message, text })=>{
        return "Pong"
    }

} as ICommand
