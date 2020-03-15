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
    this.state = {
      keys: [],
      autoplay: false,
      chordName: "",
      currentChord: {}
    };
  }

  componentDidMount() {
    this.setChord("C");
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
    return (
      <div className="App">
        <div id="notes">
          <div>
            <ChordInput
              className="chord-input"
              onChordChange={this.cordChanged}
              chord={this.state.chordName}
            ></ChordInput>
          </div>
          <div>
            <Sound keys={this.state.keys}></Sound>
          </div>
          {/* <FlowTest></FlowTest> */}
          <Notes keys={this.state.keys}></Notes>
        </div>
        <div>
          {/* <pre>
            <textarea value={JSON.stringify(this.state.currentChord)} readOnly></textarea>
          </pre> */}
          <ChordInfo chord={this.state.currentChord}></ChordInfo>
        </div>
      </div>
    );
  }
}

export default App;
