
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

  emitPublish(msg, socket){
    if (this.subscribers.length == 0) {
      this.savedMessage = msg;
    } else {
      this.subscribers.forEach(element => {
        socket.to(element).emit("xsss", msg); 
      });
    }
  }
}

module.exports = {
  Topic:Topic
}