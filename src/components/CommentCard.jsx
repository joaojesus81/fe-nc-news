import React from "react";
import * as api from "../utils/api";

const CommentCard = (props) => {
  const { body, author, created_at, votes, comment_id } = props.comment;
  const deleteComment = () => {
    return api.deleteComment(comment_id).then(() => {
      props.commentRemover();
    });
  };

  return (
    <React.Fragment>
      <p>{`${author} ${votes} votes ${created_at}`}</p>
      <h5>{body}</h5>
      <button onClick={deleteComment}>delete</button>
    </React.Fragment>
  );
};

export default CommentCard;
