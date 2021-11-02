
/**
 * a hosted version of moment.js has been added to this
 * project's index.html. grab the relevant <script></script> tag
 * from there to add it to your own project.
 */
  
  // Javascript's Date.now() method returns the current
  // time as a number of milliseconds passed since 
  // January 1, 1970. this is a standard that most (all?)
  // programming languages use. moment.js expects seconds since
  // that start time, so we divide this number by 1000 to convert
  // to seconds from milliseconds


const chiusura = new Date('November 1, 2021 00:00:00');

let mid_altezza, mid_larghezza;
let altezza_testo;

let tempo_trascorso;
let anni;
let secondi;
let minuti;
let ore;
let settimane;
let giorni;

let punti = [];
let target_x = [];
let target_y = [];
let target_x_mouse = [];
let target_y_mouse = [];
let target_x_random = [];
let target_y_random = [];

let spazio;
let dens = 8;

let pulsazione = [];
let fase_pulsazione = [];
let amp_puls = [];
let pulsazione_pre = [];
let connessioni = [];

let cnv;
let cliccato = 0;
let cliccato_pre = 0;

let sample = [];
let bordo;
let polifonia = 16;
let campione = 0;

let costringilo = [0.5, 0.562, 0.633, 0.712, 0.8, 0.9, 1, 1.125, 1.265, 1.423, 1.6, 1.8, 2, 2.125, 2.265, 2.423];


function preload() {
  soundFormats('ogg', 'mp3');
  bordo = loadSound('Bordo.mp3');
 
  for (let i = 0; i < polifonia; i++) {
  sample[i] = loadSound('Sample.mp3');
  }
}

function setup() { 
  
  frameRate(20);
  
  cnv = createCanvas(windowWidth, windowHeight);
  
  cnv.touchStarted(traccia_mouse);
  cnv.mousePressed(traccia_mouse);
   
   mid_larghezza = width * 0.5;
    mid_altezza = height * 0.5;
  
  altezza_testo = mid_altezza * 0.1;
  
  let lung_x = width;
  let lung_y = height;
  let lung;
  
  if (lung_x >= lung_y) {
     lung = lung_x;
  }
  
  else{
  lung = lung_y;
  }
  
  spazio = floor(lung / dens);
  
  for (let x = 0; x < lung_x; x += spazio) {
    for (let y = 0; y < lung_y; y += spazio) {
      
      let punto = createVector (x + floor(random(-10, 10)), 
                                y + floor(random(-10, 10)));
      
      punti.push(punto);
    }    
  }
  
  for (let i = 0; i < punti.length; i++) {
    
    target_x[i] = floor(random(width));
    target_y[i] = floor(random(height));
    
    target_x_random[i] = target_x[i];
    target_y_random[i] = target_y[i];
       
    fase_pulsazione[i] = random(-2 * PI, 2 * PI);
    amp_puls[i] = random(5) + 10;
    pulsazione[i] = 10 + amp_puls[i] * abs(sin(fase_pulsazione[i]));
    pulsazione_pre[i] = pulsazione[i];
    
    connessioni[i] = 0;
  }
  
  bordo.amp(1.5);
  for (let i = 0; i < polifonia; i++) {
  sample[i].amp(2);
  }
} 

