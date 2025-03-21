import { Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";

export function renderNotes(notes: StaveNote[]) {
  // Create an SVG renderer and attach it to the DIV element named "output".
  const output = document.getElementById("output");
  if (!output) throw new Error("Output element not found");
  output.innerHTML = "";
  const renderer = new Renderer("output", Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(400, 200);
  const context = renderer.getContext();
  // Create a stave of width 400 at position 10, 40 on the canvas.
  const stave = new Stave(10, 40, 400);

  // Add a clef and time signature.
  stave.addClef("bass").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  // Create a voice in 4/4 and add above notes
  const voice = new Voice();
  // const transposed = notes.map((note) => {
  //   debugger;
  //   const rese = new StaveNote({
  //     keys: [`${note.keys[0]}/4`],
  //     duration: "q",
  //   });
  //   const modifiers = note.getModifiers();
  //   if (modifiers.length > 0) {
  //     rese.addModifier(modifiers[0]);
  //   }
  //   return rese;
  // });
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  new Formatter().joinVoices([voice]).format([voice], 350);

  // Render voice
  voice.draw(context, stave);
}
