import { IAuthor } from "./author-story";
import { ICategory } from "./category-response";
import { IMarkup } from "./markup";

export interface IPost {
  _uid: string;
  component: string;
  title: string;
  image: string;
  intro: string;
  long_text: string;
  author: string;
  Categories: string[];
  CategoryObjects: ICategory[];
  isCategory: boolean;
  markup: IMarkup;
  authorObject: IAuthor;
}