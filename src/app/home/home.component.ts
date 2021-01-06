import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/post';
import { PostsService} from '../services/posts-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: IPost[] = [];
  date;
  navOpen = false;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.date = Date.now();
    console.log(this.date);
    this.GetPosts();
    this.MobileNav();
  }
  GetPosts() {
    this.postService.GetPosts().subscribe(response => {
      console.log(response);
      response.stories.forEach(story => {
        this.posts.push(story.content);
      });
      console.log(this.posts);
    })
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
