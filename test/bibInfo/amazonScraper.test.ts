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
  const dom = `<div id="detailBullets_feature_div" class="celwidget" data-feature-name="detailBullets" data-csa-c-id="wg3msw-mazb3p-xojpob-8e8j9v" data-cel-widget="detailBullets_feature_div">
<style type="text/css">
.detail-bullets-wrapper ul.detail-bullet-list {
margin: 0 0 1px 18px;
}
.detail-bullets-wrapper ul li {
margin-bottom: 5.5px;
}
.detail-bullets-wrapper:last-child {
margin-bottom: 4.5px;
}
</style>
<div id="detailBulletsWrapper_feature_div" data-feature-name="detailBullets" data-template-name="detailBullets" class="a-section feature detail-bullets-wrapper bucket" data-cel-widget="detailBulletsWrapper_feature_div">
<hr aria-hidden="true" class="a-divider-normal bucketDivider">
<h2>登録情報
</h2>
<span class="disclaim">
</span>
<div id="detailBullets_feature_div">
<ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">
<li><span class="a-list-item">
<span class="a-text-bold">ASIN
‏
:
‎
</span>
<span>B00OKC23LI</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">出版社
‏
:
‎
</span>
<span>testPublisher (2020/1/1)</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">発売日
‏
:
‎
</span>
<span>2011/10/12</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">言語
‏
:
‎
</span>
<span>日本語</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">ファイルサイズ
‏
:
‎
</span>
<span>10510 KB</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">Text-to-Speech（テキスト読み上げ機能）
‏
:
‎
</span>
<span>有効</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">X-Ray
‏
:
‎
</span>
<span>有効にされていません</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">Word Wise
‏
:
‎
</span>
<span>有効にされていません</span>
</span></li>
<li><span class="a-list-item">
<span class="a-text-bold">本の長さ
‏
:
‎
</span>
<span>221ページ</span>
</span></li>
</ul>
</div>
<ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">
<li><span class="a-list-item">
<span class="a-text-bold">
Amazon 売れ筋ランキング:
</span>
  - 47,078位Kindleストア (<a href="/gp/bestsellers/digital-text/ref=pd_zg_ts_digital-text">の売れ筋ランキングを見るKindleストア</a>)
<ul class="a-unordered-list a-nostyle a-vertical zg_hrsr">
<li><span class="a-list-item">  - 802位<a href="/gp/bestsellers/digital-text/2292103051/ref=pd_zg_hrsr_digital-text">哲学・思想 (Kindleストア)</a></span></li>
<li><span class="a-list-item">  - 862位<a href="/gp/bestsellers/books/554166/ref=pd_zg_hrsr_books">思想</a></span></li>
</ul>
</span></li>
</ul>
<ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">
<li><span class="a-list-item">
<span class="a-text-bold">
カスタマーレビュー:
</span>
<style type="text/css">
/*
* Fix for UDP-1061. Average customer reviews has a small extra line on hover
* https://omni-grok.amazon.com/xref/src/appgroup/websiteTemplates/retail/SoftlinesDetailPageAssets/udp-intl-lock/src/legacy.css?indexName=WebsiteTemplates#40
*/
.noUnderline a:hover {
text-decoration: none;
}
</style>
<div id="detailBullets_averageCustomerReviews" data-asin="B00OKC23LI" data-ref="dpx_acr_pop_">
<span class="a-declarative" data-action="acrStarsLink-click-metrics" data-acrstarslink-click-metrics="{}">
<span id="acrPopover" class="reviewCountTextLinkedHistogram noUnderline" title="5つ星のうち4.8">
<span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;max-width&quot;:&quot;700&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;url&quot;:&quot;/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&amp;asin=B00OKC23LI&quot;}">
<a href="javascript:void(0)" class="a-popover-trigger a-declarative">
<i class="a-icon a-icon-star a-star-5"><span class="a-icon-alt">5つ星のうち4.8</span></i>
<i class="a-icon a-icon-popover"></i></a>
</span>
<span class="a-letter-space"></span>
</span>
</span>
<span class="a-letter-space"></span>
<span class="a-declarative" data-action="acrLink-click-metrics" data-acrlink-click-metrics="{}">
<a id="acrCustomerReviewLink" class="a-link-normal" href="#customerReviews">
<span id="acrCustomerReviewText" class="a-size-base">11個の評価</span>
</a>
</span>
<script type="text/javascript">
P.when('A', 'ready').execute(function(A) {
A.declarative('acrLink-click-metrics', 'click', { "allowLinkDefault" : true }, function(event){
if(window.ue) {
ue.count("acrLinkClickCount", (ue.count("acrLinkClickCount") || 0) + 1);
}
});
});
</script>
<script type="text/javascript">
P.when('A', 'cf').execute(function(A) {
A.declarative('acrStarsLink-click-metrics', 'click', { "allowLinkDefault" : true },  function(event){
if(window.ue) {
ue.count("acrStarsLinkWithPopoverClickCount", (ue.count("acrStarsLinkWithPopoverClickCount") || 0) + 1);
}
});
});
</script>
</div>
</span></li>
</ul>
<div class="a-row">
</div>
<div class="a-row">
</div>
</div>
</div>`;

  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  const expectedPublishInfo: PublishInfo = {
    publisher: "testPublisher",
    publishDate: "2020/1/1",
  };
  expect(scraper.scrapeEbookPublishInfo()).toEqual(expectedPublishInfo);
});

