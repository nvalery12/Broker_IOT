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

    this.subTopic.push(subTopicName);
    
  };

  emitPublish(msg, route, topic){
    


  }
}


let topico = new Topic("cuarto");

topico.subscribers = [11111,22222,33333,444444,55555];
console.log(topico.subscribers);

topico.popSubscriber(444444);

console.log(topico);