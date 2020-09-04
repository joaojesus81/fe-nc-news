import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = {
    userVote: 0,
  };
  updateVote = (vote) => {
    api.patchVotes(vote, this.props.type, this.props.id);
    this.props.updateVote(vote, this.props.id);
    this.setState((currentState) => {
      return { userVote: currentState.userVote + vote };
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.user && (
          <button
            className="upVote"
            onClick={(event) => {
              this.updateVote(1);
            }}
            disabled={this.state.userVote === 1 ? true : false}
          >
            ⍓
          </button>
        )}
        {this.props.user && (
          <button
            className="downVote"
            onClick={() => {
              this.updateVote(-1);
            }}
            disabled={this.state.userVote === -1 ? true : false}
          >
            ⍌
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default Voter;
