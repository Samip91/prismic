const path = require("path");
const fs = require("fs");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const customTypeModels = fs
  .readdirSync("customtypes", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) =>
    require(path.resolve("customtypes", entry.name, "index.json"))
  );

const sharedSliceModels = fs
  .readdirSync(path.join("src", "slices"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) =>
    require(path.resolve("src", "slices", entry.name, "model.json"))
  );

const routes = [
  {
    type: "article",
    path: "/articles/:uid",
  },
  {
    type: "page",
    path: "/:uid",
  },
];

module.exports = {
  siteMetadata: {
    title: `Blog`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  jsxRuntime: "automatic",
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        customTypeModels,
        sharedSliceModels,
        routes,
      },
    },
    {
      resolve: "gatsby-plugin-prismic-previews",
      options: {
        repositoryName: "nextjs-starter-prismic-blog",
        routes,
      },
    },
  ],
};
