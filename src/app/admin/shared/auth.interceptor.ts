@Injectable({})

export class AuthInterceptor implements HttpInterceptor{
  constructor(auth:AuthService,router:Router){}
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
      if(this.auth.isAuthenticated()){
        req=req.clone({
          setParams:{
            auth:this.auth.token
          }
        })
      }
      return next.handle(req).pipe(tap(),catchError((error:HttpErrorResponse)=>{
        if(error.status===401){
          this.auth.logout()
          this.router.navigate(['/admin','login'],{
            queryParams:{
              authFailed:true
            }
          })
        }
        return throwError(error)
      }))
  }
}
