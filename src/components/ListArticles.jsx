import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import SortingMenu from "./SortingMenu";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";

class ListArticles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortingOptions: "date",
    order: "desc",
    error: null,
  };

  componentDidMount() {
    this.fetchArticles(this.props.topic)
      .then((articles) => {
        this.setState({
          articles,
          isLoading: !this.state.isLoading,
        });
      })
      .catch(({ response }) => {
        console.dir(response);
        this.setState({
          error: { status: response.status, msg: response.data.msg },
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortingOptions !== this.state.sortingOptions) {
      this.setState({ isLoading: true });
      this.fetchArticlesSorted(
        this.state.sortingOptions,
        this.state.order,
        this.props.topic
      )
        .then((articles) => {
          this.setState({ articles, isLoading: false });
        })
        .catch(({ response }) => {
          console.dir(response);
          this.setState({
            error: { status: response.status, msg: response.data.msg },
          });
        });
    }
    if (prevProps.topic !== this.props.topic) {
      this.setState({ isLoading: true });
      this.fetchArticles(this.props.topic)
        .then((articles) => {
          this.setState({ articles, isLoading: false });
        })
        .catch(({ response }) => {
          console.dir(response);
          this.setState({
            error: { status: response.status, msg: response.data.msg },
          });
        });
    }
  }

  setSortingBy = (sortingOrder) => {
    this.setState({ sortingOptions: sortingOrder });
  };

  fetchArticlesSorted = (sort_by, order, topic) => {
    if (sort_by === "comments") {
      return api.getArticlesSorted("comment_count", order, topic);
    } else if (sort_by === "date") {
      return api.getArticlesSorted("created_at", order, topic);
    } else {
      return api.getArticlesSorted(sort_by, order, topic);
    }
  };

  fetchArticles = (topic) => {
    return api.getArticles(topic);
  };

  updateVote = (vote, articleId) => {
    const copyArticles = [...this.state.articles];
    copyArticles.forEach((article) => {
      if (article.article_id === articleId) {
        article.votes += vote;
        this.setState({ articles: copyArticles });
      }
    });
  };

  render() {
    const { articles } = this.state;
    if (this.state.error !== null)
      return <ErrorPage error={this.state.error} />;
    if (this.state.isLoading) return <Loading />;
    return (
      <main>
        <SortingMenu
          setSortingBy={this.setSortingBy}
          sortingOptions={this.state.sortingOptions}
        />
        <ul className="mainList">
          {articles.map((article) => {
            const {
              article_id,
              title,
              author,
              created_at,
              topic,
              comment_count,
              votes,
            } = article;
            return (
              <li key={title}>
                <section className="articleCard">
                  <Voter
                    id={article_id}
                    type={"articles"}
                    updateVote={this.updateVote}
                  />
                  <Link to={`/article/${article_id}`}>
                    <h4>{title}</h4>
                  </Link>
                  <p>{`Submitted by ${author} about ${topic} at ${created_at}`}</p>
                  <p>{`It has ${comment_count} comments and is scored at ${votes}`}</p>
                </section>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

export default ListArticles;
