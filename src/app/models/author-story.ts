
export interface IAuthor {
  Name?: string;
  _uid: string;
  About: string;
  Image?: string;
  component: string;
}



export interface IAuthorStory {
  name: string;
  created_at: Date;
  published_at: Date;
  alternates: any[];
  id: number;
  uuid: string;
  content: IAuthor;
  slug: string;
  full_slug: string;
  default_full_slug?: any;
  sort_by_date?: any;
  position: number;
  tag_list: any[];
  is_startpage: boolean;
  parent_id: number;
  meta_data?: any;
  group_id: string;
  first_published_at: Date;
  release_id?: any;
  lang: string;
  path?: any;
  translated_slugs: any[];
}