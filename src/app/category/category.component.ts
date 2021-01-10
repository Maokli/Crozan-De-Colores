import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../models/category-response';
import { IPost } from '../models/post';
import { PostsService } from '../services/posts-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  posts: IPost[] = [];
  categories: ICategory[] = [];
  category: ICategory;
  constructor(private postService: PostsService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetCategory();
    this.GetPosts();
    this.MobileNav();
    this.GetAllCategories();
  }
  GetCategory() {
    this.postService.GetCategory(this.activatedRoute.snapshot.paramMap.get('uid'))
    .subscribe(response => {
      console.log(response);
      this.category = response.stories[0].content;
    })
  }
  GetPosts() {
    this.postService.GetPosts().subscribe(response => {
      response.stories.forEach(story => {
        this.posts.push(story.content);
      });
      this.GetPostCategory();
    })
  }
  GetPostCategory(){
      this.posts.forEach(post => {
        const postCategories = [];
        let isNotCategory = 0;
        post.Categories.forEach(uid =>{
          this.postService.GetPostCategory(uid).subscribe(response =>{
            postCategories.push(response.stories[0].content);
            if(response.stories[0].content.Name !== this.category.Name){
              isNotCategory++;
              console.log(isNotCategory)
            }
            if(isNotCategory === post.Categories.length){
              console.log('not category')
              this.posts.splice(this.posts.indexOf(post),1);
            }
          });
        });
        post.CategoryObjects = postCategories;
        console.log(postCategories);
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
