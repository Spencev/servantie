const tmi = require('tmi.js');
const sound = require('sound-play')

// Define configuration options
const opts = {
  identity: {
    username: 'ServantofSpencev',
    password: '94rjvnnc6u4cc32nwbid1lnjxcd9v6'
  },
  channels: [
    'spencev'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    }


    // If the command is known, let's execute it
    if (commandName === '!posturecheck') {
        sound.play('C:/Users/Spencer\ Delaney/Documents/posturecheck/situp.wav');
        console.log(`* Executed ${commandName} command`);
    }
    
    if (commandName === 'PepeLaugh'){
        sound.play('C:/Users/Spencer\ Delaney/Documents/posturecheck/funny-laugh-sound-effect.mp3');
        console.log(`* Executed ${commandName} command`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 3000));
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}