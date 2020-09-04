import React from "react";
import * as api from "../utils/api";
import * as utils from "../utils/utils";

const CommentCard = (props) => {
  const { body, author, created_at, votes, comment_id } = props.comment;
  const deleteComment = () => {
    return api.deleteComment(comment_id).then(() => {
      props.removeComment(comment_id);
    });
  };

  return (
    <React.Fragment>
      <p className="noVotes">{votes}</p>
      <p className="subP">{`Submitted ${utils.dateFormat(
        created_at
      )} by ${author}`}</p>
      <p className="bodyP">{body}</p>
      {props.user === author && (
        <button className="delButton" onClick={deleteComment}>
          Delete
        </button>
      )}
    </React.Fragment>
  );
};

export default CommentCard;
