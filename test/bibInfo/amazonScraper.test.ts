import { AmazonScraper } from "../../src/bibInfo/amazonScraper";
import { AuthorInfo, PublishInfo } from "../../src/bibInfo/bibInfo";

test("Scrape title", () => {
  const dom = `<span id="productTitle" class="a-size-extra-large">
  testTitle
</span>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  expect(scraper.scrapeProductTitle()).toBe("testTitle");
});

test("Scrape Ebook asin", () => {
  const dom = `<input type="hidden" name="ASIN.0" value="1234567890">
<input type="hidden" name="ASIN.0" value="1234567890">
<input type="hidden" name="ASIN.0" value="1234567890">`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  expect(scraper.scrapeEbookAsin()).toBe("1234567890");
});

test("Scrape Ebook publish info", () => {
  // Real dom is here but on jsdom document.getElementById.textContent for table
  // doesn't work...
  //
  //   const dom = `<table id="productDetailsTable">
  //   <tbody>
  //     <tr>
  //       <td>
  //         <ul>
  //           <li><b>フォーマット：</b> Kindle版</li>
  //           <li><b>ファイルサイズ：</b> 1044 KB</li>
  //           <li><b>推定ページ数：</b> 350 ページ</li>
  //           <li><b>出版社:</b> testPublisher (2020/1/1)</li>
  //         </ul>
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>`;

  const dom = `<div id="detailBullets_feature_div">
<li><span class="a-list-item">
<span class="detail-bullet-label a-text-bold">ファイルサイズ
:
</span>
<span>7166 KB</span>
</span></li>
<li><span class="a-list-item">
<span class="detail-bullet-label a-text-bold">出版社
:
</span>
<span>testPublisher (2020/1/1)</span>
</span></li>
<li><span class="a-list-item">
<span class="detail-bullet-label a-text-bold">推定ページ数
:
</span>
<span>435ページ</span>
</span></li>
<li><span class="a-list-item">
<span class="detail-bullet-label a-text-bold">Word Wise
:
</span>
<span>有効にされていません</span>
</span></li>
</div>`;

  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  const expectedPublishInfo: PublishInfo = {
    publisher: "testPublisher",
    publishDate: "2020/1/1",
  };
  expect(scraper.scrapeEbookPublishInfo()).toEqual(expectedPublishInfo);
});

// Real dom is here but on jsdom document.getElementById.textContent for iframe
// doesn't work...
//
// test("Scrape description", () => {
//   const dom = `<iframe id="bookDesc_iframe">
//   #document
//     <html>
//       <head></head>
//       <body>
//         <div iframeContent>
//           sampleDiscription1
//           sampleDiscription2
//           sampleDiscription3
//         </div>
//       </body>
//     </html>
// </iframe>`;
//   document.body.innerHTML = dom;
//
//   const scraper = new AmazonScraper();
//   expect(scraper.scrapeDescription()).toBe(`sampleDescription1
// sampleDescription2
// sampleDescription3`);
// });

test("Scrape empty description", () => {
  const dom = `<div></div>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  expect(scraper.scrapeDescription()).toBe(``);
});

// Real dom is here but on jsdom document.getElementById for img
// doesn't work...
//
// test("Scrape Ebook image URL", () => {
//   const dom = `<img src="testImageUrl" id="ebooksImgBlkFront">`;
//   document.body.innerHTML = dom;

//   const scraper = new AmazonScraper();
//   expect(scraper.scrapeEbookAsin()).toBe("testImageUrl");
// });

test("Scrape current URL", () => {
  const scraper = new AmazonScraper();
  expect(scraper.scrapeCurrentUrl()).toBe("http://localhost/");
});

test("Scrape authors info", () => {
  const dom = `<span class="author notFaded">
  <span>testAuthor1
    <span class="a-color-secondary">(testContribution1)</span>
  </span>
  <a>testAuthor1のAmazon著者ページを見る</a>
  <a>検索結果</a>
  <a></a>
  <a>testAuthor1</a>
  <a></a>
  <span class="contribution">
    <span class="a-color-secondary">(contribution1), </span>
  </span>
</span>

<span class="author notFaded">
  <a>testAuthor2</a>
  <span class="contribution">
    <span class="a-color-secondary">(testContribution2)</span>
  </span>
</span>

`;
  document.body.innerHTML = dom;

  const expectedAuthors: AuthorInfo[] = [
    {
      author: "testAuthor1",
      contribution: "(testContribution1)",
    },
    {
      author: "testAuthor2",
      contribution: "(testContribution2)",
    },
  ];

  const scraper = new AmazonScraper();
  expect(scraper.scrapeAuthorsInfo()).toEqual(expectedAuthors);
});

test("Scrape paper book asin", () => {
  const dom = `<div id="ASIN" value="testPaperBookAsin"></div>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  expect(scraper.scrapePaperBookAsin()).toBe("testPaperBookAsin");
});

test("Scrape paper book image url", () => {
  const dom = `<div id="imgBlkFront" src="testPaperBookImageUrl"></div>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  expect(scraper.scrapePaperBookImageUrl()).toBe("testPaperBookImageUrl");
});

test("Scrape paper book publish info", () => {
  const dom = `<div id="detailBulletsWrapper_feature_div">
<ul>
<li><span class="a-list-item">
<span class="detail-bullet-label a-text-bold">出版社
:
</span>
<span>testPaperBookPublisher (2020/1/1)</span>
</span></li>
</ul>
</div>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  const expectedPublishInfo: PublishInfo = {
    publisher: "testPaperBookPublisher",
    publishDate: "2020/1/1",
  };
  expect(scraper.scrapePaperBookPublishInfo()).toEqual(expectedPublishInfo);
});
