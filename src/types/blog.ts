import { LoremIpsum } from "lorem-ipsum";

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

export const testPosts = [
  {
    id: "123",
    author: "Joe Johnson",
    title: "Making It as a Software Developer",
    content: lorem.generateParagraphs(3),
    createdAt: new Date().getTime(),
  },
  {
    id: "zyx",
    author: "Bob Baker",
    title: "Ten Easy Ways To Become The Best",
    content: lorem.generateParagraphs(3),
    createdAt: new Date().getTime(),
  },
  {
    id: "345",
    author: "Jack Johnson",
    title: "Why I Am Quitting Software",
    content: lorem.generateParagraphs(3),
    createdAt: new Date().getTime(),
  },
  {
    id: "zyw",
    author: "Brent Baker",
    title: "The Steve Jobs Story",
    content: lorem.generateParagraphs(3),
    createdAt: new Date().getTime(),
  },
];
