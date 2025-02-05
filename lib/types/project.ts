import { StaticImageData } from "next/image";

export interface ICategory {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface IProject {
  id: string;
  challengeTitle: string;
  description: string;
  projectBrief: string;
  startDate: Date;
  deadline: Date;
  moneyPrize: string;
  seniority: string[];
  categoryId: string;
  skills: string[];
  submissionLink: string;
  contactEmail: string;
  createdAt: string;
  category: ICategory;
}

export interface ISkill{
  id:string;
  name:string;
  createdAt:string;
}

  
  export interface IAdvert {
    logo: StaticImageData;
    content: string;
    link: string;
    otherImage: StaticImageData;
  }
  