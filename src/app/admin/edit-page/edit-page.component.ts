import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  constructor(private route:ActivatedRoute,private postsService:PostsService,alert:AlertService) { }
  form:FormGroup
  ngOnInit(): void {
    this.route.params.pipe(switchMap(
      (params:Params)=>{
        return this.postsService.getById(params['id'])

      }
    )).subscribe((post:Post)=>{
      this.post=post
      this.form=new FormGroup({
        title:new FormControl(post.title,Validators.required),
        text:new FormControl(post.text,Validators.required),
      })
    })
  }
  post:Post
  submitted=false
  uSub:Subscription
  ngOnDestroy(){
    if(this.uSub)
    this.uSub.unsubscribe()
  }
  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted=true
    this.postsService.update({
      ...this.post,
      text:this.form.value.text,
      title:this.form.value.title,

    }).subscribe(()=>{
      this.submitted=false
      this.alert.success('пост был обновлен')
    })
  }
}
