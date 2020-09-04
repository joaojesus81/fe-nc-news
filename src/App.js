import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ListArticles from "./components/ListArticles";
import ArticleCard from "./components/ArticleCard";
import Comments from "./components/ListComments";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = {
    user: null,
  };

  userLogin = () => {
    this.setState({ user: "happyamy2016" });
  };

  userLogout = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.user}
          userLogin={this.userLogin}
          userLogout={this.userLogout}
        />
        <Nav />
        <Router>
          <ListArticles user={this.state.user} path="/" />
          <ListArticles user={this.state.user} path="/:topic" />
          <ArticleCard user={this.state.user} path="/article/:articleId">
            <Comments path="/" />
          </ArticleCard>
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
