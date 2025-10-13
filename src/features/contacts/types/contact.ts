import { Project } from "@/features/projects/types/project";

export enum ContactType {
  Person = "person",
  Business = "business",
}

export interface BaseContact {
  id: string;
  contactType: ContactType;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  favorite?: boolean;
  username?: string;
  projects?: Project[];
}

export interface PersonContact extends BaseContact {
  contactType: ContactType.Person;
  full_name?: string;
}

export interface BusinessContact extends BaseContact {
  contactType: ContactType.Business;
  business_name?: string;
}

export type Contact = PersonContact | BusinessContact;
