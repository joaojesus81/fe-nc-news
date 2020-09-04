import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import SortingMenu from "./SortingMenu";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";
import * as utils from "../utils/utils";
import Pagination from "./Pagination";

class ListArticles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortingOptions: "date",
    order: "desc",
    error: null,
    currentPage: 1,
    articlesPerPage: 5,
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

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  changeArticlesPerPage = (numberArticles) => {
    this.setState({ articlesPerPage: numberArticles });
  };

  render() {
    const {
      articles,
      error,
      isLoading,
      sortingOptions,
      currentPage,
      articlesPerPage,
    } = this.state;
    const { user } = this.props;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
    if (error !== null) return <ErrorPage error={error} />;
    if (isLoading) return <Loading />;
    return (
      <main>
        <SortingMenu
          setSortingBy={this.setSortingBy}
          sortingOptions={sortingOptions}
          changeArticlesPerPage={this.changeArticlesPerPage}
        />
        <Pagination
          articlesPerPage={articlesPerPage}
          totalArticles={articles.length}
          paginate={this.paginate}
          currentPage={currentPage}
        />
        <ul className="mainList">
          {currentArticles.map((article) => {
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
                  {!user && <p className="signIn">You must sign in to vote</p>}
                  <Voter
                    id={article_id}
                    type={"articles"}
                    updateVote={this.updateVote}
                    user={user}
                  />
                  <p className="noVotes">{votes}</p>
                  <Link className="cardHeader" to={`/article/${article_id}`}>
                    <h4>{title}</h4>
                  </Link>
                  <p className="subP">{`Submitted ${utils.dateFormat(
                    created_at
                  )} by ${author} about ${topic}`}</p>
                  <Link className="comP" to={`/article/${article_id}`}>
                    <p>{`${comment_count} comments`}</p>
                  </Link>
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
