import { StaticImageData } from "next/image";

export interface IProject {
    id: string;
    title: string;
    deadline: Date;
    duration: string;
    moneyPrize: string;
    skills: string[];
    seniorityLevel: string[];
    contactEmail: string;
    description: string;
    brief: string;
    tasks: string;
  }
  
  export interface IAdvert {
    logo: StaticImageData;
    content: string;
    link: string;
    otherImage: StaticImageData;
  }
  