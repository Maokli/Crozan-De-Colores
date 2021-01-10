import { Component, OnInit } from '@angular/core';
import { ICategory } from '../models/category-response';
import { PostsService } from '../services/posts-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.MobileNav();
    this.GetAllCategories()
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
