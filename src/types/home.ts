import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuid } from "uuid";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export interface IHome {
  id: string;
  intro: string;
  websiteInfo: string;
}

export const testHome = {
  intro: `This looks like a great place to put an introduction and it's pretty cool that I can edit it whenever!
   ${lorem.generateParagraphs(1)}`,
  websiteInfo: `Oh, I can put more info about my website here and change it whenever, even from a mobile device!
   ${lorem.generateParagraphs(1)}`,
  mainImg: "7e74ca8f-ea8a-4d09-ba31-f4d2ff52fff0",
};

export class HomeClass {
  id: string = uuid();
  intro: string = "";
  websiteInfo: string = "";
  mainImg: string = "";
  createdAt: number = new Date().getTime();
}
