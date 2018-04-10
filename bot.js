const Discord = require('discord.js');
const client = new Discord.Client();

const blackTalkedRecently = new Set();
const leagueTalkedRecently = new Set();
const fortniteTalkedRecently = new Set();
const kirkCmdTalkedRecently = new Set();
const ziegCmdTalkedRecently = new Set();
const windowLickerCmdTalkedRecently = new Set();

var isReady = true;

function randomWholeNum(value) {
    return Math.floor(Math.random() * value) + 1;
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
        
    if (message.content.toLowerCase().includes('black')) {

        if (blackTalkedRecently.has(message.author.id)) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/cmonbruh.png"]});
        }

        blackTalkedRecently.add(message.author.id);
        setTimeout(() => {
            blackTalkedRecently.delete(message.author.id);
        }, 60000);

    }
    
    if (message.content.toLowerCase().includes('fortnite')) {

        if (fortniteTalkedRecently.has(message.author.id)) {
            return;
        } else {
            message.channel.send({files: ["./assets/images/fortnite_sucks.jpg"]});
        }

        fortniteTalkedRecently.add(message.author.id);
        setTimeout(() => {
            fortniteTalkedRecently.delete(message.author.id);
        }, 60000);

    }

    if (isReady && (message.content.indexOf('!kirk') === 0)) {

        if (kirkCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/kirkWilhelm.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }

            isReady = true;

            kirkCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              kirkCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!licker') === 0)) {

        if (windowLickerCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/windowlicker.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                return;   
            }

            isReady = true;

            windowLickerCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              windowLickerCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }
    
    if (isReady && (message.content.indexOf('!zieg') === 0)) {

        if (ziegCmdTalkedRecently.has(message.author.id)) {
            return;
        } else {

            message.channel.send({files: ["./assets/images/goat_fker.png"]});

            ziegCmdTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              ziegCmdTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('league'))) {

        if (leagueTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;

            randomNum = randomWholeNum(3);
            switch(randomNum) {
                case 1:
                    clip = "./assets/audio/sameGame.mp3"
                    break;
                
                case 2:
                    clip = "./assets/audio/magicResist.mp3"
                    break;
                
                case 3:
                    clip = "picture";
                    break;
                
              default:
                    clip = "picture";
            };
            
            if (clip == "picture") {
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
            } else {
                try {
                     voiceChannel.join().then(connection => {
                        const dispatcher = connection.playFile(clip);
                        dispatcher.on("end", end => {
                            voiceChannel.leave();
                        });
                    }); 
                } catch(err) {
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
                }
            }

            isReady = true;

            leagueTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              leagueTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

    if (isReady && (message.content.toLowerCase().includes('aram') || message.content.toLowerCase().includes('arams'))) {

        if (leagueTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            
            try {
                 voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/goodOleArams.mp3");
                    dispatcher.on("end", end => {
                        voiceChannel.leave();
                    });
                }); 
            } catch(err) {
                message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/images/league_of_tanks.png"]});   
            }

            isReady = true;

            leagueTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              leagueTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
    let channels = newMember.guild.channels;
    var generalChannel = (client.guilds.get(newMember.guild.id)).channels.find("name", "general");
    
    //93121331700195328
    if (newMember.id === '148630426548699136') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(15);
            console.log('randomNum: ' + randomNum);
            
            if (randomNum === 1) {
                generalChannel.send("Hey, Eeyore is here!", {files: ["./assets/images/eeyore.png"]});
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
