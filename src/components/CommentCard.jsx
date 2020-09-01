import React from "react";

const CommentCard = (props) => {
  const { body, author, created_at, votes, comment_id } = props.comment;
  return (
    <section key={comment_id} className="articleCard">
      <p>
        <img
          className="voteArrow"
          src="https://ih1.redbubble.net/image.566557656.6363/ap,550x550,12x16,1,transparent,t.u2.png"
          alt="upvote article"
        />
        <img
          className="voteArrow"
          src="https://ih1.redbubble.net/image.566561202.6466/ap,550x550,12x16,1,transparent,t.u2.png"
          alt="downvote article"
        />
      </p>
      <h5>{body}</h5>
      <p>{`Submitted by ${author} at ${created_at}`}</p>
      <p>{`It is scored at ${votes}`}</p>
    </section>
  );
};

export default CommentCard;
