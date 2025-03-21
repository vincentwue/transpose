import { Subject } from "rxjs";
import { Accidental, StaveNote } from "vexflow";
import { renderNotes } from "./sheets/renderNotes";

class State {
  // Keys (C = 0, C# = 1, ... B = 11)
  public sourceKey = 0; // C Dur (C Major)
  public targetKey = 5; // F Dur (F Major)
  public flatKeys = [0, 1, 3, 6, 8, 10]; // F, Bb, Eb, Ab, Db
  public correctCounter = 0;

  // Current notes displayed
  public currentNotes: StaveNote[] = [];

  // Visibility flags
  public degreeVisible = true;
  public pianoVisible = false;

  // Game state
  public selectedDegree: number | null = null;

  // Observable for state changes
  public onChange = new Subject<State>();

  constructor() {
    this.fillNotes();
    this.update();
  }

  public changeSourceKey(key: number) {
    this.sourceKey = key;
    this.fillNotes(true); // Generate new notes from the new source key
    this.update(); // Update state to use new source key for checks
  }

  public changeTargetKey(key: number) {
    this.targetKey = key;
    this.update(); // Update state to use new target key for checks
  }

  // Handle when user selects a note (0-11 representing C through B)
  onNoteClicked(index: number): void {
    if (!this.degreeVisible && this.pianoVisible) {
      // Berechne die richtige Note in der Zieltonart
      const correctNote = this.getNoteInTargetKey();

      if (index === correctNote) {
        // Richtige Antwort: Erste Note entfernen, neue am Ende hinzufügen
        this.currentNotes.shift();
        this.addNewRandomNote();

        // Zurück zum Degree-Auswahlmodus
        this.degreeVisible = true;
        this.pianoVisible = false;
        this.selectedDegree = null;
      }
    }

    this.update();
  }

  // Handle when user selects a degree (0-6 representing scale positions)
  onDegreeClicked(index: number): void {
    if (this.degreeVisible) {
      // Prüfe, ob das gewählte Degree für die erste Note korrekt ist
      const correctDegree = this.getDegreeOfFirstNote();

      if (index === correctDegree) {
        // Korrekt! Wechsle zur Note-Auswahl
        this.selectedDegree = index;
        this.degreeVisible = false;
        this.pianoVisible = true;
        this.correctCounter++;
      }
    }

    if (this.correctCounter === 10) {
      const random1 = Math.floor(Math.random() * 12);
      const random2 = Math.floor(Math.random() * 12);
      this.changeSourceKey(random1);
      this.changeTargetKey(random2);
    }

    this.update();
  }

  // Get the degree (0-6) of the first note in the current key
  // Get the degree (0-6) of the first note in the current source key
  private getDegreeOfFirstNote(): number {
    if (this.currentNotes.length === 0) return -1;

    // Extrahiere den Buchstaben der ersten Note (ohne Oktave)
    const noteNameWithOctave = this.currentNotes[0].keys[0];
    const noteName = noteNameWithOctave.split("/")[0];

    // Umwandlung des Notenbuchstabens in eine Zahl (0-11)
    const noteToNumber: { [key: string]: number } = {
      c: 0,
      "c#": 1,
      db: 1,
      d: 2,
      "d#": 3,
      eb: 3,
      e: 4,
      f: 5,
      "f#": 6,
      gb: 6,
      g: 7,
      "g#": 8,
      ab: 8,
      a: 9,
      "a#": 10,
      bb: 10,
      b: 11,
    };

    // Absoluter Notenwert (0-11)
    const absoluteNote = noteToNumber[noteName];

    // Die Dur-Tonleiter-Intervalle
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];

    // Berechne den relativen Abstand zur Quelltonart
    const relativeNote = (absoluteNote - this.sourceKey + 12) % 12;

    // Finde den Index (Grad) in der Tonleiter
    for (let i = 0; i < majorScaleIntervals.length; i++) {
      if (majorScaleIntervals[i] === relativeNote) {
        return i;
      }
    }

    // Wenn die Note nicht in der Tonleiter ist (chromatisch),
    // geben wir -1 zurück oder den nächsten Grad
    return -1;
  }

  // Get the correct note (0-11) in the target key
  // Get the correct note (0-11) in the target key
  private getNoteInTargetKey(): number {
    if (this.currentNotes.length === 0) return -1;

    // Stufe der aktuellen Note in der Quelltonart (sourceKey)
    const degreeInSourceKey = this.getDegreeOfFirstNote();

    // Die Dur-Tonleiter-Intervalle (in Halbtonschritten)
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];

    // Berechne die absolute Note der Stufe in der Quelltonart
    const noteInSourceKey =
      (this.sourceKey + majorScaleIntervals[degreeInSourceKey]) % 12;

    // Finde die entsprechende Stufe in der Zieltonart
    // Die Stufe bleibt gleich, z.B. 3. Stufe in C-Dur -> 3. Stufe in F-Dur
    const noteInTargetKey =
      (this.targetKey + majorScaleIntervals[degreeInSourceKey]) % 12;

    return noteInTargetKey;
  }

  // Generate four random notes
  public fillNotes(reset: boolean = false): void {
    if (reset) {
      this.currentNotes = [];
    }

    // Generate notes based on the current source key
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];

    // Fill up to 4 notes
    while (this.currentNotes.length < 4) {
      this.addNewRandomNote();
    }
  }

  // Add a new random note to the end of the queue
  private addNewRandomNote(): void {
    // Define the major scale notes based on the current source key
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
    const noteNamesSharp = [
      "c",
      "c#",
      "d",
      "d#",
      "e",
      "f",
      "f#",
      "g",
      "g#",
      "a",
      "a#",
      "b",
    ];
    const noteNamesFlat = [
      "c",
      "db",
      "d",
      "eb",
      "e",
      "f",
      "gb",
      "g",
      "ab",
      "a",
      "bb",
      "b",
    ];
    const noteNames = this.flatKeys.includes(this.sourceKey)
      ? noteNamesFlat
      : noteNamesSharp;
    // Get diatonic notes in the current source key
    const diatonicNotes = majorScaleIntervals.map(
      (interval) => noteNames[(this.sourceKey + interval) % 12]
    );

    // Map to 4th octave notation for VexFlow
    const diatonicNotesInOctave = diatonicNotes.map((note) => `${note}/4`);

    const lastNote = this.currentNotes[this.currentNotes.length - 1]?.keys[0];
    let randomNote = lastNote;

    // Not same note twice
    while (lastNote === randomNote) {
      // Choose a random diatonic note
      const randomIndex = Math.floor(
        Math.random() * diatonicNotesInOctave.length
      );
      randomNote = diatonicNotesInOctave[randomIndex];
    }

    this.currentNotes.push(
      new StaveNote({
        clef: "treble",
        keys: [randomNote],
        duration: "q",
      })
    );
    if (
      randomNote.length > 1 &&
      (randomNote.includes("#") || randomNote.includes("b"))
    ) {
      if (this.flatKeys.includes(this.sourceKey)) {
        this.currentNotes[this.currentNotes.length - 1].addModifier(
          new Accidental("b")
        );
      } else {
        this.currentNotes[this.currentNotes.length - 1].addModifier(
          new Accidental("#")
        );
      }
    }
    console.log(
      diatonicNotes,
      this.currentNotes.map((note) => note.keys[0])
    );
  }

  // Update the state and render notes
  public update() {
    // Render die Noten immer
    renderNotes(this.currentNotes);

    // Aktualisiere den State
    this.onChange.next(this);
    console.log(this);
  }
}

export const state = new State();
