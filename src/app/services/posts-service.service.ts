import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';
import { IPostResponse } from '../models/post-response';
import { IAuthorResponse } from '../models/author-response';
import { ICategoryResponse } from '../models/category-response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://api.storyblok.com/v1/cdn/stories/?version=published&token=';
  token = 'VFoIGzBT8BoQlSFm1WUB9Qtt';
  options = {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma':'no-cache'
  } 
  }
  constructor(private httpClient: HttpClient) { }

  GetPosts(): Observable<IPostResponse> {
    const date = Date.now();
    const url = this.baseUrl + this.token + '&starts_with=posts&q='+date;
    return this.httpClient.get <IPostResponse>(url, this.options);
  }
  GetPost(uid: string): Observable<IPostResponse>{
    const date = Date.now();
    const url = this.baseUrl + this.token + '&starts_with=posts&filter_query[_uid][in]=' + uid + '&q='+date;
    return this.httpClient.get <IPostResponse>(url);
  }
  GetFeaturedPosts(): Observable<IPostResponse> {
    const date = Date.now();
    const url = this.baseUrl + this.token + '&starts_with=posts&filter_query[Featured][in]=true' + '&q='+date;
    return this.httpClient.get <IPostResponse>(url);
  }
  GetAuthor(uuid: string){
    const date = Date.now();
    const url = this.baseUrl + this.token + '&by_uuids=' + uuid + '&q='+date;
    return this.httpClient.get <IAuthorResponse>(url);
  }
  GetPostCategory(uuid: string){
    const date = Date.now();
    const url = this.baseUrl + this.token + '&by_uuids=' + uuid + '&q='+date;
    return this.httpClient.get <ICategoryResponse>(url);
  }
  GetCategory(uuid: string){
    const date = Date.now();
    const url = this.baseUrl + this.token + '&starts_with=categories&filter_query[_uid][in]=' + uuid + '&q='+date;
    return this.httpClient.get <ICategoryResponse>(url);
  }
  GetCategories(){
    const date = Date.now();
    const url = this.baseUrl + this.token + '&starts_with=categories' + '&q='+date;
    return this.httpClient.get <ICategoryResponse>(url);
  }
}
