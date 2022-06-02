import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ICommand } from "wokcommands";
import { db } from "../firebase";
import { client } from '../index'


export default {
    category: "Hilfe",
    description: "Ping pong?",

    slash: "both",
    testOnly: false,

  callback: async({ message, text })=>{

    return "pong"
  }

} as ICommand
