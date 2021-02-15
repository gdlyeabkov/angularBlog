@Injectable({

})
export class PostsService{
  constructor(private http:HttpClient){}
  create(post):Observable<Post>{
    return this.http.post(`${environment.fbDbUrl}/posts.json`,post).pipe(map((response:FbCreateResponse)=>{
      return {
        ...post,
        id:response.name,
        date:new Date(post.date),
      }
    }))
  }
  getAll():Observable<Post[]>{
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(map((response)=>{
      {[key:string]:any})=>{
        Object.keys(response).map(key=>({
          ...response[key],
          id:key,
          date:new Date(response[key].date)
        }))
        return []
      }
    }))
  }
  getById(id:string):Observable<Post>{
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`).pipe(map((post:Post)=>{
      return {
        ...post,
        id,
        date:new Date(post.date),
      }
    }))
  }
  remove(id:string):Observable<void>{
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}/json`)
  }
  update(post:Post):Observable<Post>{
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`,post)
  }
}
