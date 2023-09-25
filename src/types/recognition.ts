import { v4 as uuid } from "uuid";
import { RecognitionType } from "./recognitionType";

export class RecognitionItemClass {
  id: string = uuid();
  content: string = "";
  source: string = "";
  href: string = "";
  type: RecognitionType = undefined;
  position: number = -1;
  createdAt: number = new Date().getTime();
}

export const testRecognition = [
  {
    id: uuid(),
    content: `Dylan is an exceptional developer. 
    His prowress and speed is among some of the best I have ever seen.
    I hope to continue to work with him in the future`,
    source: "Joe Dev",
    href: "https://www.linkedin.com/in/dylan-beckwith/",
    type: RecognitionType.Development,
    position: 0,
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    content: `Dylan's ability to keep his Jira board up to date is very helpful to me as a manager `,
    source: "Jill The Manager",
    href: "https://www.linkedin.com/in/dylan-beckwith/",
    type: RecognitionType.Development,
    position: 1,
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    content: `Dylan taught me everything I know and I am forever grateful. With his help, I became a Staff Engineer at Netflix with TC of 460`,
    source: "Primeagen",
    href: "https://www.linkedin.com/in/dylan-beckwith/",
    type: RecognitionType.Mentorship,
    position: 0,
    createdAt: new Date().getTime(),
  },
];
