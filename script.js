/*
 * IDB Programming: A3 — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — uses the state to make sound and shapes every 100ms, if necessary
 *   controls — what happens when the player uses the pointer
 *   setup    — starts everything
 *
 * The pointer events change the state. update() and use() each run every
 * 100ms, in a loop:
 *   1. update: change the state, e.g. based on time or on the pointer's movement
 *   2. use:    make sound and move shapes, based on the state
 *
 * Shapes come from shape.js: createShape() makes one, and its methods
 * (setPosition, setSize, setColour ...) change it.
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

import { createShape } from "./shape.js";

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which notes you can play, how fast things move, the tempo.
const note = "C4"; // the note played when the pointer goes down

const shape = createShape(); // different shapes
const shapeYellow = createShape();
const shapeGreen = createShape();
const shapeBlue = createShape();
const shapePurple = createShape();
// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: where the pointer is, how fast it's moving, or whether a drone is on.

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound and move shapes. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time the pointer goes down: a click, a tap or a pen touch.
function pointerDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  console.log("Pointer down at", event.clientX, event.clientY);
  synth.triggerAttackRelease(note, "8n"); // play the note for an eighth note
}

function startSound(event) {
  Tone.start();
}

function pointerEnter(event) {
  if (event.currentTarget === shape.element) {
    synth.triggerAttackRelease("E4", "8n");
    shape.setRoundedness(1);
    shape.setColour(0, 100, 70);
  } else if (event.currentTarget === shapeYellow.element) {
    synth.triggerAttackRelease("D4", "8n");
    shapeYellow.setRoundedness(1);
    shapeYellow.setColour(60, 100, 70);
  } else if (event.currentTarget === shapeGreen.element) {
    synth.triggerAttackRelease("C4", "8n");
    shapeGreen.setRoundedness(1);
    shapeGreen.setColour(120, 100, 70);
  } else if (event.currentTarget === shapeBlue.element) {
    synth.triggerAttackRelease("C4", "8n");
    shapeBlue.setRoundedness(1);
    shapeBlue.setColour(210, 100, 70);
  } else if (event.currentTarget === shapePurple.element) {
    synth.triggerAttackRelease("A4", "8n");
    shapePurple.setRoundedness(1);
    shapePurple.setColour(270, 100, 70);
  }
}

// console.log("pointer enters red shape");
function pointerLeave(event) {
  if (event.currentTarget === shape.element) {
    synth.triggerAttackRelease("G4", "8n");
    shape.setRoundedness(0.4);
    shape.setColour(0, 80, 50);
  } else if (event.currentTarget === shapeYellow.element) {
    synth.triggerAttackRelease("A4", "8n");
    shapeYellow.setRoundedness(0.4);
    shapeYellow.setColour(60, 80, 50);
  } else if (event.currentTarget === shapeGreen.element) {
    synth.triggerAttackRelease("B4", "8n");
    shapeGreen.setRoundedness(0.4);
    shapeGreen.setColour(120, 80, 50);
  } else if (event.currentTarget === shapeBlue.element) {
    synth.triggerAttackRelease("E4", "8n");
    shapeBlue.setRoundedness(0.4);
    shapeBlue.setColour(210, 80, 50);
  } else if (event.currentTarget === shapePurple.element) {
    synth.triggerAttackRelease("F4", "8n");
    shapePurple.setRoundedness(0.4);
    shapePurple.setColour(270, 80, 50);
  }
}
console.log("pointer leaves yellow shape");
//function pointerMove(event) {
// Tone.start();
// let normX = event.clientX/window.innerWidth;

// console.log("Pointer placement ", event.clientX, event.clientY);
//synth.triggerAttackRelease(note, "8n");
// }

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Example: a shape near the middle of the window. Replace it with your own.

  shape.setPosition(0.1, 0.1); // Where the shape is positioned on the screen
  shape.setSize(100); // How big or small the shape is
  shape.setRoundedness(0.4); // How round or square
  shape.setColour(0, 80, 50); // Which hue, saturation and lightness the shape has

  shapeYellow.setPosition(0.5, 0.5);
  shapeYellow.setSize(100);
  shapeYellow.setRoundedness(0.4);
  shapeYellow.setColour(60, 80, 50);

  shapeGreen.setPosition(1, 1);
  shapeGreen.setSize(100);
  shapeGreen.setRoundedness(0.4);
  shapeGreen.setColour(120, 80, 50);

  shapeBlue.setPosition(1, 0.1);
  shapeBlue.setSize(100);
  shapeBlue.setRoundedness(0.4);
  shapeBlue.setColour(210, 80, 50);

  shapePurple.setPosition(0.1, 1);
  shapePurple.setSize(100);
  shapePurple.setRoundedness(0.4);
  shapePurple.setColour(270, 80, 50);

  // Put your event listener code here
  window.addEventListener("pointerdown", pointerDown); // possible to play sound by clicking

  window.addEventListener("pointerdown", startSound); // doubble check if both are needed
  shape.element.addEventListener("pointerenter", pointerEnter); // possible to play sound by entering shape
  shapeYellow.element.addEventListener("pointerenter", pointerEnter); // possible to play sound by entering shape
  shapeGreen.element.addEventListener("pointerenter", pointerEnter);
  shapeBlue.element.addEventListener("pointerenter", pointerEnter);
  shapePurple.element.addEventListener("pointerenter", pointerEnter);

  shape.element.addEventListener("pointerleave", pointerLeave); // possible to play sound by leaving shape
  shapeYellow.element.addEventListener("pointerleave", pointerLeave);
  shapeGreen.element.addEventListener("pointerleave", pointerLeave);
  shapeBlue.element.addEventListener("pointerleave", pointerLeave);
  shapePurple.element.addEventListener("pointerleave", pointerLeave);
  // window.addEventListener("pointermove", pointerMove); // possible to play sound through cursor movement
}

setup(); // Always remember to call setup()!
