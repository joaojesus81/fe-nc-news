import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Nav extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    this.fetchTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  fetchTopics = () => {
    return api.getTopics();
  };

  render() {
    const { topics } = this.state;
    return (
      <nav>
        <ul className="navBar">
          <Link to="/">
            <li>NEWS</li>
          </Link>
          {topics.map(({ slug }) => {
            return (
              <Link key={slug} to={slug}>
                <li>{slug.toUpperCase()}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
