
//preparaciones previas
const config = require("./config.json");
const Discord = require("discord.js");
const { channel } = require("diagnostics_channel");
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })
const { Permissions } = require('discord.js');

//mensaje de inicio 
var act = (config.prefix + "help")
client.on("ready", () => {
    client.user.setStatus("ZapasCraft, host ven ya porfaaaa")
    console.log('El bot esta listo');
    client.user.setPresence({
        activities: [{ 
          name: act,
          type: "PLAYING"
        }],
        status: "online"
    })
})

//listener de mensajes de chat (comandos)

client.on('messageCreate', async (message) => {

   

    if (message.author.type === 'dm') return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
//LISTA DE COMANDOS
    switch (cmd) {
        case 'ping':
            message.reply("Pong!")
            break;
        case 'ip':
            message.reply("Proximamente...")
            break; 
        case 'md':
            if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) { 
                //const user = args[0];
                //let mensaje = args.join(" ")
               // message.user.send(mensaje)
               message.reply("Comando en desarrollo:)")

            } else {
                    message.channel.send("No tienes permisos para hacer eso!")
                }
                break;
        case 'emb':
            if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                let mensaje = args.join(" ");
                msg = mensaje.replace('emb', '')
                 var embedAn = new Discord.MessageEmbed()
                .setDescription(msg)
                .setColor("#FF7400")

            message.channel.send(({embeds: [ embedAn ]}));
                
            } else {
                message.channel.send("No tienes permisos para hacer eso!")
            }
           
        break;
        case 'prefix':
            if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                
                config.prefix = args[0];

                message.reply("El prefijo del bot ha sido cambiado a " + args [0])
            } else {
                message.channel.send("No tienes permisos para hacer eso!")
            }
            break;
        case 'help':
            if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { //si es staff...
                const embed = new Discord.MessageEmbed()
                .setAuthor("Prefijo actual: " + config.prefix)
                .setTitle("Lista de comandos del bot")
                .setColor("DARK_GOLD")
                .addField("/ip","Muestra la ip del servidor de Minecraft.")
                .addField("/md "," Envia un md a un usuario mediante el bot. (en desarrollo)")
                .addField("/emb", "Envia un mensaje embed.")
                .addField("/ping", "Test para ver si el bot responde correctamente")
                .addField("/prefix", "Cambia el prefijo del bot.")
                .addField("/help", "Muestra este menu de ayuda.")
                .setFooter("by T3Axix")
                
                message.channel.send(({embeds: [ embed ]}));
            } else { //si no es staff...
                    const embednostaff = new Discord.MessageEmbed()
                    .setAuthor("Prefijo actual: " + config.prefix)
                    .setTitle("Lista de comandos del bot")
                    .setColor("DARK_GOLD")
                    .addField("/ip","Muestra la ip del servidor de Minecraft.")
                    .addField("/ping", "Test para ver si el bot responde correctamente")
                    .addField("/help", "Muestra este menu de ayuda.")
                    .setFooter("by T3Axix")

                    message.channel.send(({embeds: [ embednostaff ]}));

                }
                break;
            
    }
    
})
//mensaje de bienvenida 
//client.on("guildMemberAdd", miembro => {
 //   var canal = client.channels.find(channel => channel.id === "880413253270913074")
 //   canal.send("Bienvenido/a a Zapascraft, <@" + miembro.id + ">")
//}) 

client.login(config.token)



/*
if de permisos

if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) { 

    } else {
            message.channel.send("No tienes permisos para hacer eso!")
        }



*/