import { useStaticQuery, graphql } from "gatsby";

export const useLatestArticles = () => {
  const queryData = useStaticQuery(graphql`
    query LatestArticles {
      allPrismicArticle(
        sort: { fields: [data___publishDate], order: DESC }
        limit: 3
      ) {
        nodes {
          _previewable
          url

          data {
            title {
              text
            }
            publishDate(formatString: "MMM D, YYYY")
          }
        }
      }
    }
  `);

  return queryData.allPrismicArticle.nodes;
};
