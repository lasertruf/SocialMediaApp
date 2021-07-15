import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostService } from '../posts.service';
import { Post } from '../post.model'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit,OnDestroy {

  posts : Post[] = [];
  postsarr : Post[] = [];
  
  private postSubs! : Subscription;
  constructor(public postService : PostService ) { }

  ngOnInit(): void {
    this.getPostsfromDB();

    this.posts= this.postService.getPosts();
    this.postSubs = this.postService.getPostUpdateListener().subscribe((posts:Post[]) =>
    {
      this.posts=posts;
    });

  }

  ngOnDestroy() {

    this.postSubs.unsubscribe();
  }

  getPostsfromDB(){
    this.postService.getPostsfromDB().subscribe((res: any) =>
    {
      this.postsarr =  res;
    });
    
   }


  

}
