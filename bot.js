const Discord = require('discord.js');
const client = new Discord.Client();

const talkedRecently = new Set();

var isReady = true;

// function to return random number 1-4
function randomWholeNum() {
  return Math.floor(Math.random() * 4) + 1;
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
    
    if(message.author.bot) return;
    
    if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
    } else {
    
        if (message.content.includes('fortnite')) {
            message.channel.send({files: ["./assets/fortnite_sucks.jpg"]});
        }

        if (isReady && (message.content.includes('aram') || message.content.includes('arams') || message.content.includes('league'))) {
            

            isReady = false;
            var voiceChannel = message.member.voiceChannel;

            randomNum = randomWholeNum();
            switch(randomNum) {
                case 1:
                    try {
                        voiceChannel.join().then(connection => {
                            const dispatcher = connection.playFile("./assets/audio/sameGame.mp3");
                            dispatcher.on("end", end => {
                              voiceChannel.leave();
                            });
                        });
                    } catch(err) {
                        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});   
                    }
                    break;
                
                case 2:
                    try{
                        voiceChannel.join().then(connection => {
                            const dispatcher = connection.playFile("./assets/audio/magicResist.mp3");
                            dispatcher.on("end", end => {
                              voiceChannel.leave();
                            });
                        });
                    } catch(err) {
                        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});   
                    }
                    break;
                
                case 3:
                    try{
                        voiceChannel.join().then(connection => {
                            const dispatcher = connection.playFile("./assets/audio/goodOleArams.mp3");
                            dispatcher.on("end", end => {
                              voiceChannel.leave();
                            });
                        }); 
                    } catch(err) {
                        message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});   
                    }
                    break;
                
                case 4:
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
                    break;
                
              default:
                    message.channel.send("League of Tanks, Game Never Changes!", {files: ["./assets/league_of_tanks.png"]});
            };

            isReady = true;
        }
        
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
        
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
