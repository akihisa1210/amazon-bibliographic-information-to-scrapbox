import { PaperBookAmazonBibliograhicInformation } from "./bibInfo/PaperBookAmazonBibliograhicInformation";
import { Scrapbox } from "./Scrapbox";
import {
  PostTitle,
  PostContent,
  ScrapboxBibliographicInformation,
} from "./Post";
import { Amazon } from "./site/amazon";
import { BibInfoFactory } from "./bibInfo/bibInfoFactory";

const scrapboxUserName = "akihisa1210";

const main = (): void => {
  const amazon = new Amazon();
  let bibInfo;
  if (amazon.isEbook()) {
    console.log("This is ebook.");
    const factory = new BibInfoFactory();
    bibInfo = factory.createBibInfo("AmazonEbookBibInfo");
    console.log("AmazonEbookBibInfo", bibInfo);
  } else {
    console.log("This is paper book.");
    bibInfo = new PaperBookAmazonBibliograhicInformation();
    console.log("PaperBookAmazonBibliograhicInformation", bibInfo);
  }

  const scrapboxPageTitle = new PostTitle(
    window.prompt('Scrap "Amazon" to your scrapbox.', `『${bibInfo.title}』`)
  );

  const scrapboxInfo = new ScrapboxBibliographicInformation(bibInfo);

  const scrapboxPageContent = new PostContent(scrapboxInfo.scrapboxInfo);

  const scrapbox = new Scrapbox(scrapboxUserName);
  window.open(
    scrapbox.constructScrapboxUrl(scrapboxPageTitle, scrapboxPageContent)
  );
};
main();
