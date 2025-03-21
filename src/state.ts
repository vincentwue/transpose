import { Subject } from "rxjs";
import { StaveNote } from "vexflow";
import { renderNotes } from "./sheets/renderNotes";

class State {
  // Keys (C = 0, C# = 1, ... B = 11)
  public key = 0; // C Dur (C Major)
  public targetKey = 5; // F Dur (F Major)

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
      }
    }

    this.update();
  }

  // Get the degree (0-6) of the first note in the current key
  private getDegreeOfFirstNote(): number {
    if (this.currentNotes.length === 0) return -1;

    // Extrahiere den Buchstaben der ersten Note (ohne Oktave)
    const noteNameWithOctave = this.currentNotes[0].keys[0];
    const noteName = noteNameWithOctave.split("/")[0];

    // C-Dur Tonleiter Stufen (0-basiert): C=0, D=1, E=2, F=3, G=4, A=5, B=6
    const noteToScaleDegree: { [key: string]: number } = {
      c: 0,
      d: 1,
      e: 2,
      f: 3,
      g: 4,
      a: 5,
      b: 6,
    };

    return noteToScaleDegree[noteName];
  }

  // Get the correct note (0-11) in the target key
  private getNoteInTargetKey(): number {
    // Die Stufen in C-Dur (Originaltonart)
    const cMajorDegrees = [0, 2, 4, 5, 7, 9, 11]; // C, D, E, F, G, A, B

    // Die Stufen in F-Dur (Zieltonart), mit F als 0
    const fMajorDegreesRelativeToF = [0, 2, 4, 5, 7, 9, 11]; // F, G, A, Bb, C, D, E

    // Stufe der aktuellen Note in C-Dur
    const degreeInCMajor = this.getDegreeOfFirstNote();

    // Berechne die entsprechende Note in F-Dur (degreeInCMajor gibt die gleiche Position in F-Dur)
    const noteInFMajor =
      (fMajorDegreesRelativeToF[degreeInCMajor] + this.targetKey) % 12;

    return noteInFMajor;
  }

  // Generate four random notes
  public fillNotes() {
    this.currentNotes = [];

    // Füge vier zufällige Noten hinzu
    for (let i = 0; i < 4; i++) {
      this.addNewRandomNote();
    }
  }

  // Add a new random note to the end of the queue
  private addNewRandomNote() {
    const notesInFourthOctave = [
      "c/4",
      "d/4",
      "e/4",
      "f/4",
      "g/4",
      "a/4",
      "b/4",
    ];
    const randomIndex = Math.floor(Math.random() * notesInFourthOctave.length);
    const randomNote = notesInFourthOctave[randomIndex];

    this.currentNotes.push(
      new StaveNote({
        clef: "treble",
        keys: [randomNote],
        duration: "q",
      })
    );
  }

  // Update the state and render notes
  public update() {
    // Render die Noten immer
    renderNotes(this.currentNotes);

    // Aktualisiere den State
    this.onChange.next(this);
  }
}

export const state = new State();
