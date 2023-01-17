import { v4 as uuid } from "uuid";

export class Project {
  title: string;
  img: string;
  content: string = "";
  subtitle: string;
  href: string;
  openNewTab: boolean = false;
}

export const testProjects = [
  {
    id: uuid(),
    title: "Google Search Engine",
    content: `I developed this search engine single handedly in 1998 and it took the world by storm, over 25 years laters it still leads the globe in search.`,
    img: "b3536ae0-40d0-417d-912e-4190629b7f14",
    subtitle: "Click to Google",
    href: "https://www.google.com",
    openNewTab: true,
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    title: "Chat GPT",
    content: `This AI chatbot was released at the end of 2022 by OpenAI, one of the companies on the bleeding edge of artifical intelligence development. `,
    img: "b3536ae0-40d0-417d-912e-4190629b7f14",
    subtitle: "AI now!",
    href: "https://chat.openai.com/chat",
    openNewTab: true,
    createdAt: new Date().getTime(),
  },
];
