const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    category: 'moderation',                                            
    description: 'to ban user from the server',
    usage: '<id | mention> [reason]',
    run: (client,message,args,con)=>{
        var SqlString = require('sqlstring');
        //check if message author has the permission
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed:{color: "0x000000",description:"**❌ You don't have permission to use this command!**"}});
        //check if bot has the permission
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply("❌ I don't have permission to ban members");

        // getting the user detail from args
        var member = message.mentions.members.first() || message.guild.member(args[0])

        //if no user is found
        if(!member) return message.channel.send({embed:{color: "0x000000",description:"**❌ No user found!**"}}); //if no user is found
        
        //if the arg is the bot
        if(member.user.id===client.user.id) return message.channel.send({embed:{color: "0x000000",description:"**❌ Bruh You can\'t ban me!**"}}); 
        
        //if the user also have kick member permission
        if(member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed:{color: "0x000000",description:"**❌ I can\'t ban this user!**"}});
        
        //if reason is also mentioned
        let reason = args.slice(1).join(' ');
        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Banned`,member.user.displayAvatarURL())
                            .setColor('#FF0000')
                            .setDescription(`You have been Banned from \`\`${message.guild.name}\`\``)
                            .addField('Banned by', message.author, true)
        const embed1 = new Discord.MessageEmbed()
                            .setAuthor(`Banned`,member.user.displayAvatarURL())
                            .setColor('0x000000')
                            .setDescription(`${member.user.username} have been Banned`)
                            .addField('Banned by', message.author, true)
       
            if(reason){
                var sql = SqlString.format(`INSERT INTO warnings(guild,user,id,adm,reason)VALUES(?,?,?,?,?)`,[message.guild.id,member.user.id,message.id,message.author.username,reason])
                embed.addField('Reason',`${reason}`)
                embed1.addField('Reason',`${reason}`)
            }
            else{
                embed.addField('Reason',`No Reason Given.`)
                embed1.addField('Reason',`No Reason Given.`)
            }
            message.channel.send(embed1)
            member.send(embed).catch(function(err){
                message.channel.send("Coudn't send user the reason. Reason logged")
            }).then(function () {
                
                  member.ban(reason)
            })
                  
        
                            
    }

}