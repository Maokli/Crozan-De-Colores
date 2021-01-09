import { ElementRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: '[post-card]',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: IPost;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
