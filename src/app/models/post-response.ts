import { IPost } from "./post";
import { IPostStory } from "./post-story";

export interface IPostResponse {
  stories: IPostStory[];
}