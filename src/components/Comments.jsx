import React, { Component } from "react";
import * as api from "../utils/api";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getAllComments(this.props.id).then((comments) => {
      console.log(comments);
      this.setState({
        comments,
        isLoading: !this.state.isLoading,
      });
    });
  }

  getAllComments = (id) => {
    return api.getCommentsByArticleId(id);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.comments.map((comment) => {
          const { body, author, created_at, votes, comment_id } = comment;
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
        })}
      </React.Fragment>
    );
  }
}

export default Comments;
