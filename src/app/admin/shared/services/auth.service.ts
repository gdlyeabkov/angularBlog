@Injectable({
  providedIn:'root'
}) export class AuthService{
  public error$:Subject<string>=new Subject<string>()
  constructor(private http:HttpClient){

  }
  get token():string{
    const expDate=new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  login(user:User):Observable<any>{
    user.returnSecureToken=true
    this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${evironment.apikey}`,user).pipe(tap(this.setToken()),catchError(this.handleError.bind(this)))
  }
  private handleError(error:HttpErrorResponse){
    const {message}=error.error.error
    switch(message){
      case 'INVALID_EMAIL':
        this.error.next('Неверный email')
        break
      case 'INVALID__PASSWORD':
        this.error.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error.next('такого email нет')
        break

    }
    return throwError(error)
  }
  logout(){
    this.setToken(null)
  }
  isAuthenticated():boolean{
    return !!this.token
  }
  private setToken(response:FbAuthResponse | null){
    if(response){
      const expDate=new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token',response.idToken)
      localStorage.setItem('fb-token-exp',expDate.toString())
    }
    localStorage.clear()
  }
}
