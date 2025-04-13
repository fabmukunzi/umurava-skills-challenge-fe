import { ChallengePagination } from "./project";

export interface ISkill {
  _id?: string;
  skillName: string;
  createdAt?: string;
}

export interface IChallengeCategory {
  _id?: string;
  challengeCategoryName: string;
  createdAt?: string;
}

export interface IPrizeCategory {
  _id?: string;
  prizeName: string;
  currency: string;
  description: string;
  createdAt?: string;
}

export type SectionItem = ISkill | IChallengeCategory | IPrizeCategory;

export interface ISectionProps {
  title?: string;
  items: SectionItem[];
  placeholder?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (isOpen: boolean) => void;
  setConfirmOpen:(confirmOpen:boolean) => void;
  confirmOpen:boolean
  onAdd: (name: string, currency?: string) => void;
  onUpdate: (
    id: string,
    name: string,
    currency?: string
  ) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  isAddLoading: boolean;
  isUpdateLoading: boolean;
  isDeleteLoading: boolean;
  pagination?:ChallengePagination
  onPageChange: (page: number) => void;
}