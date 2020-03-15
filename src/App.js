import React from "react";
import "./App.css";
import { Notes } from "./Notes";
import { Sound } from "./Sound";
import { FlowTest } from "./vexflow";
import { ChordInput } from "./ChordInput";
import { ChordInfo } from "./ChordInfo";
import { chord } from "@tonaljs/chord";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.chords = ["cmaj7", "dmaj7", "cmin7", "a", "amaj", "amin"];
    this.state = {
      keys: [],
      autoplay: false,
      chordName: "",
      currentChord: {}
    };
  }

  componentDidMount() {
    this.setChord(this.chords[0]);
  }

  setChord(chordName) {
    const currentChord = chord(chordName);
    this.setState((state, props) => ({
      ...state,
      chordName,
      currentChord,
      keys: currentChord.notes
    }));
  }

  cordChanged = (chordName) => {
    this.setChord(chordName);
  }

  render() {
    const chordsList = this.chords
      .map((chName, i) => ({ name: chName, key: chName + i }))
      .map(ch => (
        <button
          className="chordSelect"
          onClick={e => this.setChord(ch.name)}
          key={ch.key}
        >
          {ch.name}
        </button>
      ));

    return (
      <div className="App">
        {chordsList}
        <div id="notes">
          <Sound keys={this.state.keys}></Sound>
          <FlowTest></FlowTest>
          <Notes keys={this.state.keys}></Notes>
        </div>
        <div>
          <pre>
            <textarea value={JSON.stringify(this.state.currentChord)} readOnly></textarea>
          </pre>
          <ChordInfo chord={this.state.currentChord}></ChordInfo>
        </div>
        {/* <div>
          <ChordInput className="chord-input"
            onChordChange={this.cordChanged}
            chord={this.state.chordName}
          ></ChordInput>
        </div> */}
      </div>
    );
  }
}

export default App;