function draw() { 
  
  background(0);
  fill(255);
  strokeWeight(1);
  
  let pos_mouse_X = mouseX;
  let pos_mouse_Y = mouseY;
  
  for (let i = 0; i < punti.length; i++) {

//--------target x-------//
    
    if (cliccato == 1) {
    //  ellipse(mouseX, mouseY, 50, 50);
      target_x[i] = pos_mouse_X * 0.7 + target_x_random[i] * 0.3;
      target_y[i] = pos_mouse_Y * 0.7 + target_y_random[i] * 0.3;
}
    else {
       target_x[i] = target_x_random[i];
       target_y[i] = target_y_random[i];
    }
    
    
   if (punti[i].x == target_x_random[i]) {
        
       target_x_random[i] = floor(random(width));
     
     }
    
    if (punti[i].x > target_x[i]) {
       
      punti[i].x =  punti[i].x - 1;
      
    }
    
    if (punti[i].x < target_x[i]) {
       
        punti[i].x = punti[i].x + 1;
    }
    
    if (punti[i].y == target_y_random[i]) {
        
       target_y_random[i] = floor(random(height));
     
     }
    
    if (punti[i].y > target_y[i]) {
       
      punti[i].y =  punti[i].y - 1;
      
    }
    
    if (punti[i].y < target_y[i]) {
       
        punti[i].y = punti[i].y + 1;
    }
// -------- disegno lucciola---------//
    
    stroke(255);
    fill(255, 255, 0, 255);
    point(punti[i].x, punti[i].y, 0);
  
//---------- disegno alone---------//
    
    noStroke();
    fill(255, 255, 0, 100 * connessioni[i] + 50);
    ellipse(punti[i].x, punti[i].y, pulsazione[i], pulsazione[i]);
    fase_pulsazione[i] = fase_pulsazione[i] + 0.025;
    pulsazione[i] = 10 + amp_puls[i] * abs(sin(fase_pulsazione[i]));
    
  } // fine for lucciole
  
// calcolo e disegno collegamenti
  
 
  
  for (let i = 0; i < punti.length; i++) {
    let distanza;
   for (let j = 0; j < punti.length; j++) { 
    
       if (i != j) {
          distanza = dist(punti[i].x, punti[i].y, punti[j].x, punti[j].y );
       }
     if (distanza < 50) {
       
        strokeWeight(1);
        stroke(255, 255, 0, 50);
       line(punti[i].x, punti[i].y, punti[j].x, punti[j].y);
       
       strokeWeight(8);
       stroke(255, 255, 0, 30);
      line(punti[i].x, punti[i].y, punti[j].x, punti[j].y);
       
       connessioni[j] = connessioni[j] + 1;
       
     }
     
    if (connessioni[j] > 0 && distanza >= 40 ) {
      connessioni[j] = connessioni[j] - 1;
        
     }
   }
    
    
  }
    
  tempo_trascorso = (Date.now() - chiusura.getTime()) * 0.001;   
  secondi = tempo_trascorso;
  minuti = secondi / 60;
  ore = minuti / 60;
  giorni = ore / 24;
  settimane = giorni / 7;
  anni = giorni / 365;
  strokeWeight(1);
  stroke(255);

 //line(width * 0.5, 0, width * 0.5, height);
 // line(0, height * 0.5, width, height * 0.5);
  
  noFill();
  //rect(mid_larghezza - 150, (mid_altezza * 0.01) - 5, mid_larghezza, mid_altezza * 0.65);
  
  fill(255);
  
  textSize(altezza_testo * 0.75);
  textAlign(CENTER);
  text('Il Casino del Principe è chiuso da:', mid_larghezza, 1.5 * altezza_testo);
  text('Ma si continua a brillare', mid_larghezza, height - altezza_testo);
  
  textAlign(LEFT, CENTER);
  translate(30, height * 0.335);
  textSize(altezza_testo * 0.50);
  
  text('ANNI',      mid_larghezza - 150, mid_altezza * 0.1);
  text('SETTIMANE', mid_larghezza - 150, mid_altezza * 0.1 + altezza_testo);
  text('GIORNI',    mid_larghezza - 150, mid_altezza * 0.1 + 2 * altezza_testo);
  text('ORE',       mid_larghezza - 150, mid_altezza * 0.1 + 3 * altezza_testo);
  text('MINUTI',    mid_larghezza - 150, mid_altezza * 0.1 + 4 * altezza_testo);
  text('SECONDI',   mid_larghezza - 150, mid_altezza * 0.1 + 5 * altezza_testo);
 
  textSize(altezza_testo);
  text(floor(anni),       mid_larghezza, mid_altezza * 0.1);
  text(floor(settimane),  mid_larghezza, mid_altezza * 0.1 + altezza_testo);
  text(floor(giorni),     mid_larghezza, mid_altezza * 0.1 + 2 * altezza_testo);
  text(floor(ore) ,       mid_larghezza, mid_altezza * 0.1 + 3 * altezza_testo);
  text(floor(minuti) ,    mid_larghezza, mid_altezza * 0.1 + 4 * altezza_testo);
  text(floor(secondi) ,   mid_larghezza, mid_altezza * 0.1 + 5 * altezza_testo);
  
  
// --------sintesi audio--------//
  if (bordo.isPlaying() == false) {
     bordo.loop();
  }


  
  if (cliccato == 1) {
  let indice_freq = floor(map(pos_mouse_Y, 0, height, 15, 0));
  let freq = costringilo[indice_freq];
     
    if (campione > polifonia - 2) {
     campione = 0;
  }
    sample[campione].rate(freq);
 
  if (cliccato == 1 && cliccato_pre == 0) {
    campione = campione + 1;
    if (sample[campione].isPlaying() == false) {
      sample[campione].play();
     }    
    }
  }
  cliccato_pre = cliccato;
} // fine del draw

function traccia_mouse() {
  
  cliccato = 1;
  return cliccato;
}

function mouseReleased() {
  
cliccato = 0;
  return cliccato;
  
}

function touchEnded() {
  
cliccato = 0;
  return cliccato;
  
}
