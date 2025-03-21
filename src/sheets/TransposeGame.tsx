import * as React from "react";
import 'react-piano/dist/styles.css';
import { state } from "../state";
import { DegreeButtons } from "./DegreeButtons";
import { ReactPianoExample } from "./ReactPianoExample";
const keyMap = [
    "C",
    "Db", // or "Db"
    "D",
    "Eb", // or "Eb"
    "E",
    "F",
    "Gb", // or "Gb"
    "G",
    "Ab", // or "Ab"
    "A",
    "Bb", // or "Bb"
    "B",
];

export function TransposeGame() {

    return <div>
        {keyMap[state.key]} to {keyMap[state.targetKey]}
        <DegreeButtons></DegreeButtons>
        <ReactPianoExample></ReactPianoExample>
    </div>

}