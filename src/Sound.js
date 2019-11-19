import React from "react";
import Tone from "tone";

export class Sound extends React.Component {
  constructor(props) {
    super(props);

    //a polysynth composed of 6 Voices of Synth
    this.synth = new Tone.PolySynth(8, Tone.Synth, {
      oscillator: {
        type: "square"
      }
    }).toMaster();

  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if(this.props.autoplay) {
      this.play();
    }
  }

  render() {
    return (
      <div>
        {this.props.keys}
        <button onClick={this.play}>Play Test Tone</button>
      </div>
    );
  }

  play = () => {
    const notes = this.props.keys.map(key => key + '4');
    //play a chord
    this.synth.triggerAttackRelease(notes, "4n");
  };
}
