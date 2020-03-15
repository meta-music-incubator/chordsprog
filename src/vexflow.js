import React from "react";
import Vex from "vexflow";

const VF = Vex.Flow;

/**
 * Familiarise oureslves with Vex.Flow
 */
export class FlowTest extends React.Component {
  constructor(props) {
    super(props);

    this.renderer = null;
    this.stave = null;
    this.currentGroup = null;
  }

  componentDidMount() {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    var div = document.getElementById("content");
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Size our svg:
    renderer.resize(500, 500);

    // And get a drawing context:
    var context = renderer.getContext();
    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    var notes = [
      // A quarter-note C.
      new VF.StaveNote({
        clef: "treble",
        keys: ["c#/4"],
        duration: "q"
      }),

      // A quarter-note D.
      new VF.StaveNote({
        clef: "treble",
        keys: ["d/4"],
        duration: "q"
      }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new VF.StaveNote({
        clef: "treble",
        keys: ["b/4"],
        duration: "qr"
      }),

      // A C-Major chord.
      new VF.StaveNote({
        clef: "treble",
        keys: ["c/4", "eb/4", "g/4"],
        duration: "q"
      })
    ];

    var notes2 = [
      new VF.StaveNote({ clef: "treble", keys: ["c/4"], duration: "w" })
    ];

    var notes3 = [
      new VF.StaveNote({clef: "treble", keys: ["e##/5"], duration: "8d" }).
        addAccidental(0, new VF.Accidental("##")).addDotToAll(),

      new VF.StaveNote({clef: "treble", keys: ["eb/5"], duration: "16" }).
        addAccidental(0, new VF.Accidental("b")),

      new VF.StaveNote({clef: "treble", keys: ["d/5", "eb/4"], duration: "h" }).
        addDot(0),

      new VF.StaveNote({clef: "treble", keys: ["c/5", "eb/5", "g#/5"], duration: "q" }).
        addAccidental(1, new VF.Accidental("b")).
        addAccidental(2, new VF.Accidental("#")).addDotToAll()
  ];


    // Create a voice in 4/4 and add above notes
    var voices = [
      // new VF.Voice({
      //   num_beats: 4,
      //   beat_value: 4
      // }).addTickables(notes),

      // new VF.Voice({
      //   num_beats: 4,
      //   beat_value: 4
      // }).addTickables(notes2),

      new VF.Voice({
        num_bats: 4,
        beat_value: 4
      }).addTickables(notes3)
    ];

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices(voices).format(voices, 400);

    // Render voices
    voices.forEach(function(v) {
      v.draw(context, stave);
    });
  }

  componentDidUpdate(nextProps) {
    // this._renderNotes();
  }

  _renderNotes = () => {
    // if (!this.props.keys || this.props.keys.length < 1) {
    //   return;
    // }
    // if (!this.stave) {
    //   return;
    // }
    // const context = this.renderer.getContext();
    // if (this.currentGroup) {
    //   context.svg.removeChild(this.currentGroup);
    // }
    // // const keys = ["c/4", "e/4", "g/4"];
    // // Map chord notes to keys:
    // const keys = this.props.keys.map(key => key.toLowerCase() + "/4");
    // console.log("about to render", keys);
    // // Open a group to hold all the SVG elements in the measure:
    // this.currentGroup = context.openGroup();
    // // . addAccidental(1, new VF.Accidental("b"))
    // var notes = [
    //   new VF.StaveNote({
    //     clef: "treble",
    //     keys: ["eb/4"],
    //     duration: "h"
    //   }),
    //   new VF.StaveNote({
    //     clef: "treble",
    //     keys: ["eb/4"],
    //     duration: "h"
    //   })
    // ];
    // console.log(keys);
    // console.log(notes);
    // // Create a voice in 4/4 and add above notes
    // var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    // voice.addTickables(notes);
    // // Format and justify the notes to 400 pixels.
    // new VF.Formatter().joinVoices([voice]).format([voice], 400);
    // // Render voice
    // voice.draw(context, this.stave);
    // // Then close the group:
    // context.closeGroup();
  };

  render() {
    return (
      <div>
        <h2>Flowdemo</h2>
        <div id="content"></div>
      </div>
    );
  }
}
