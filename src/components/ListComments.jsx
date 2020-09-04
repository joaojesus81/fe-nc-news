import React, { Component } from "react";
import * as api from "../utils/api";
import CommentSubmit from "./CommentSubmit";
import CommentCard from "./CommentCard";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
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
      .catch(({ response }) => {
        this.setState({
          error: { status: response.status, msg: response.data.msg },
        });
      });
  }

  addComment = (newComment) => {
    this.setState((currentState) => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  removeComment = (idComment) => {
    this.state.comments.forEach((comment, index) => {
      if (comment.comment_id === idComment) {
        this.setState((currentState) => {
          currentState.comments.splice(index, 1);
          return { comments: [...currentState.comments] };
        });
      }
    });
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
    const { comments, error, isLoading } = this.state;
    const { articleId, user } = this.props;
    if (error !== null) return <ErrorPage error={error} />;
    if (isLoading) return <Loading />;
    return (
      <React.Fragment>
        {this.props.user ? (
          <CommentSubmit
            comments={comments}
            articleId={articleId}
            addComment={this.addComment}
            user={user}
          />
        ) : (
          <p>You must sign in to comment</p>
        )}
        {comments.map((comment) => {
          return (
            <section key={comment.comment_id} className="commentCard">
              <Voter
                id={comment.comment_id}
                type={"comments"}
                updateVote={this.updateVote}
                user={this.props.user}
              />
              <CommentCard
                user={this.props.user}
                key={comment.author}
                comment={comment}
                removeComment={this.removeComment}
              />
            </section>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Comments;
