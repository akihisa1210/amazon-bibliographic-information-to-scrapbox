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
    const rawPublishInfo: string = document.getElementById(
      "detailBullets_feature_div"
    ).textContent;

    return this.generatePublishInfo(rawPublishInfo);
  }

  scrapePaperBookPublishInfo(): PublishInfo {
    const rawPublishInfo: string = document.getElementById(
      "detailBulletsWrapper_feature_div"
    ).textContent;

    return this.generatePublishInfo(rawPublishInfo);
  }

  private generatePublishInfo(rawPublishInfo: string): PublishInfo {
    console.log(rawPublishInfo); // Debug
    const publishInfoArray: RegExpMatchArray = rawPublishInfo.match(
      /(出版社\n:\n\n.*)(\(.*\))/
    );
    console.log(publishInfoArray); // Debug
    let publisher = publishInfoArray[1].replace(/\r?\n/g, "");
    console.log(publisher); // Debug

    // TODO: Move linking function to other place.
    publisher = publisher.replace(/:/, ":[ ");
    publisher = publisher.match(/;/)
      ? publisher.replace(/;/, "];")
      : publisher + "]";

    const publishDate = publishInfoArray[2].replace(/\((\d+\/\d+)\//, "([$1]/");

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
    return iframeContent.textContent;
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
