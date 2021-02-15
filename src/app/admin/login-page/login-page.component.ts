import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted=false
  message:string
  constructor(public auth:AuthService,private router:Router,private route:ActivatedRoute) { }
  form:FormGroup
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message='пожалуйста введите данные'
      }else if(params['authFailed']){
        this.message='сессия истекла. введите заново'
      }
    })
    this.form=new FormGroup({
      email:new FormControl(null,[Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }
  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted=true
    const user:User={
      email:this.form.value.email,
      password:this.form.value.password,
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
      this.submitted=false
    },()=>{
      this.submitted=false
    })
  }
}
