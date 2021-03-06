import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FeaturedPostsSliderComponent } from './home/featured-posts-slider/featured-posts-slider.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostCardComponent,
    FooterComponent,
    FeaturedPostsSliderComponent,
    AboutComponent,
    PostComponent,
    ContactComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ScullyLibModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
