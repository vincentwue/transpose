import * as React from "react";
import { state } from "../state";


export interface IReactPianoExampleProps {
  firstNote?: number;
  lastNote?: number;
}

export function ReactPianoExample(props: IReactPianoExampleProps) {
  const notes = [
    "C",
    "C# / Db", // or "Db"
    "D",
    "D# / Eb", // or "Eb"
    "E",
    "F",
    "F# / Gb", // or "Gb"
    "G",
    "G# / Ab", // or "Ab"
    "A",
    "A# / Bb", // or "Bb"
    "B",
  ];

  const mapped = notes.map((note, index) => {
    return <button onClick={e => state.onNoteClicked(index)}>{note}</button>;
  });

  if (!state.pianoVisible) {
    return null;
  }

  return <div>{mapped}</div>;
}
