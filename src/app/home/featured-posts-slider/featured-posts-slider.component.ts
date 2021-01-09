import { Component, ElementRef, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/models/author-story';
import { IPost } from 'src/app/models/post';
import { IPostStory} from 'src/app/models/post-story';
import { PostsService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-featured-posts-slider',
  templateUrl: './featured-posts-slider.component.html',
  styleUrls: ['./featured-posts-slider.component.scss']
})
export class FeaturedPostsSliderComponent implements OnInit {

  featuredPosts: IPostStory[];
  featuredPost: IPostStory;
  constructor(private postsService: PostsService, private el: ElementRef) { }

  ngOnInit(): void {
    this.getFeaturedPosts();
  }
  getFeaturedPosts() {
    this.postsService.GetFeaturedPosts().subscribe(response => {
      this.featuredPosts = response.stories;
      this.featuredPosts.forEach(post => {
        this.GetAuthors(post.content);
      })
      this.featuredPost = this.featuredPosts[0];
      console.log(this.featuredPosts);
    });
  }
  GetAuthors(post: IPost){
    this.postsService.GetAuthor(post.author).subscribe(respone => {
      post.authorObject = respone.stories[0].content;
    });
  }
}
