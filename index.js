const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }

  close() {
    this.emit('close');
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let prepareMessage = () => {
  console.log('Готовлюсь к ответу');
};

let vkCloseMessage = () => {
  console.log('Чат вконтакте закрылся :(');
};

webinarChat.on('message', chatOnMessage).on('message', prepareMessage);
facebookChat.on('message', chatOnMessage);
vkChat.setMaxListeners(2).on('message', chatOnMessage).on('message', prepareMessage).on('close', vkCloseMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );