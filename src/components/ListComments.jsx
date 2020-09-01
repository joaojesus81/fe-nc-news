import React, { Component } from "react";
import * as api from "../utils/api";
import CommentSubmit from "./CommentSubmit";
import CommentCard from "./CommentCard";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentAdded: false,
    commentRemoved: false,
  };

  componentDidMount() {
    this.getAllComments(this.props.articleId).then((comments) => {
      this.setState({
        comments: comments,
        isLoading: !this.state.isLoading,
      });
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

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        <CommentSubmit
          articleId={this.props.articleId}
          commentAdder={this.commentAdder}
        />
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              commentRemover={this.commentRemover}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Comments;
