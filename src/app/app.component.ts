import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { PostService } from './posts.service';
import { Post } from './post.model'; 
import { VirtualTimeScheduler } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// @ViewChild('posttheForm',null) posttheForm: NgForm;
 


export class AppComponent implements OnInit {
  
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;  
  postsarr !: Post[];
  Modal : boolean = false;
  EditMode : boolean = false;
  postdaForm!: FormGroup;
    
  form!: NgForm;
  
  title = " Social App";
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    public postService: PostService  

  ) { }

  ngOnInit() {
   
    this.getPostsfromDB();
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
      
    this.postdaForm = this.formBuilder.group({
      _id:[''],      
      title: ['', Validators.required],
      content: ['', Validators.required],
      email:['']
     
    }); 

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      
     // console.log(this.socialUser);
    });
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

titler! : '';
contentr! : '';

getPostsfromDB(){

this.postService.getPostsfromDB().subscribe((res:any)=>{
  
  this.postsarr = res;

});

}



  onClickDo(){
    // if(this.postdaForm.invalid){
    //   console.log("INVALID FORM");
      
    //   return;
    // }
     // const post : Post = {
     //   id : form.value.title,
     //   title : form.value.title,
     //   content : form.value.content
     // };
     // this.posttitle=form.value.title;
     // this.postdata=form.value.title;
     // console.log(post);
     // console.log(" on click do");

if(this.EditMode){
  this.postService.editPost(this.postdaForm.value).subscribe();
  
  this.getPostsfromDB();
  this.EditMode=false;
}
else{
  this.titler = this.postdaForm.value.title; 
  this.contentr = this.postdaForm.value.content;
  this.postService.addPost(this.postdaForm.value.title,this.postdaForm.value.title,this.postdaForm.value.content, this.socialUser.email);
  this.postService.addThePost(this.postdaForm.value.title, this.postdaForm.value.content, this.socialUser.email);
  // console.log(postdaForm.value.title + postdaForm.value.content + this.socialUser.email);
  
}
this.postdaForm.reset();
this.getPostsfromDB();
}

onDeletePost(id:any){
  
  if(confirm('Do you want to delete this post?'))
this.postService.deletePost(id).subscribe();
this.getPostsfromDB();
}

onEditPost(dapost:Post){
        


this.EditMode=true;
this.Modal=true;

this.postdaForm.patchValue(dapost);
console.log(this.postdaForm.value)

this.getID(dapost);
// this.Modal=false;
}

getID(p:Post)
{
return p._id;
}

onClose()
{
  this.EditMode=false;
  this.postdaForm.reset();
}


}

export class dapost {
  title !: string;
  content!: string;
  email!: string;
  }