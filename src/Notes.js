import React from "react";
import Vex from "vexflow";

const VF = Vex.Flow;

export class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.renderer = null;
    this.stave = null;
    this.currentGroup = null;
  }

  componentDidMount() {

    // Create an SVG renderer and attach it to the DIV element named "boo".
    var div = document.getElementById("content");
    this.renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Size our svg:
    this.renderer.resize(500, 500);

    // And get a drawing context:
    const context = this.renderer.getContext();
    context.scale(3, 3);

    // Create a stave at position 10, 40 of width 400 on the canvas.
    this.stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    this.stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    this.stave.setContext(context).draw();

    this._renderNotes();

  }

  componentDidUpdate(nextProps) {
    this._renderNotes();
  }

  _renderNotes = () => {
    if (!this.props.keys || this.props.keys.length < 1) {
      return;
    }

    if (!this.stave) {
      return;
    }

    const context = this.renderer.getContext();

    if (this.currentGroup) {
      context.svg.removeChild(this.currentGroup);
    }

    // const keys = ["c/4", "e/4", "g/4"];
    // Map chord notes to keys:
    const keys = this.props.keys.map(key => key.toLowerCase() + "/4");
    console.log("about to render", keys);

    // Open a group to hold all the SVG elements in the measure:
    this.currentGroup = context.openGroup();


    // . addAccidental(1, new VF.Accidental("b"))
    var notes = [
      new VF.StaveNote({
        clef: "treble",
        keys: keys,
        duration: "w"
      })
    ];

    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, this.stave);

    // Then close the group:
    context.closeGroup();
  }

  render() {
    return (
      <div>
        <h2>{this.props.keys}</h2>
        <div id="content"></div>
      </div>
    );
  }
}
