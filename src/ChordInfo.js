import React from "react";

export class ChordInfo extends React.Component {
  constructor(props) {
    super(props);
    this.chord = props.chord;
  }
  render() {
    return (
      <dl className="chordDl">
        <dt>Name</dt>
        <dd>{this.props.chord.name}</dd>
        <dt>Type</dt>
        <dd>{this.props.chord.type}</dd>
        <dt>chroma</dt>
        <dd>{this.props.chord.chroma}</dd>
        <dt>normalized</dt>
        <dd>{this.props.chord.normalized}</dd>
        <dt>Tonic</dt>
        <dd>{this.props.chord.tonic}</dd>
        <dt>intervals</dt>
        <dd>{(this.props.chord.intervals || []).join(',')}</dd>
        <dt>aliases</dt>
        <dd>{(this.props.chord.aliases || []).join(',')}</dd>
        <dt>Notes</dt>
        <dd>{(this.props.chord.notes || []).join(',')}</dd>
      </dl>
    );
  }
}