test("Scrape description", () => {
  // <iframe id="bookDesc_iframe">
  //   <div id="iframeContent">
  //     <b>sampleDescription1</b><br>
  //     sampleDescription2<br>
  //     sampleDescription3<br>
  //   </div>
  // </iframe>`;

  const iframe = document.createElement("iframe");
  iframe.id = "bookDesc_iframe";
  document.body.appendChild(iframe);

  const iframeContent = document.createElement("div");
  iframeContent.id = "iframeContent";
  iframeContent.innerHTML = `<b>sampleDescription1</b><br>sampleDescription2<br>sampleDescription3<br>`;

  iframe.contentWindow.document.body.appendChild(iframeContent);

  const scraper = new AmazonScraper();
  expect(scraper.scrapeDescription()).toBe(`sampleDescription1
sampleDescription2
sampleDescription3
`);
});

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
  const dom = `<div id="detailBulletsWrapper_feature_div" data-feature-name="detailBullets" data-template-name="detailBullets" class="a-section feature detail-bullets-wrapper bucket" data-cel-widget="detailBulletsWrapper_feature_div"> <hr aria-hidden="true" class="a-divider-normal bucketDivider"> <h2>登録情報

  </h2>
       <div id="detailBullets_feature_div">
                  <ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">         <li><span class="a-list-item"> <span class="a-text-bold">出版社
                                      ‏
                                          :
                                      ‎
                                  </span> <span>testPaperBookPublisher (2020/1/1)</span> </span></li>          <li><span class="a-list-item"> <span class="a-text-bold">発売日
                                      ‏
                                          :
                                      ‎
                                  </span> <span>2020/1/1</span> </span></li>          <li><span class="a-list-item"> <span class="a-text-bold">言語
                                      ‏
                                          :
                                      ‎
                                  </span> <span>日本語</span> </span></li>          <li><span class="a-list-item"> <span class="a-text-bold">単行本
                                      ‏
                                          :
                                      ‎
                                  </span> <span>288ページ</span> </span></li>          <li><span class="a-list-item"> <span class="a-text-bold">ISBN-10
                                      ‏
                                          :
                                      ‎
                                  </span> <span>4000287133</span> </span></li>          <li><span class="a-list-item"> <span class="a-text-bold">ISBN-13
                                      ‏
                                          :
                                      ‎
                                  </span> <span>978-4000287135</span> </span></li>                </ul>   </div>
      <ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">     <li><span class="a-list-item">      <span class="a-text-bold"> Amazon 売れ筋ランキング: </span>  - 790,792位本 (<a href="/gp/bestsellers/books/ref=pd_zg_ts_books">の売れ筋ランキングを見る本</a>) <ul class="a-unordered-list a-nostyle a-vertical zg_hrsr">  <li><span class="a-list-item">  - 1,600位<a href="/gp/bestsellers/books/561536/ref=pd_zg_hrsr_books">世界史一般の本</a></span></li>  </ul>    </span></li>    </ul> <ul class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list">  <li><span class="a-list-item"> <span class="a-text-bold"> カスタマーレビュー: </span>    <style type="text/css">
      /* 
      * Fix for UDP-1061. Average customer reviews has a small extra line on hover 
      * https://omni-grok.amazon.com/xref/src/appgroup/websiteTemplates/retail/SoftlinesDetailPageAssets/udp-intl-lock/src/legacy.css?indexName=WebsiteTemplates#40
      */
      .noUnderline a:hover { 
          text-decoration: none; 
      }
  </style>
  
                     <div id="detailBullets_averageCustomerReviews" data-asin="4000287133" data-ref="dpx_acr_pop_">
                            <span class="a-declarative" data-action="acrStarsLink-click-metrics" data-acrstarslink-click-metrics="{}">     <span id="acrPopover" class="reviewCountTextLinkedHistogram noUnderline" title="5つ星のうち4.0">
          <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;max-width&quot;:&quot;700&quot;,&quot;closeButton&quot;:&quot;false&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;url&quot;:&quot;/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&amp;asin=4000287133&quot;}"> <a href="javascript:void(0)" class="a-popover-trigger a-declarative">  <i class="a-icon a-icon-star a-star-4"><span class="a-icon-alt">5つ星のうち4.0</span></i>  <i class="a-icon a-icon-popover"></i></a> </span> <span class="a-letter-space"></span> </span>
  
         </span> <span class="a-letter-space"></span>             <span class="a-declarative" data-action="acrLink-click-metrics" data-acrlink-click-metrics="{}"> <a id="acrCustomerReviewLink" class="a-link-normal" href="#customerReviews"> <span id="acrCustomerReviewText" class="a-size-base">2個の評価</span> </a> </span> <script type="text/javascript">
                      P.when('A', 'ready').execute(function(A) {
                          A.declarative('acrLink-click-metrics', 'click', { "allowLinkDefault" : true }, function(event){
                              if(window.ue) {
                                  ue.count("acrLinkClickCount", (ue.count("acrLinkClickCount") || 0) + 1);
                              }
                          });
                      });
                  </script>
                   <script type="text/javascript">
              P.when('A', 'cf').execute(function(A) {
                  A.declarative('acrStarsLink-click-metrics', 'click', { "allowLinkDefault" : true },  function(event){
                      if(window.ue) {
                          ue.count("acrStarsLinkWithPopoverClickCount", (ue.count("acrStarsLinkWithPopoverClickCount") || 0) + 1);
                      }
                  });
              });
          </script>
  
             </div>
         </span></li>  </ul> <div class="a-row">       </div> <div class="a-row">         </div> </div>`;
  document.body.innerHTML = dom;

  const scraper = new AmazonScraper();
  const expectedPublishInfo: PublishInfo = {
    publisher: "testPaperBookPublisher",
    publishDate: "2020/1/1",
  };
  expect(scraper.scrapePaperBookPublishInfo()).toEqual(expectedPublishInfo);
});
