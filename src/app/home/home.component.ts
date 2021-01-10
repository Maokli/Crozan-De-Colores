import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../models/category-response';
import { IPost } from '../models/post';
import { PostsService} from '../services/posts-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: IPost[] = [];
  categories: ICategory[] = [];
  date;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.date = Date.now();
    console.log(this.date);
    this.GetPosts();
    this.GetAllCategories();
    this.MobileNav();
  }
  GetPosts() {
    this.postService.GetPosts().subscribe(response => {
      response.stories.forEach(story => {
        this.posts.push(story.content);
      });
      this.GetPostCategory();
      console.log(this.posts);
    })
  }
  GetPostCategory(){
      this.posts.forEach(post => {
        const postCategories = [];
        post.Categories.forEach(uid => {
          this.postService.GetPostCategory(uid).subscribe(response =>{
            postCategories.push(response.stories[0].content);
          })
        });
        post.CategoryObjects = postCategories;
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
    if(screen.width < 800)
      this.childrenNavAnimation();
  }
  childrenNavAnimation() {
    const hasChlidrenBtn = document.querySelector('.has-children');
    const children = hasChlidrenBtn.querySelector('ul');
    let isShown = false;
    children.style.display ='block';
    children.style.overflow = 'hidden';
    children.style.maxHeight = '0vh';
    children.style.padding = '0';
    children.style.transitionDuration ='1s';
    hasChlidrenBtn.addEventListener('click', () => {
      isShown = !isShown;
      if(isShown){
        children.style.maxHeight = '0vh';
      }
      else {
        children.style.maxHeight = '100vh';
      }

    })
  }
  GetAllCategories() {
    this.postService.GetCategories().subscribe(response => {
      response.stories.forEach(story => {
        this.categories.push(story.content);
      });
    });
  }
}
