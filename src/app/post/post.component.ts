import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post';
import { PostsService } from '../services/posts-service.service';
import StoryblokClient from 'storyblok-js-client';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: IPost;
  date: string;
  storyBlok;
  showAuthor;
  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.storyBlok = new StoryblokClient({
      accessToken: this.postsService.token,
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    });
  }
  ngAfterViewInit(){
    this.GetPost();
    this.MobileNav();
    let content = document.querySelector('body app-root app-post .content .column');
    console.log(content);
  }

  GetPost(){
    this.postsService.GetPost(this.activatedRoute.snapshot.paramMap.get('uuid'))
    .subscribe(response => {
      this.post = response.stories[0].content;
      this.date = response.stories[0].first_published_at;
      this.GetAuthors(this.post);
      const innerHtmlstring = this.storyBlok.richTextResolver.render(response.stories[0].content.markup);
      const innerHtml = new DOMParser().parseFromString(innerHtmlstring, "text/html");
      const htmlToReplaceWith = innerHtml.querySelector('body');
      console.log(htmlToReplaceWith.innerHTML);
      this.SetPostInnerHtml(htmlToReplaceWith);
    }, error => {
      console.log(error);
    })
  }
  GetAuthors(post: IPost){
    this.postsService.GetAuthor(post.author).subscribe(respone => {
      post.authorObject = respone.stories[0].content;
      console.log(post.authorObject);
    });
  }

  SetPostInnerHtml(html){
    if(this.post !== null){
      let container = document.querySelector('.post');
      container.innerHTML += html.innerHTML;
    }
  }
  MobileNav(){
    const navOpenButton = document.querySelector('.s-header__toggle-menu');
    const navCloseButton = document.querySelector('.close-mobile-menu');
    const navbar = document.querySelector('nav');
    navbar.style.visibility = 'visible';
    navbar.style.opacity = '1';
    navbar.style.height ='100vh';
    navbar.style.maxHeight = '0vh';
    navbar.style.transitionDuration ='1s'
    navOpenButton.addEventListener('click', () => {
      navbar.style.maxHeight = '100vh';
    });
    navCloseButton.addEventListener('click', () => {
      navbar.style.maxHeight = '0vh';
    })
  }
}
