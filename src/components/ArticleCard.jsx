import React, { Component } from "react";
import * as api from "../utils/api";
import Loading from "./Loading";
import Comments from "./Comments";

class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  componentDidMount() {
    this.getArticle(this.props.id).then((article) => {
      const singleArticle = article[0];
      this.setState({
        article: singleArticle,
        isLoading: !this.state.isLoading,
      });
    });
  }

  getArticle = (id) => {
    return api.getArticleById(id);
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      const {
        title,
        author,
        created_at,
        comment_count,
        votes,
        body,
      } = this.state.article;
      return (
        <React.Fragment>
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
            <h5>{body}</h5>
            <p>{`Submitted by ${author} at ${created_at}`}</p>
            <p>{`It has ${comment_count} comments and is scored at ${votes}`}</p>
          </section>
          <Comments id={this.props.id} />
        </React.Fragment>
      );
    }
  }
}

export default ArticleCard;
