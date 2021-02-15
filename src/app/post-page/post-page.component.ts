import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$:Observable<Post>
  constructor(private router:Router,postsService:PostsService,route:ActivatedRoute) { }

  ngOnInit(): void {
    this.post$=this.router.params.pipe(switchMap((params)=>{
      return this.postsService.getById(params['id'])
    }))
  }
  logout(event:Event){
    event.preventDefault()
    this.router.navigate(['/admin','login'])
  }
}
