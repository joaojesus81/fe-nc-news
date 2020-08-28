import axios from "axios";

const homeInstance = axios.create({ baseURL: "http://192.168.1.22/api" });
// const herokuInstance = axios.create({
//   baseURL: "https://fox-fake-news.herokuapp.com/api",
// });
// const awayFromHomeInstance = axios.create({
//   baseURL: "http://sweetpeads.ddns.net/api",
// });

export const getArticles = (topic) => {
  return homeInstance
    .get("/articles", { params: { topic: topic } })
    .then((articles) => {
      return articles.data.articles;
    });
};

export const getTopics = () => {
  return homeInstance.get("/topics").then((topics) => {
    return topics.data.topics;
  });
};

export const getArticleById = (id) => {
  return homeInstance.get(`/articles/${id}`).then((article) => {
    return article.data.article;
  });
};

export const getCommentsByArticleId = (id) => {
  return homeInstance.get(`/articles/${id}/comments`).then((article) => {
    return article.data.article;
  });
};

export const getArticlesSorted = (sort_by, order, topic) => {
  return homeInstance
    .get(`/articles?sort_by=${sort_by}&order=${order}`, {
      params: { topic: topic },
    })
    .then((articles) => {
      return articles.data.articles;
    });
};
