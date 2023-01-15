//Correcion de la ruta
function fix(route) {
  let raiz = route.indexOf('/');
  if(raiz == 0 && route.length > 1){
    return route.slice(raiz + 1);
  } else {
    return route;
  }
}
// Buscar el subtopic al que se tiene que ir
function search(topic,route) {
  //Verificamos la existencia del subtopic a movernos

  let index;

  if (topic.subTopic== undefined) {
    topic.addSubTopic(route);
  }

  for (let i = 0; i < topic.subTopic.length; i++) {
    const element = topic.subTopic[i];
    if (element.topicName == route) {
      index = i;
    }
  }

  //En caso de no existir el subtopic se crea

  if (index == undefined) {
    topic.addSubTopic(route);
    index = topic.subTopic.length - 1;
  }

  return topic.subTopic[index];
};

// Publicar
function publish (topic, route, msg){
  // Ubicamos el primer '/'
  let raiz = route.indexOf('/');
  //Validamos si estamos en la ruta destino, o por defecto, raiz
  if (raiz == 0 && route.length == 1) {
    //Enviamos el mensaje a los subscriptores del topic
    topic.emitPublish(msg);
    return;
  } else {
    //Corregimos la ruta en caso de tener / al inicio
    route = fix(route);

    //Enviamos el mensaje a todos los subscriptores en el topic.
    topic.emitPublish(msg);

    // Conseguimos subtopic a movernos y el resto de la ruta
    let next = route.slice(0,raiz + 1);
    let rest = route.slice(raiz + 1); 

    //Buscamos el subtopic a recorrer

    let nextSubTopic = search(topic,next);

    // Publicamos en el subtopic

    publish(nextSubTopic,rest,msg);

  }
};

//Subscribir
function suscribe(topic, route, idClient) {
  let raiz = route.indexOf('/');
  // Si la ruta es '/', se subscribe y termina
  if (raiz == 0 && route.length == 1) {
    topic.addSubscriber(idClient);
    return;
  } else {
    //Corregimos la ruta en caso de tener / al inicio
    route = fix(route);

    // Conseguimos subtopic a movernos y el resto de la ruta
    let next = route.slice(0,raiz + 1);
    let rest = route.slice(raiz + 1); 

    //Buscamos el subtopic

    let nextSubTopic = search(topic,next);
    
    // Subscribimos en el subtopic

    suscribe(nextSubTopic,rest,idClient);

  }
}

//Desubscribir
function unsuscribe(topic,idClient) {
  if (topic.subTopic.length != 0) {
    topic.subTopic.forEach(element => {
      unsuscribe(element,idClient);
    });
  }
  topic.popSubscriber(idClient);
  return;
}

module.exports = {
  suscribe:suscribe,
  publish:publish,
  unsuscribe:unsuscribe
}