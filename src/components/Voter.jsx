import React from "react";
import * as api from "../utils/api";

const Voter = (props) => {
  const updateVote = (vote) => {
    api.patchVotes(vote, props.type, props.id);
    props.updateVote(vote, props.id);
  };
  return (
    <p>
      <button
        onClick={(event) => {
          updateVote(1);
        }}
      >
        ⍓
      </button>
      <br />
      <button
        onClick={() => {
          updateVote(-1);
        }}
      >
        ⍌
      </button>
    </p>
  );
};

export default Voter;
