import React, { Component } from "react";
import * as api from "../utils/api";
import CommentSubmit from "./CommentSubmit";
import CommentCard from "./CommentCard";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentAdded: false,
    commentRemoved: false,
    error: null,
  };

  componentDidMount() {
    this.getAllComments(this.props.articleId)
      .then((comments) => {
        this.setState({
          comments: comments,
          isLoading: !this.state.isLoading,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.commentAdded !== this.state.commentAdded) {
      this.getAllComments(this.props.articleId).then((comments) => {
        this.setState({
          comments: comments,
          isLoading: !this.state.isLoading,
          commentAdded: false,
          commentRemoved: false,
        });
      });
    }
    if (prevState.commentRemoved !== this.state.commentRemoved) {
      this.getAllComments(this.props.articleId).then((comments) => {
        this.setState({
          comments: comments,
          isLoading: !this.state.isLoading,
          commentAdded: false,
          commentRemoved: false,
        });
      });
    }
  }

  commentAdder = () => {
    this.setState({ commentAdded: true });
  };

  commentRemover = () => {
    this.setState({ commentRemoved: true });
  };

  getAllComments = (articleId) => {
    return api.getCommentsByArticleId(articleId);
  };

  updateVote = (vote, commentId) => {
    const copyComments = [...this.state.comments];
    copyComments.forEach((comment) => {
      if (comment.comment_id === commentId) {
        comment.votes += vote;
        this.setState({ comments: copyComments });
      }
    });
  };

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        <CommentSubmit
          articleId={this.props.articleId}
          commentAdder={this.commentAdder}
          user={this.props.user}
        />
        {comments.map((comment) => {
          return (
            <section key={comment.comment_id} className="articleCard">
              <Voter
                key={comment.votes}
                id={comment.comment_id}
                type={"comments"}
                updateVote={this.updateVote}
              />
              <CommentCard
                key={comment.author}
                comment={comment}
                commentRemover={this.commentRemover}
              />
            </section>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Comments;
