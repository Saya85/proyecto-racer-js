
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
 console.log(cocheActual);
 console.log(cocheRival);
 document.getElementById("sect2").style.display = "none";
 document.getElementById("sect3").style.display = "flex";
 document.getElementById("cocheJugador").html('<img src="img/croquetas'+slideIndex+'.jpeg"></img>');
 document.getElementById("cocheRival").html('<img src="img/croquetas'+rivalId+'.jpeg"></img>');
}


//boton carrera
let intervalId;
let count = (number) => {
    if (number > 0) {
        document.getElementById("count").textContent = number;
        number--;
        setTimeout(count(number), 700);
    }
    else {
      document.getElementById("count").textContent = 0;
      document.getElementById("correr").disabled = false;
      intervalId = window.setInterval(function(){
        cocheActual.correr();
        cocheRival.correr();
      }, 1000);
      
    }
}

let carrera = () => {
  document.getElementById("sect3").style.display = "none";
  document.getElementById("sect4").style.display = "flex";

  count(3);

  
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
    this.vueltas = 0;
    this.vueltasMax = 3;
    this.metrosVuelta = 10000;
    this.metrosTramos = 100;
    this.tipoTramo = 'recta';
    this.tramo = 0;
    this.metros = 0;
    this.velocidadmax = velocidadmax;
    this.aceleracion = aceleracion;  
    let progreso = document.getElementById("progreso"+this.jugador);
    progreso.getElementsByClassName("metros").textContent = 0 + ' metros  /  ' + this.metrosVuelta + ' metros' ;
    progreso.getElementsByClassName("barra").style.width = 0/this.metrosVuelta*100 + '%';
    document.getElementById("velocidad"+this.jugador).textContent = 0 + ' m/s';
    document.getElementById("vueltas"+this.jugador).textContent = 0 + '/' + this.vueltasMax; 
  }
  accelerar (){
    if(this.velocidad <= this.velocidadmax){
        this.velocidad = this.velocidad + this.aceleracion;
    }
  }
  correr () {
    this.velocidad = this.velocidad - this.desaceleracion;
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
    progreso.getElementsByClassName("metros").textContent = this.metros + ' metros  /  ' + this.metrosVuelta + ' metros' ;
    progreso.getElementsByClassName("barra").style.width = this.metros/this.metrosVuelta*100 + '%';
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
    this.vueltas = this.vueltas + 1;
    this.metros = this.metros - this.metrosVuelta;
    this.tramo = 0;
    if (this.vueltas = this.vueltasMax) {
      document.getElementById("sect4").style.display = "none";
      document.getElementById("sect5").style.display = "flex";
      document.getElementById("ganador").textContent = ganador; 
      clearInterval(intervalId);
    }
    document.getElementById("vueltas"+this.jugador).textContent = this.vueltas + '/' + this.vueltasMax;
  }
}


//boton restart
let restart = () => {
  document.getElementById("sect5").style.display = "none";
  document.getElementById("sect1").style.display = "flex";
  
}