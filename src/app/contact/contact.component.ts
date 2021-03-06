import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from '../models/category-response';
import { PostsService } from '../services/posts-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });
  categories: ICategory[] = [];

  constructor(
    private http: HttpClient,
    private postService: PostsService
  ) {};

  onSubmit() {
    const body = new HttpParams()
    .set('form-name', 'contact')
    .append('name', this.contactForm.value.name)
    .append('email', this.contactForm.value.email)
    .append('message', this.contactForm.value.message)
    this.http.post('/', body.toString(), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).subscribe(
      res => {},
      err => {
        if (err instanceof ErrorEvent) {
          //client side error
          alert("Something went wrong when sending your message.");
          console.log(err.error.message);
        } else {
          //backend error. If status is 200, then the message successfully sent
          if (err.status === 200) {
            alert("Your message has been sent!");
          } else {
            alert("Something went wrong when sending your message.");
            console.log('Error status:');
            console.log(err.status);
            console.log('Error body:');
            console.log(err.error);
          };
        };
      }
    );
  };

  ngOnInit(): void {
    this.MobileNav();
    this.GetAllCategories();
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
