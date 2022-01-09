
//boton start
let start = () => {
  document.getElementById("sect1").style.display = "none";
  document.getElementById("sect2").style.display = "flex";
}

// slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}
// fin slider
// seleccion vehiculo rival
let cocheRival;
let seleccionCocheRival = () =>{
  let slideId = Math.floor(Math.random() * 5 + 1);
   let slide = document.getElementById("coche" + slideId);
   let velmax = slide.getElementsByClassName("velmax")[0].textContent;
   let aceleracion = slide.getElementsByClassName("aceleracion")[0].textContent;
   let nombre = slide.getElementsByClassName("nombreCoche")[0].textContent;
  cocheRival = new vehiculo(nombre, 'IA', aceleracion, velmax);
  return slideId;
}
// seleccion vehiculo
let cocheActual;
let elegirCoche = () =>{
  let slide = document.getElementById("coche" + slideIndex);
  let velmax = slide.getElementsByClassName("velmax")[0].textContent;
  let aceleracion = slide.getElementsByClassName("aceleracion")[0].textContent;
  let nombre = slide.getElementsByClassName("nombreCoche")[0].textContent;
 cocheActual = new vehiculo(nombre, 'Player', aceleracion, velmax);
 let rivalId = seleccionCocheRival()
 document.getElementById("sect2").style.display = "none";
 document.getElementById("sect3").style.display = "flex";
 let cocheJugador = document.getElementsByClassName("cocheJugador");
 for(let i = 0; i < cocheJugador.length; i++){
  cocheJugador[i].innerHTML = '<img src="img/coche'+slideIndex+'.jpeg"></img>';
 }

let cocheEnemigo = document.getElementsByClassName("cocheRival");
for(let i = 0; i < cocheEnemigo.length; i++){
  cocheEnemigo[i].innerHTML = '<img src="img/coche'+rivalId+'.jpeg"></img>';
}

}


//boton carrera
let correrCoches;
let accelerarIA;
let number = 3;
let count = () => {
  console.log(number);
    if (number > 0) {
        document.getElementById("count").textContent = number;
        number--;
        setTimeout(count, 1000);
    }
    else {
      document.getElementById("count").textContent = "GO";
      document.getElementById("count").style.color = "green";
      document.getElementById("correr").disabled = false;
      correrCoches = window.setInterval(function(){
        cocheActual.correr();
        cocheRival.correr();
      }, 1000);

      accelerarIA = window.setInterval(function(){
        cocheRival.acelerar();
      }, 400);
      
    }
}

let carrera = () => {
  document.getElementById("sect3").style.display = "none";
  document.getElementById("sect4").style.display = "flex";

  count();

  
}


//clases de coches

class vehiculo {
  //id
  //jugador
  //aceleracion
  //velocidad mx
  
    constructor(id, jugador, aceleracion, velocidadmax){
    this.id = id;
    this.jugador = jugador;
    this.velocidad = 0;
    this.desaceleracion = 10;
    this.vueltas = 1;
    this.vueltasMax = 3;
    this.metrosVuelta = 5000;
    this.metrosTramos = 300;
    this.tipoTramo = 'recta';
    this.tramo = 0;
    this.metros = 0;
    this.velocidadmax = parseInt(velocidadmax);
    this.aceleracion = parseInt(aceleracion);  
    let progreso = document.getElementById("progreso"+this.jugador);
    progreso.getElementsByClassName("metros")[0].textContent = 0 + ' metros  /  ' + this.metrosVuelta + ' metros' ;
    progreso.getElementsByClassName("barra")[0].style.width = 0/this.metrosVuelta*100 + '%';
    document.getElementById("velocidad"+this.jugador).textContent = 0 + ' m/s';
    document.getElementById("vueltas"+this.jugador).textContent = 1 + '/' + this.vueltasMax; 
  }
  acelerar (){
    console.log('velocidad: ' + this.velocidad);
    if(this.velocidad < this.velocidadmax){
        this.velocidad = this.velocidad + this.aceleracion;
    }
  }
  correr () {
    this.velocidad = this.velocidad - this.desaceleracion;
    if(this.velocidad < 0) {
      this.velocidad = 0;
    }
    this.metros = this.metros + this.velocidad;
    if (this.metros >= this.metrosVuelta) {
      this.meta();
    } 
    if (Math.floor(this.metros/this.metrosTramos) >= this.tramo) {
      this.tramo = this.tramo +1;
      if(Math.random() >= 0.5) {
        if (this.tipoTramo == 'curva') {
          this.recta();
        }
      } else {
        if (this.tipoTramo == 'recta') {
          this.curva();
        }
      }
    }
    let progreso = document.getElementById("progreso"+this.jugador);
    progreso.getElementsByClassName("metros")[0].textContent = this.metros + ' metros  /  ' + this.metrosVuelta + ' metros' ;
    progreso.getElementsByClassName("barra")[0].style.width = this.metros/this.metrosVuelta*100 + '%';
    document.getElementById("velocidad"+this.jugador).textContent = this.velocidad  + ' m/s';
  
  }
  curva () {
    this.velocidadmax = this.velocidadmax/2;
    this.tipoTramo = 'curva';
  }
  recta () {
    this.velocidadmax = this.velocidadmax*2;
    this.tipoTramo = 'recta';
  }
  meta () {
    console.log( 'vueltas: ' +this.vueltas);
    console.log('vueltasMax: ' +this.vueltasMax);
    console.log('metros: ' +this.metros);
    console.log('metrosVuelta: ' +this.metrosVuelta);
    this.vueltas = this.vueltas + 1;
    this.metros = this.metros - this.metrosVuelta;
    this.tramo = 0;
    if (this.vueltas > this.vueltasMax) {
      document.getElementById("sect4").style.display = "none";
      document.getElementById("sect5").style.display = "flex";
      document.getElementById("ganador").textContent = this.jugador; 
      clearInterval(correrCoches);
      clearInterval(accelerarIA);
    }
    document.getElementById("vueltas"+this.jugador).textContent = this.vueltas + '/' + this.vueltasMax;
  }
}


//boton restart
let restart = () => {
  document.getElementById("sect5").style.display = "none";
  document.getElementById("sect1").style.display = "flex";
  
}