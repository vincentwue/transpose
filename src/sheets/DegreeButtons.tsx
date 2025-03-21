import * as React from "react";
import { state } from "../state";




const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];

export function DegreeButtons() {
  const notes = [...Array(7).keys()];


  const mapped = notes.map((note, index) => {
    return <button key={index} onClick={() => state.onDegreeClicked(index)}>{roman[note]}</button>;
  });

  if (!state.degreeVisible) {
    return null;
  }

  return <React.Fragment>{mapped}</React.Fragment>;
}
