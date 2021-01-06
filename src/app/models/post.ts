import { IAuthor } from "./author-story";
import { IMarkup } from "./markup";

export interface IPost {
  _uid: string;
  component: string;
  title: string;
  image: string;
  intro: string;
  long_text: string;
  author: string;
  markup: IMarkup;
  authorObject: IAuthor;
}