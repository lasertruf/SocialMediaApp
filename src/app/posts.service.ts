import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model'
import { ThePost } from './newpost.model';
import { emailAndThePost } from './emailAndPost.mode';

@Injectable({providedIn: 'root'})
export class PostService {
 private  posts : Post[] =[];
 private postsUpdated = new Subject<Post[]>();

 constructor(private http : HttpClient){

 }

    getPosts(){
        return [...this.posts];

    }

    getPostsfromDB(){
        return this.http.get("/post");
    }

    getPostUpdateListener(){
       return  (this.postsUpdated.asObservable());
    }

    addPost(id : string, title : string, content : string, email : string){

        const post : Post = {_id : id, title : title, content : content , email : email}
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

       
    }

    addThePost( title : string, content : string, email:string){
        const postall : emailAndThePost = { title : title, content : content, email: email }; 
         this.http.post("/post", postall).subscribe();
    }

    add2ThePost( title: string, content: string){
        const postall : ThePost = {title : title, content: content}
        this.http.post("/post", postall);
        console.log(postall);
    }
  
    deletePost(_id : any){
        const deletepostvar = "/post/" + _id + "/";
       return this.http.delete(deletepostvar);
    }

    editPost(post:any){
        const Editpostvar = "/post/" + post._id + "/";
        console.log(post._id);
        const postdata : ThePost= {title : post.title, content : post.content}

        return this.http.put(Editpostvar,postdata);

    }

}   



