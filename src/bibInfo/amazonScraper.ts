import { PublishInfo, AuthorInfo } from "./bibInfo";

export class AmazonScraper {
  scrapeProductTitle(): string {
    return document.getElementById("productTitle").textContent.trim();
  }

  scrapeEbookAsin(): string {
    return document.getElementsByName("ASIN.0")[0].getAttribute("value");
  }

  scrapePaperBookAsin(): string {
    return document.getElementById("ASIN").getAttribute("value");
  }

  scrapeEbookPublishInfo(): PublishInfo {
    const productDetails: string = document
      .getElementById("detailBullets_feature_div")
      .textContent.replace(/r?\n/g, "");

    return this.generatePublishInfo(productDetails);
  }

  scrapePaperBookPublishInfo(): PublishInfo {
    const productDetails: string = document
      .getElementById("detailBulletsWrapper_feature_div")
      .textContent.replace(/r?\n/g, "");

    console.log("productDetails:", productDetails); // debug
    return this.generatePublishInfo(productDetails);
  }

  private generatePublishInfo(rawPublishInfo: string): PublishInfo {
    const publishInfoArray: RegExpMatchArray = rawPublishInfo.match(
      /出版社\s*‏\s*:\s*‎\s*(.*?)\((.*?)\)/
    );
    console.log("publishInfoArray:", publishInfoArray); // debug
    const publisher = publishInfoArray[1].trim();
    const publishDate = publishInfoArray[2].trim();

    const publishInfo: PublishInfo = {
      publisher: publisher,
      publishDate: publishDate,
    };
    return publishInfo;
  }

  scrapeDescription(): string {
    const bookDescIframe: HTMLIFrameElement = document.getElementById(
      "bookDesc_iframe"
    ) as HTMLIFrameElement;
    if (bookDescIframe === null) {
      return "";
    }
    const iframeContent = bookDescIframe.contentDocument.getElementById(
      "iframeContent"
    );
    return iframeContent.innerHTML
      .replace(/<\/?b>/g, "")
      .replace(/<br>/g, "\n");
  }

  scrapeEbookImageUrl(): string {
    return document.getElementById("ebooksImgBlkFront").getAttribute("src");
  }

  scrapePaperBookImageUrl(): string {
    return document.getElementById("imgBlkFront").getAttribute("src");
  }

  scrapeCurrentUrl(): string {
    return window.location.href;
  }

  scrapeAuthorsInfo(): AuthorInfo[] {
    const authorsHTMLCollectionArray = Array.from(
      document.getElementsByClassName("author")
    );
    const authorsInfo: AuthorInfo[] = [];
    for (const element of authorsHTMLCollectionArray) {
      // Scrape author.
      // Sometimes author is followed by "のAmazon著者ページを見る".
      const authorLink: string = element.getElementsByTagName("a")[0]
        .textContent;

      const authorLinkMatchArray = authorLink.match(
        /(.+)のAmazon著者ページを見る/
      );

      let author;
      if (authorLinkMatchArray) {
        author = authorLinkMatchArray[1];
      } else {
        author = authorLink;
      }

      // Scrape contribution.
      const contribution: string = element.getElementsByClassName(
        "a-color-secondary"
      )[0].textContent;
      authorsInfo.push({
        author: author,
        contribution: contribution,
      });
    }
    return authorsInfo;
  }
}
