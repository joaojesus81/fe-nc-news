import React, { Component } from "react";
import * as api from "../utils/api";
import Loading from "./Loading";

class CommentSubmit extends Component {
  state = {
    body: "",
    username: this.props.user,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments.length !== this.props.comments.length) {
      this.setState({ body: "", isLoading: false });
    }
  }

  handleChange = (changeEvent) => {
    const { id, value } = changeEvent.target;
    this.setState({ [id]: value });
  };

  postComment = () => {
    return api.postCommentToArticle(this.props.articleId, {
      username: this.state.username,
      body: this.state.body,
    });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    this.setState({ isLoading: true });
    return this.postComment().then((response) => {
      this.props.addComment(response);
    });
  };

  render() {
    if (this.state.isLoading) return <Loading />;
    return (
      <section>
        <form className="submitComment" onSubmit={this.handleSubmit}>
          <label className="userLabel" htmlFor="user">
            User:{" "}
          </label>
          <input
            className="userInput"
            type="text"
            name="user"
            id="user"
            disabled
            defaultValue="happyamy2016"
          />
          <label className="textLabel" htmlFor="body">
            Comment:{" "}
          </label>
          <textarea
            className="textArea"
            name="body"
            id="body"
            cols="30"
            rows="10"
            required
            onChange={this.handleChange}
            value={this.state.body}
          ></textarea>
          <button className="subButton">Submit</button>
        </form>
      </section>
    );
  }
}

export default CommentSubmit;
