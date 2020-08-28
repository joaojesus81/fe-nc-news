import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import SortingMenu from "./SortingMenu";

class ListArticles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortingOptions: "date",
    order: "desc",
  };

  componentDidMount() {
    this.fetchArticles(this.props.topic).then((articles) => {
      this.setState({
        articles,
        isLoading: !this.state.isLoading,
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
      ).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
    if (prevProps.topic !== this.props.topic) {
      this.setState({ isLoading: true });
      this.fetchArticles(this.props.topic).then((articles) => {
        this.setState({ articles, isLoading: false });
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

  render() {
    const { articles } = this.state;
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
                <Link to={`/article/${article_id}`}>
                  <section className="articleCard">
                    <p>
                      <img
                        className="voteArrow"
                        src="https://ih1.redbubble.net/image.566557656.6363/ap,550x550,12x16,1,transparent,t.u2.png"
                        alt="upvote article"
                      />
                      <img
                        className="voteArrow"
                        src="https://ih1.redbubble.net/image.566561202.6466/ap,550x550,12x16,1,transparent,t.u2.png"
                        alt="downvote article"
                      />
                    </p>
                    <h4>{title}</h4>
                    <p>{`Submitted by ${author} about ${topic} at ${created_at}`}</p>
                    <p>{`It has ${comment_count} comments and is scored at ${votes}`}</p>
                  </section>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

export default ListArticles;
