  
module.exports = (client) => {
  client.on('guildMemberAdd', member => {
  const channelId = '847600770852716555' /*joined channel*/
const message = `The user <@${member.id}> has jonied the server.
Account Created days ago,
Account Created on: <${client.user.createdAt}>,
The user used the invite code ,
The user was invited by `
   const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
  });
client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "joined");
    channel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
});
};
