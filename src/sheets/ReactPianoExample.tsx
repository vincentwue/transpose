import * as React from "react";
import { state } from "../state";


export interface IReactPianoExampleProps {
  firstNote?: number;
  lastNote?: number;
}

export function ReactPianoExample(props: IReactPianoExampleProps) {
  const { firstNote = 0, lastNote = 11 } = props;
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
    return <button onClick={() => state.onNoteClicked(index)}>{note}</button>;
  });

  if (!state.pianoVisible) {
    return null;
  }

  return <React.Fragment>{mapped}</React.Fragment>;
}
