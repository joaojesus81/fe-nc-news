import React, { Component } from "react";
import * as api from "../utils/api";
import Loading from "./Loading";
import Comments from "./ListComments";
import Voter from "./Voter";

class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  componentDidMount() {
    this.getArticle(this.props.articleId).then((article) => {
      const singleArticle = article[0];
      this.setState({
        article: singleArticle,
        isLoading: !this.state.isLoading,
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
    if (this.state.isLoading) {
      return <Loading />;
    } else {
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
            <p>{`Submitted by ${author} at ${created_at}`}</p>
            <p>{`Score: ${votes}`}</p>
          </section>

          <Comments articleId={this.props.articleId} />
        </main>
      );
    }
  }
}

export default ArticleCard;
