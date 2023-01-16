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

  emitPublish(msg,list){
    if (this.subscribers.length == 0) {
      this.savedMessage = msg;
    } else {
      let lista = [];
      this.subscribers.forEach(element => {
        lista.push([msg,element]);
      });
      return lista;
    }
  }
}

module.exports = {
  Topic:Topic
}