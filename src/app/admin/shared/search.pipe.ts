@Pipe({
  name:'searchPosts'
}) export class SearchPipe implements PipeTransform{
  transform(posts:Post[],search=''):Post[{
    if(!seatch.trim()){
      return posts
    }
    return posts.filter([post=>{
      return post.title.toLowerCase().includes(search.toLowerCase())
    }])
  }
}
