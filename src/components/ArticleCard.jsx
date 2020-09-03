import React, { Component } from "react";
import * as api from "../utils/api";
import Loading from "./Loading";
import Comments from "./ListComments";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";
import * as utils from "../utils/utils";

class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.getArticle(this.props.articleId)
      .then((article) => {
        const singleArticle = article[0];
        this.setState({
          article: singleArticle,
          isLoading: !this.state.isLoading,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.setState({
          error: { status: response.status, msg: response.data.msg },
        });
      });
  }

  updateVote = (vote) => {
    const updatedArticle = { ...this.state.article };
    updatedArticle.votes += vote;
    this.setState({ article: updatedArticle });
  };

  getArticle = (articleId) => {
    return api.getArticleById(articleId);
  };

  render() {
    if (this.state.error !== null)
      return <ErrorPage error={this.state.error} />;
    if (this.state.isLoading) return <Loading />;
    const { title, author, created_at, votes, body } = this.state.article;
    return (
      <main>
        <section className="articleCard">
          <Voter
            id={this.props.articleId}
            type={"articles"}
            updateVote={this.updateVote}
          />
          <h4>{title}</h4>
          <h5>{body}</h5>
          <p>{`Submitted ${utils.dateFormat(created_at)} by ${author}`}</p>
          <p>{`Score: ${votes}`}</p>
        </section>

        <Comments articleId={this.props.articleId} />
      </main>
    );
  }
}

export default ArticleCard;
