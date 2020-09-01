import React, { Component } from "react";
import * as api from "../utils/api";

class CommentSubmit extends Component {
  state = {
    body: "",
    username: "jessjelly",
  };

  componentDidMount() {
    this.setState({ body: "", username: "jessjelly" });
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
            value={this.state.body}
          ></textarea>
          <br />
          <label htmlFor="user">User: </label>
          <input type="text" name="user" id="user" disabled value="jessjelly" />
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default CommentSubmit;
