import { v4 as uuid } from "uuid";

export class Training {
  id: string = uuid();
  content: string = "";
  createdAt: number = new Date().getTime();
}

export const testTraining = {
  content: `The purpose of Training with Dylan is to help you become job ready
  by seeing what it's like to work in a production codebase. 
  During these training sessions, we will be covering a wide breadth of topics 
  that are necessary to become a successful full stack developer`,
};
