import React from "react";
import * as api from "../utils/api";
import Voter from "./Voter";

const CommentCard = (props) => {
  const { body, author, created_at, votes, comment_id } = props.comment;
  const deleteComment = () => {
    return api.deleteComment(comment_id).then(() => {
      props.commentRemover();
    });
  };
  const updateVote = (vote) => {
    const updatedArticle = { ...this.state.article };
    updatedArticle.votes += vote;
    this.setState({ article: updatedArticle });
  };
  return (
    <section key={comment_id} className="articleCard">
      <Voter />
      <p>{`${author} ${votes} votes ${created_at}`}</p>
      <h5>{body}</h5>
      <button onClick={deleteComment}>delete</button>
    </section>
  );
};

export default CommentCard;
