import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ListArticles from "./components/ListArticles";
import ArticleCard from "./components/ArticleCard";
import Comments from "./components/ListComments";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <ListArticles path="/" />
        <ListArticles path="/:topic" />
        <ArticleCard path="/article/:articleId">
          <Comments path="/" />
        </ArticleCard>
      </Router>
    </div>
  );
}

export default App;
