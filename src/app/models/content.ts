import { IAttrs } from "./attrs";
import { IMark } from "./mark";

export interface IContent {
  type: string;
  content: IContent[];
  text: string;
  attrs: IAttrs;
  marks: IMark[];
}