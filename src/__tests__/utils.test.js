const { dateFormat } = require("../utils/utils");

describe("dateFormat", () => {
  it("should return empty for an empty string", () => {
    expect(dateFormat("")).toBe("");
  });
  it("should return certain number years ago", () => {
    const postDate = "2018-07-03T04:32:28.514Z";
    expect(dateFormat(postDate)).toBe("2 years ago");
  });
  it("should return certain number months ago", () => {
    const postDate = "2020-07-03T04:32:28.514Z";
    expect(dateFormat(postDate)).toBe("2 months ago");
  });
  it("should return certain number months ago", () => {
    const postDate = "2020-08-01T04:32:28.514Z";
    expect(dateFormat(postDate)).toBe("1 month ago");
  });
  it("should return certain number days ago", () => {
    const postDate = "2020-09-01T04:32:28.514Z";
    expect(dateFormat(postDate)).toBe("2 days ago");
  });
  it("should return certain number hours ago", () => {
    const postDate = "2020-09-03T10:10:28.514Z";
    expect(dateFormat(postDate)).toBe("a few moments ago");
  });
});
