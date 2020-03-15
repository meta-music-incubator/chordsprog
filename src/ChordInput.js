import React from "react";
export class ChordInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { value: this.props.chord };
    this.chords = ["cmaj7", "dmaj7", "cmin7", "a", "amin", "amaj7"];
  }

  componentDidMount() {}

  componentDidUpdate(nextProps) {}

  handleSubmit(event) {
    this.props.onChordChange(this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  setChord(chordName) {
    this.setState((state, props) => ({
      ...state,
      value: chordName
    }));
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
      <div>
        Enter chord:
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>Set</button>
        </form>
        Or try these:
        {chordsList}
      </div>
    );
  }
}
