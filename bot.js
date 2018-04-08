const Discord = require('discord.js');
const client = new Discord.Client();

const leagueTalkedRecently = new Set();
const fortniteTalkedRecently = new Set();

var isReady = true;
var clip;

// function to return random number 1-4
function randomWholeNum() {
    return Math.floor(Math.random() * 4) + 1;
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    if (message.content.includes('fortnite')) {

        if (fortniteTalkedRecently.has(message.author.id)) {
            return;
        } else {
            message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
        }

        fortniteTalkedRecently.add(message.author.id);
        setTimeout(() => {
            fortniteTalkedRecently.delete(message.author.id);
        }, 60000);

    }

    if (isReady && (message.content.includes('aram') || message.content.includes('arams') || message.content.includes('league'))) {

        if (leagueTalkedRecently.has(message.author.id)) {
            return;
        } else {

            isReady = false;
            var voiceChannel = message.member.voiceChannel;

            randomNum = randomWholeNum();
            switch(randomNum) {
                case 1:
                    clip = "./assets/audio/sameGame.mp3";
                    break;
                
                case 2:
                    clip = "./assets/audio/sameGame.mp3";
                    break;
                
                case 3:
                    clip = "./assets/audio/sameGame.mp3";
                    break;
                    
                case 4:
                    clip = "picture";
                    break;
                
              default:
                    clip = "picture";
            };
            
            if(clip=="picture"){
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});   
            } else {
                    try{
                        voiceChannel.join().then(connection => {
                            const dispatcher = connection.playFile(clip);
                            dispatcher.on("end", end => {
                              voiceChannel.leave();
                            });
                        }); 
                    } catch(err) {
                        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});   
                    }
            };
            
            isReady = true;

            leagueTalkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              leagueTalkedRecently.delete(message.author.id);
            }, 60000);

        }

    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
