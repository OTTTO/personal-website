import { v4 as uuid } from "uuid";

export interface ISkillGroup {
  id: string;
  position: number;
  name: string;
  skills: string;
}

export interface IExperience {
  id: string;
  position: number;
  role: string;
  company: string;
  location: string;
  time: string;
  responsibilities: IResponsibility[];
}

export interface IResponsibility {
  id: string;
  position: number;
  details: string;
}

export interface IEducation {
  id: string;
  position: number;
  institution: string;
  achievement: string;
  time: string;
}

export interface IResumeHeader {
  id?: string;
  name: string;
  title: string;
}

export interface IResume {
  resumeHeader: IResumeHeader;
  skillGroups: ISkillGroup[];
  experience: IExperience[];
  education: IEducation[];
}

export const testResume = {
  resumeHeader: {
    id: uuid(),
    name: "Test Full Name",
    title: "Test Career Title",
  },
  skillGroups: [
    {
      id: uuid(),
      position: 0,
      name: "Stuff I'm Good At",
      skills: "Writing backends, building frontends, deploying websites",
    },
  ],
  experience: [
    {
      id: uuid(),
      position: 0,
      role: "Role at Company",
      company: "Company Name",
      location: "Remote City, USA",
      time: "Past Time - Present",
      responsibilities: [
        {
          id: uuid(),
          position: 0,
          details: "Worked on various <b>generic</b> tasks for my <b>boss</b>",
        },
        {
          id: uuid(),
          position: 1,
          details:
            "Interaced with a number of <b>clients</b> in regards to <b>non-specific</b> projects",
        },
      ],
    },
  ],
  education: [
    {
      id: uuid(),
      position: 0,
      institution: "Self Taught University",
      achievement: "Cool Achievement",
      time: "2020-2022",
    },
  ],
};
