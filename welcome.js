  
module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
   client.channels.find('joined').send(`**${member.username}** has just joined the server`);
  });
};
