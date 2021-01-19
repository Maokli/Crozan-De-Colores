import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';

const routes: Routes = 
[ {path: 'about', component: AboutComponent},
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: ':uuid', component: PostComponent},
  {path: 'category/:uid', component: CategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
