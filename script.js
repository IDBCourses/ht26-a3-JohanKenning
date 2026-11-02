import { createShape } from "./shape.js";

// ---------- Settings ----------

const shapeRed = createShape(); // defines createShape imported from shape.js, makes it possible to create shapes.
const shapeYellow = createShape(); // different shapes.
const shapeGreen = createShape();
const shapeBlue = createShape();
const shapePurple = createShape();

// All shapes collected in one array, the loops go through them.
const shapes = [shapeRed, shapeYellow, shapeGreen, shapeBlue, shapePurple];

const startShape = 100; // Starting size of the shapes, in pixels.
const nextSize = 10; // How many pixels a shape grows when entered.
const maxShape = 3; // How many times a shape can grow before reseting.

// List of the sizes a shape can have 100, 110, 120, 130.
const sizes = [];
for (let i = 0; i <= maxShape; i++) {
  sizes.push(startShape + i * nextSize); // Pushes one size to the end of the list
}
// ---------- State ----------
const shapePositions = [0, 0, 0, 0, 0]; // index of sizes, in the same order as shapes.

// ---------- Sound ----------
const vibrato = new Tone.Vibrato(6, 0).toDestination(); // 6 wobbles per second, depth 0 = off.
const synth = new Tone.PolySynth(Tone.Synth).connect(vibrato); // Plays several notes at once, with vibrato effect.
// ---------- Update ----------
function update() {
  // Checks what has changed
  setTimeout(update, 100); // updates evere 100 milliseconds
}

// ---------- Use ----------
function use() {
  // Acts on update
  setTimeout(use, 100); // call use() every 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------

function pointerDown(event) {
  // runs when pointer is pressed down.
  Tone.start(); // browsers only allow sound after the player has pressed something
  vibrato.depth.rampTo(0.5, 0.2); // fades in the vibrato effect in
  console.log("pointer down: vibrato on");
}

function pointerUp(event) {
  // runs when pointer is released
  Tone.start(); // makes sure the sound can start.
  vibrato.depth.rampTo(0, 0.2); // fades the vibrato effect out
  console.log("pointer up: vibrato off");
}

function pointerEnter(event) {
  // Runs when the pointer moves into a shape.
  if (event.currentTarget === shapeRed.element) {
    // Figures out which shape was entered, plays it chord and lights up.
    synth.triggerAttackRelease(["E4", "G4", "B4"], "8n");
    shapeRed.setRoundedness(1); // makes it a full circle
    shapeRed.setColour(0, 100, 70); // hue, saturation, lightness.
  } else if (event.currentTarget === shapeYellow.element) {
    synth.triggerAttackRelease(["G4", "B4", "D5"], "8n");
    shapeYellow.setRoundedness(1);
    shapeYellow.setColour(60, 100, 70);
  } else if (event.currentTarget === shapeGreen.element) {
    synth.triggerAttackRelease(["F4", "A4", "C5"], "8n");
    shapeGreen.setRoundedness(1);
    shapeGreen.setColour(120, 100, 70);
  } else if (event.currentTarget === shapeBlue.element) {
    synth.triggerAttackRelease(["A3", "C4", "E4"], "8n");
    shapeBlue.setRoundedness(1);
    shapeBlue.setColour(210, 100, 70);
  } else if (event.currentTarget === shapePurple.element) {
    synth.triggerAttackRelease(["C4", "G4", "B4"], "8n");
    shapePurple.setRoundedness(1);
    shapePurple.setColour(270, 100, 70);
  }
  for (let i = 0; i < shapes.length; i++) {
    // make the entered hape one size bigger.
    if (event.currentTarget === shapes[i].element) {
      shapePositions[i] = shapePositions[i] + 1; // go to the next size
      if (shapePositions[i] >= sizes.length) shapePositions[i] = 0; // starts over after biggest size.
      console.log("shape", i, "size", sizes[shapePositions[i]]);
      console.log("Pointer enters shape");
    }
    shapes[i].setSize(sizes[shapePositions[i]]); // applies the size to the shape.
  }
}

function pointerLeave(event) {
  // runs when the pointer moves out of a shape and returns to standard settings.
  if (event.currentTarget === shapeRed.element) {
    shapeRed.setRoundedness(1);
    shapeRed.setColour(0, 80, 50);
  } else if (event.currentTarget === shapeYellow.element) {
    shapeYellow.setRoundedness(1);
    shapeYellow.setColour(60, 80, 50);
  } else if (event.currentTarget === shapeGreen.element) {
    shapeGreen.setRoundedness(1);
    shapeGreen.setColour(120, 80, 50);
  } else if (event.currentTarget === shapeBlue.element) {
    shapeBlue.setRoundedness(1);
    shapeBlue.setColour(210, 80, 50);
  } else if (event.currentTarget === shapePurple.element) {
    shapePurple.setRoundedness(1);
    shapePurple.setColour(270, 80, 50);
  }
  console.log("pointer leaves shape");
}

// ---------- Setup ----------
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  shapeRed.setPosition(0.1, 0.1); // Where the shape is positioned on the screen
  shapeRed.setSize(100); // How big or small the shape is
  shapeRed.setRoundedness(1); // How round or square
  shapeRed.setColour(0, 80, 50); // Which hue, saturation and lightness the shape has

  shapeYellow.setPosition(0.4, 0.4);
  shapeYellow.setSize(100);
  shapeYellow.setRoundedness(1);
  shapeYellow.setColour(60, 80, 50);

  shapeGreen.setPosition(0.7, 0.8);
  shapeGreen.setSize(100);
  shapeGreen.setRoundedness(1);
  shapeGreen.setColour(120, 80, 50);

  shapeBlue.setPosition(0.7, 0.1);
  shapeBlue.setSize(100);
  shapeBlue.setRoundedness(1);
  shapeBlue.setColour(210, 80, 50);

  shapePurple.setPosition(0.1, 0.8);
  shapePurple.setSize(100);
  shapePurple.setRoundedness(1);
  shapePurple.setColour(270, 80, 50);

  window.addEventListener("pointerdown", pointerDown); // vibrato on
  window.addEventListener("pointerup", pointerUp); // vibrato off

  shapeRed.element.addEventListener("pointerenter", pointerEnter); // possible to play sound and by entering shape
  shapeYellow.element.addEventListener("pointerenter", pointerEnter);
  shapeGreen.element.addEventListener("pointerenter", pointerEnter);
  shapeBlue.element.addEventListener("pointerenter", pointerEnter);
  shapePurple.element.addEventListener("pointerenter", pointerEnter);

  shapeRed.element.addEventListener("pointerleave", pointerLeave); // Resets
  shapeYellow.element.addEventListener("pointerleave", pointerLeave);
  shapeGreen.element.addEventListener("pointerleave", pointerLeave);
  shapeBlue.element.addEventListener("pointerleave", pointerLeave);
  shapePurple.element.addEventListener("pointerleave", pointerLeave);
}

setup(); // Always remember to call setup()!
