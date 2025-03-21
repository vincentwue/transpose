import * as React from "react";
import 'react-piano/dist/styles.css';
import { DegreeButtons } from "./DegreeButtons";
import { ReactPianoExample } from "./ReactPianoExample";

export function TransposeGame() {

    return <React.Fragment>
        <DegreeButtons></DegreeButtons>
        <ReactPianoExample></ReactPianoExample>
    </React.Fragment>

}