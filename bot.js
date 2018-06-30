const Discord = require('discord.js');
const client = new Discord.Client();

const TalkedRecently = new Set();

var conditionOverride = false;
var allowStatusUpdate = true;
var isReady = true;
var shouldSpam = false;

function randomWholeNum(value) {
    return Math.floor(Math.random() * value) + 1;
}

function triggerMessage(message, trigger, msgResponse, shouldDelete) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    isReady = false;
      
    try {
      message.channel.send(msgResponse);
    } catch(err) {
      return;   
    }
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    isReady = true;

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }
    
  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    message.channel.send({files: ["./assets/images/" + trigger + ".png"]});
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }


}

function triggerAudio(message, trigger) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    isReady = false;
    var voiceChannel = message.member.voiceChannel;

    try {
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile("./assets/audio/" + trigger + ".mp3");
        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
      }); 
    } catch(err) {
      return;   
    }
    
    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);

    isReady = true;

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }

}

function triggerImage(message, trigger, shouldDelete) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    message.channel.send({files: ["./assets/images/" + trigger + ".png"]});
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }

}

function statusUpdate(message, statusType, slicePoint) {

  if (!allowStatusUpdate && !TalkedRecently.has(message.author.id + "_timeout")) {

    message.channel.send("Command is on a Timeout");
          
    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    
    TalkedRecently.add(message.author.id + "_timeout");
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_timeout");
    }, 60000);

  } else {

    var statusValue = message.content.slice(slicePoint);

      client.user.setPresence({
        game: {
            name: statusValue,
            type: statusType
          }
      })
        .then(console.log)
        .catch(console.error);
      
      message.channel.send("Presence Set");
      
      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

      allowStatusUpdate = false;

      setTimeout(() => {
        // Allows for the Game Name to be Set After 5 Minutes
        allowStatusUpdate = true;
      }, 300000);

  }

}


client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  if(isReady) {
      
    if (message.content.indexOf('!override') === 0 && message.author.id == "148630426548699136") {
        
        var overrideValue = message.content.slice(10);
        if (overrideValue == "true") {
            conditionOverride = true;
            message.channel.send("Condition Override Set: " + conditionOverride);
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
            
        } else {
            conditionOverride = false;
            console.log("Condition Override Set: " + conditionOverride);
            message.channel.send("Condition Override Set: false");
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
        }
        
    }

    /********************************************/
    /*            MESSAGE TRIGGERS              */
    /********************************************/
    if (message.content.indexOf('!help') === 0) {

      var helpResponse = "```Since Your Little Bitch Ass Can't Remember Shit!\n\n" +
      "Presense Triggers:\n!setGame Overwatch\n!setListening Spotify\n!setWatching Youtube\n\n" +
      "Audio Triggers:\n!aram\n!dumbassGame\n!horn\n!kirk\n!lag\n!licker\n!magicResist\n!sameGame\n!snap\nswallowWhat\n!tinsel\n!yooo\n!warus\n\n" +
      "Image Triggers:\n!prime\n!zieg\n\n" +
      "Keywords: (black, fortnite, tank, mexican)```"
      triggerMessage(message, "help", helpResponse, true);

    }
    
    if (message.content.toLowerCase().includes('overwatch') && (message.author.id == "93107357470433280" || conditionOverride)) {

      triggerMessage(message, "zachGif", "https://gfycat.com/gifs/detail/BothAdventurousIslandcanary", false);

    }
     

    if (message.content.indexOf('!spam') === 0) {

      var userId = message.content.slice(6);
      message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
      shouldSpam = true;

      while(shouldSpam) {

        setTimeout(() => {
          message.channel.send("<@" + userId + ">")
          .then(msg => 
            setTimeout(() => {
              msg.delete('');
            }, 10000));
        }, 2000);

      }

    }

    // if (message.content.indexOf('!spam') === 0 && message.author.id == "148630426548699136") {
        
    //     var userId = message.content.slice(6);
        
    //     while (spamUser) {
    //         try {
    //           message.channel.send("<@" + userId + ">")
    //           .then(msg => {
    //             msg.delete(10000)
    //           });
    //         } catch(err) {
    //           return;   
    //         }
    //     }
        
    // }
        
    if (message.content.indexOf('!spamStop') === 0 && message.author.id == "148630426548699136") {

        shouldSpam = false;
        
    }

    /********************************************/
    /*             STATUS TRIGGERS              */
    /********************************************/
    if (message.content.indexOf('!setGame') === 0) {

      statusUpdate(message, 0, 9);

    }
    if (message.content.indexOf('!setListening') === 0) {

      statusUpdate(message, 2, 14);

    }
    if (message.content.indexOf('!setWatching') === 0) {

      statusUpdate(message, 3, 13);

    }

    /********************************************/
    /*              AUDIO TRIGGERS              */
    /********************************************/
    if (message.content.indexOf('!aram') === 0) {

      triggerAudio(message, "goodOleArams");

    }
    if (message.content.indexOf('!dumbassGame') === 0) {

      triggerAudio(message, "dumbassGame");

    }
    if (message.content.indexOf('!horn') === 0) {

      triggerAudio(message, "horn");

    }
    if (message.content.indexOf('!kirk') === 0) {

      triggerAudio(message, "kirkWilhelm");

    }
    if (message.content.indexOf('!lag') === 0) {

      triggerAudio(message, "lag");

    }
    if (message.content.indexOf('!licker') === 0) {

      triggerAudio(message, "windowlicker");

    }
    if (message.content.indexOf('!magicResist') === 0) {

      triggerAudio(message, "magicResist");

    }
    if (message.content.indexOf('!sameGame') === 0) {

      triggerAudio(message, "sameGame");

    }
    if (message.content.indexOf('!snap') === 0) {

      triggerAudio(message, "snap");

    }
    if (message.content.indexOf('!swallowWhat') === 0) {

      triggerAudio(message, "swallowWhat");

    }
    if (message.content.indexOf('!tinsel') === 0) {

      triggerAudio(message, "tinsel");

    }
    if (message.content.indexOf('!yooo') === 0) {

      triggerAudio(message, "yooo");

    }
    if (message.content.indexOf('!warus') === 0) {

      triggerAudio(message, "warus");

    }

    /********************************************/
    /*              IMAGE TRIGGERS              */
    /********************************************/
    if (message.content.indexOf('!prime') === 0) {

      triggerImage(message, "prime", true);

    }
    if (message.content.indexOf('!zieg') === 0) {

      triggerImage(message, "goat_fucker", true);

    }

    /********************************************/
    /*             KEYWORD TRIGGERS             */
    /********************************************/
    if (message.content.toLowerCase().includes('black')) {

      triggerImage(message, "cmonbruh", false);

    }
    if (message.content.toLowerCase().includes('fortnite')) {

      triggerImage(message, "fortnite_sucks", false);

    }
    if (message.content.toLowerCase().includes('tank')) {

      triggerImage(message, "league_of_tanks", false);

    }
    if (message.content.toLowerCase().includes('mexican')) {

      triggerImage(message, "mexican", false);

    }

  }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
    let channels = newMember.guild.channels;
    var generalChannel = (client.guilds.get(newMember.guild.id)).channels.find("name", "general");
    
    if (newMember.id === '93105200365043712') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(10);
            console.log('randomNum: ' + randomNum);
            
            if (randomNum === 1) {
                generalChannel.send("Hey, Eeyore (Kelso) is here!", {files: ["./assets/images/eeyore.png"]});
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
