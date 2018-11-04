const Discord = require('discord.js');
const client = new Discord.Client();

const TalkedRecently = new Set();

var conditionOverride = false;
var allowAmazonLinks = false;
var allowStatusUpdate = true;
var isReady = true;
var vaultOpen = false;

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

function triggerAudio(message, trigger, voiceChannelId) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    isReady = false;
    var voiceChannel = null;

    if (voiceChannelId == "") {
      var voiceChannel = message.member.voiceChannel;
    } else {
      var voiceChannel = client.channels.get(voiceChannelId);
    }

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
    if (message.content.indexOf('!amazon') === 0) {
        
        var amazonValue = message.content.slice(8);
        if (amazonValue == "true") {
            allowAmazonLinks = true;
            message.channel.send("Amazon Links Allowed Set: " + allowAmazonLinks);
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
            
        } else {
            allowAmazonLinks = false;
            console.log("Condition Override Set: " + allowAmazonLinks);
            message.channel.send("Amazon Links Allowed Set: false");
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
        }
        
    }
    if (message.content.indexOf('!vaultOpen') === 0 && (message.author.id == "148630426548699136" || message.author.id == "93105200365043712")) {
        
        var vaultOpenValue = message.content.slice(11);
        if (vaultOpenValue == "true") {
            vaultOpen = true;
            message.channel.send("Vault Open Set: " + vaultOpen);
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
            
        } else {
            vaultOpen = false;
            console.log("Condition Override Set: " + vaultOpen);
            message.channel.send("Vault Open Set: false");
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
      "Audio Triggers:\n!aram\n!celsoHere\n!clap\n!croissant\n!dumbassGame\n!fortFucker\n!goldfish\n!horn\n!horse\n!kirk\n!lag\n!licker\n!magicResist\n!monkey\n!neck\n!sameGame\n!snap\n!tinsel\n!yooo\n!warus\n!watch\n!weeee\n\n" +
      "Image Triggers:\n!prime\n!zieg\n\n" +
      "Keywords: (black, fortnite, tank, mexican)```"
      triggerMessage(message, "help", helpResponse, true);

    }
    
    if (message.content.toLowerCase().includes('overwatch') && (message.author.id == "93107357470433280" || conditionOverride)) {

      triggerMessage(message, "zachGif", "https://gfycat.com/gifs/detail/BothAdventurousIslandcanary", false);

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
    var splitMessage = message.content.split(" ");

    if (message.content.indexOf('!aram') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "goodOleArams", "");
      } else {
        triggerAudio(message, "goodOleArams", splitMessage[1]);
      }

    }      
    if (message.content.indexOf('!bass') === 0) {
        
      if (!TalkedRecently.has("bass_timeout") && vaultOpen) {

        if (typeof splitMessage[1] === 'undefined') {
          triggerAudio(message, "bass", "");
        } else {
          triggerAudio(message, "bass", splitMessage[1]);
        }
          
        TalkedRecently.add("bass_timeout");
        setTimeout(() => {
          // Allows the command to be played again after 10 minutes
          TalkedRecently.delete("bass_timeout");
        }, 600000);
          
      } else {
       
          message.channel.send("Command is on a Timeout");
          
          message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
          
      }

    }
    if (message.content.indexOf('!celsoHere') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "celsoHere", "");
      } else {
        triggerAudio(message, "celsoHere", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!clap') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "clap", "");
      } else {
        triggerAudio(message, "clap", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!croissant') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "croissant", "");
      } else {
        triggerAudio(message, "croissant", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!dumbassGame') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "dumbassGame", "");
      } else {
        triggerAudio(message, "dumbassGame", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!fortFucker') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "fortFucker", "");
      } else {
        triggerAudio(message, "fortFucker", splitMessage[1]);
      }
        
    }
    if (message.content.indexOf('!goldfish') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "goldfish", "");
      } else {
        triggerAudio(message, "goldfish", splitMessage[1]);
      }
        
    }
    if (message.content.indexOf('!horn') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "horn", "");
      } else {
        triggerAudio(message, "horn", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!horse') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "horse", "");
      } else {
        triggerAudio(message, "horse", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!kirk') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "kirk", "");
      } else {
        triggerAudio(message, "kirk", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!lag') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "lag", "");
      } else {
        triggerAudio(message, "lag", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!licker') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "licker", "");
      } else {
        triggerAudio(message, "licker", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!magicResist') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "magicResist", "");
      } else {
        triggerAudio(message, "magicResist", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!monkey') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "monkey", "");
      } else {
        triggerAudio(message, "monkey", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!neck') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "neck", "");
      } else {
        triggerAudio(message, "neck", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!sameGame') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "sameGame", "");
      } else {
        triggerAudio(message, "sameGame", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!snap') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "snap", "");
      } else {
        triggerAudio(message, "snap", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!tinsel') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "tinsel", "");
      } else {
        triggerAudio(message, "tinsel", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!yooo') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "yooo", "");
      } else {
        triggerAudio(message, "yooo", splitMessage[1]);
      }

    }
    if (message.content.indexOf('!warus') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "warus", "");
      } else {
        triggerAudio(message, "warus", splitMessage[1]);
      }
        
    }
    if (message.content.indexOf('!watch') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "watch", "");
      } else {
        triggerAudio(message, "watch", splitMessage[1]);
      }
        
    }
    if (message.content.indexOf('!weeee') === 0) {

      if (typeof splitMessage[1] === 'undefined') {
        triggerAudio(message, "weeee", "");
      } else {
        triggerAudio(message, "weeee", splitMessage[1]);
      }
        
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
    if (message.content.toLowerCase().includes('amazon.com')) {

      if (!allowAmazonLinks) {
          message.channel.send("Kelso says no fucking Amazon links!");
          message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
          
      }

    }

  }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
//     let channels = newMember.guild.channels;
//     var generalChannel = (client.guilds.get(newMember.guild.id)).channels.find("name", "general");
    
    if (newMember.id === '93121331700195328') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(20);
            
            if (randomNum === 1) {
//                 generalChannel.send("Hey, Eeyore (Kelso) is here!", {files: ["./assets/images/eeyore.png"]});
                try {
                  newUserChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/warus.mp3");
                    dispatcher.on("end", end => {
                        newUserChannel.leave();
                    });
                  }); 
                } catch(err) {
                  return;   
                }
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
    if (newMember.id === '93140127949287424') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(20);
            
            if (randomNum === 1) {
                try {
                  newUserChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/kirkWilhelm.mp3");
                    dispatcher.on("end", end => {
                        newUserChannel.leave();
                    });
                  }); 
                } catch(err) {
                  return;   
                }
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
    client.on('guildMemberAdd', member => {
        
        member.addRole('478762864530817036')
            .then(console.log)
            .catch(console.error);
        
    });
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
