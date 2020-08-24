import {
  PostTitle,
  PostContent,
  ScrapboxBibliographicInformation,
} from "../src/Post";
import { BibInfo } from "../src/bibInfo/bibInfo";

test("Valid post title is created", () => {
  const title = new PostTitle("sample");
  const expectedTitle: PostTitle = {
    title: "sample",
  };
  expect(title).toEqual(expectedTitle);
});

test("Empty title must not be created", () => {
  expect(() => new PostTitle("")).toThrow(
    Error("Scrapbox page title must not be empty.")
  );
});

test("Valid post content is created from bibliographic information", () => {
  const bibInfo: BibInfo = {
    title: "sampleProductTitle",
    isbn: "sampleAsin",
    publishInfo: {
      publisher: "samplePublisher",
      publishDate: "2020/1/1",
    },
    description: `sampleDescription1
sampleDescription2
sampleDescription3`,
    imageUrl: "sampleImageUrl",
    authorsInfo: [
      {
        author: "author1",
        contribution: "(contribution1)",
      },
      {
        author: "author2",
        contribution: "(contribution2)",
      },
    ],
    sourceUrl: "sampleCurrentUrl",
  };
  const sampleScrapboxInfo = new ScrapboxBibliographicInformation(bibInfo);
  const samplePostContent = new PostContent(sampleScrapboxInfo.scrapboxInfo);

  const expectedContent = `[sampleImageUrl sampleCurrentUrl]
[author1](contribution1) [author2](contribution2)
出版社: [samplePublisher] ([2020/1]/1)
ISBN/ASIN: sampleAsin
>sampleDescription1
>sampleDescription2
>sampleDescription3
#本
`;

  expect(samplePostContent.content).toBe(expectedContent);
});
