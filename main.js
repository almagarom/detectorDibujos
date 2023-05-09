//ADV-C118
//2222222222222222222222222
//Agregamos las funciones necesarias para p5
//setup, preload, draw

//Empezamos con la funcion setup
function setup() {
  //creamos un canvas dentro de la variable canvas
  //definimos el tamaño que tendrá ese canvas
  canvas = createCanvas(280, 280);
  //lo alineamos al centro de la pantalla
  canvas.center();
  //configuramos el color de fondo del canvas a blanco
  background("white");










  //ADV - C119
  ///1111111111111111111
  //agregamos la funcion que se ejecutará cuando se suelte el click del mouse
  //la funcion "classifyCanvas" puede llamarse diferente 
  //ya que más adelante la definiremos
  canvas.mouseReleased(imagenes);
  //para convvertir texto a voz
  //con esta variable, almacenamos el metodo de spechSynthesis
  synth = window.speechSynthesis;
}

function preload() {
  //ADV-C119
  ///222222222222222222222222222222222222222222
  //agregamos la funcion preload
  //guardamos el uso de la red neuronal en una variable.
  //classifier: variable
  //ml5: nombre de la biblioteca ml5
  //imageClassifier: para que sepa que tiene que clasificar imagene
  //'DoodleNet': nombre del modelo que usaremos para la clasificacion
  classifier = ml5.imageClassifier('DoodleNet');
}







//ADV-C118
//3333333333333
//Funcion que se ejecuta al presionar el boton "borrar"
function clearCanvas() {
  //cambia el fondo del canvas a blanco
  background("white");
}










//ADV-C119
//33333333333333333
//agregamos la función draw
function draw() {

  // Establece el grosor del stroke (trazo) a 13.
  strokeWeight(13);
  // Establece el color del stroke (trazo) a negro.
  stroke(0);
  //para trazar los dibujos, tendremos que mantener presionado el mouse
  // Si el mouse está presionado, dibuja una línea entre la posición previa y la actual del mouse.
  if (mouseIsPressed) {
    //queremos que se trace una línea con los siguientes datos
    //pmouseX: coordenada anterior en x
    //pmouseY: coordenada anterior en y
    //mouseX: coordenada actual en x
    //mouseY: coordenada actual en y
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}


//ADV-C119
//44444444444
//definimos la funcion classifyCanvas ocupada en la línea 30
//esta funcion comparará los dibujos con el model 
//y mostrará los resultados de la comparacion
function imagenes() {
  //ejecuta la variable que contiene el modelo
  //indicamos que queremos ocupar el metodo "classify"
  //debemos darle un input y darle la funcion que se ejecutará con los resultados
  //canvas: input 
  //gotResult: funcion que se ejecuta
  classifier.classify(canvas, gotResult);
}



//ADV-C119
//55555555555555555
//comprobaremos si hay un error o no
function gotResult(error, results) {
  //si hay un error, mostrarlo en la consola
  if (error) {
    console.error(error);
  }
  //mostraremos los resultados en la consola
  console.log(results);
  //modificaremos el contenido de la etiqueta donde queremos mostrar el nombre del dibujo
  document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;
  //modificaremos el porcentaje de precision
  //lo multiplicaremos por 100 y redondeamos el resultado
  document.getElementById('confidence').innerHTML = 'Precision: ' + Math.round(results[0].confidence * 100) + '%';
  //guardamos en una variable el texto que queremos que convierta a voz

  leeEsto = new SpeechSynthesisUtterance(results[0].label);
  //para que lo lea
  synth.speak(leeEsto);
}


