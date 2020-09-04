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
    const { title, author, created_at, votes, body } = this.state.article;
    const { user, articleId } = this.props;
    if (this.state.error !== null)
      return <ErrorPage error={this.state.error} />;
    if (this.state.isLoading) return <Loading />;
    return (
      <main>
        <section className="indArticleCard">
          {!user && <p className="signIn">You must sign in to vote</p>}
          <Voter
            id={articleId}
            type={"articles"}
            updateVote={this.updateVote}
            user={user}
          />
          <p className="noVotes">{`${votes}`}</p>
          <h4 className="cardHeader">{title}</h4>
          <p className="bodyP">{body}</p>
          <p className="subP">{`Submitted ${utils.dateFormat(
            created_at
          )} by ${author}`}</p>
        </section>

        <Comments user={user} articleId={articleId} />
      </main>
    );
  }
}

export default ArticleCard;
