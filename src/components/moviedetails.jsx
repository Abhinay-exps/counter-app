import React, { Component } from "react";
class MovieDetails extends Component {
  state = {};
  handleSave = () => {
    return this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <div>Movie Form {this.props.match.params.id}</div>
        <button className="btn btn-primary btn-save" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
