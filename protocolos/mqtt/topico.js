const { io } = require("../../node_modules/socket.io-client");
let socket = io.connect("http://localhost:3000", { forceNew: true });



class Topic{

	constructor(topicName){

		this.topicName = topicName;
    this.type = 'Generico';
		this.subscribers = [];
		this.subTopic = [];
		this.savedMessage;
		this.lastWillMessage = 'service disconnected';

	};
    
	addSubscriber(idClient){

    this.subscribers.push(idClient);

  };

  popSubscriber(idClient){

    this.subscribers = this.subscribers.filter( suscriptor => suscriptor != idClient  );

  };

  getLastWillMessage(){

    return(this.lastWillMessage);

  };

  addSubTopic(subTopicName){
    if (this.subTopic == undefined) {
      this.subTopic = [];
    }
    this.subTopic.push( new Topic(subTopicName));
    
  };

  emitPublish(msg){
    if (this.subscribers.length == 0) {
      this.savedMessage = msg;
    } else {
      this.subscribers.forEach(element => {
        io.to(element).emit("xsss", msg); 
      });
    }
  }
}

module.exports = {
  Topic:Topic
}