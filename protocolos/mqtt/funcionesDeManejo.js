// Publicar
function publish (topic, route, msg){
  // Ubicamos el primer '/'
  let raiz = route.indexOf('/');
  //Validamos si estamos en la ruta destino, o por defecto, raiz
  if (raiz == 0 && route.length == 1) {
    //Confirmamos si tenemos subscriptores y si no guardamos el mensaje
    if (topic.subscribers.length == 0) {
      topic.savedMessage = msg;
    } else {
      topic.emitPublish(msg);
    }
    return;
  } else {
    //Corregimos la ruta en caso de tener / al inicio
    if(raiz == 0 && route.length > 1){
      route = route.slice(raiz + 1);
    }

    //Enviamos el mensaje a todos los subscriptores en el topic.
    if (topic.subscribers.length == 0) {
      topic.savedMessage = msg;
    } else {
      topic.emitPublish(msg);
    }

     // Conseguimos subtopic a movernos y el resto de la ruta
      let next = route.slice(0,raiz + 1);
      let rest = route.slice(raiz + 1); 

      //Verificamos la existencia del subtopic a movernos

      let index;

      if (topic.subTopic.length == 0) {
        topic.addSubTopic(next);
      }

      for (let i = 0; i < topic.subTopic.length; i++) {
        const element = topic.subTopic[i];
        if (element.topicName == next) {
          index = i;
        }
      }
      
      // Publicamos en el subtopic

      publish(topic.subTopic[index],rest,msg);

  }
}

//Subscribir
function suscribe(topic, route, idClient) {
  let raiz = route.indexOf('/');
  // Si la ruta es '/', se subscribe y termina
  if (raiz == 0 && route.length == 1) {
    topic.addSubscriber(idClient);
    return;
  } else {
    //Corregimos la ruta en caso de tener / al inicio
    if(raiz == 0 && route.length > 1){
      route = route.slice(raiz + 1);
    }

     // Conseguimos subtopic a movernos y el resto de la ruta
      let next = route.slice(0,raiz + 1);
      let rest = route.slice(raiz + 1); 

      //Verificamos la existencia del subtopic a movernos

      let index;

      if (topic.subTopic.length == 0) {
        topic.addSubTopic(next);
      }

      for (let i = 0; i < topic.subTopic.length; i++) {
        const element = topic.subTopic[i];
        if (element.topicName == next) {
          index = i;
        }
      }
      
      // Subscribimos en el subtopic

      suscribe(topic.subTopic[index],rest,msg);

  }
}