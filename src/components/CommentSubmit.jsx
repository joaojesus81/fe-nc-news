import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class CommentSubmit extends Component {
  state = {
    body: "",
    username: "happyamy2016",
    commentAdded: null,
  };

  componentDidMount() {
    this.setState({ body: "", username: "happyamy2016" });
  }

  handleChange = (changeEvent) => {
    const { id, value } = changeEvent.target;
    this.setState({ [id]: value });
  };

  postComment = () => {
    api.postCommentToArticle(this.props.articleId, {
      username: this.state.username,
      body: this.state.body,
    });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    this.postComment();
    this.props.commentAdder();
  };

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="body">Comment: </label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            required
            onChange={this.handleChange}
            defaultValue={this.state.body}
          ></textarea>
          <br />
          <label htmlFor="user">User: </label>
          <input
            type="text"
            name="user"
            id="user"
            disabled
            defaultValue="happyamy2016"
          />
          <button>Submit</button>
        </form>
        {this.state.commentAdded !== null && <CommentCard comment />}
      </section>
    );
  }
}

export default CommentSubmit;
