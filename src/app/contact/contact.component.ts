import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.MobileNav();
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
