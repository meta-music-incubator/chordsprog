import React from "react";
export class ChordInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { value: this.props.chord };
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button>Set</button>
      </form>
    );
  }
}
