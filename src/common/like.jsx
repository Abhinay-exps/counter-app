import React, { Component } from "react";
class Like extends Component {
  state = {};
  render() {
    const getclasses = this.props.liked ? "fa fa-heart" : "fa fa-heart-o";
    return (
      <i
        className={getclasses}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
