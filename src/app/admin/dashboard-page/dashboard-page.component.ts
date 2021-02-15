import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit,OnDestroy {
  posts:Post[]=[]
  searctStr=''
  pSub:Subscription
  dSub:Subscription
  constructor(private auth:AuthService,postsService:PostsService,alert:AlertService) { }

  ngOnInit(): void {
    this.pSub=this.postsService.getAll().subscribe(posts=>{
      this.posts=posts
    })
  }
  remove(id:string){
    this.dSub=this.postsService.remove(id).subscribe(()=>{
      this.posts.filter(post=>post.id!==id)
      this.alert.danger('пост был удален')
    })
  }
  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
  test(){
    this.auth.token
  }

}
