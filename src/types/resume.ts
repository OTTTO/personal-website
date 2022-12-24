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
