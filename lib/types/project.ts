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
  startDate: string;
  deadline: string;
  moneyPrize: string;
  seniority: string[];
  categoryId: string;
  skills: string[];
  submissionLink: string;
  contactEmail: string;
  createdAt: string;
  category: ICategory;
}

  
  export interface IAdvert {
    logo: StaticImageData;
    content: string;
    link: string;
    otherImage: StaticImageData;
  }
  