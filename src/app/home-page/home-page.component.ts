import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$:Observable<Post[]>
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.posts$=this.postsService.getAll()
  }

}
