@NgModule({
  declarations:[
    AdminLayoutComponent,
    SearchPipe
  ],
  imports:[

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{
      path:'',component:AdminLayoutComponent,children:[
        {path:'',component:LoginPageComponent, pathMatch:'full', redirectTo:'/adimn/login'}
        {path:'login',component:LoginPageComponent},
        {path:'dashboard',component:DashboardPageComponent,canActivate:[AuthGuard]},
        {path:'create',component:CreatePageComponent,canActivate:[AuthGuard]},
        {path:'post/:id/edit',component:EditPageComponent,canActivate:[AuthGuard]},
      ]
    },

  ],{
    preloadStrategy:PreloadAllModules
  })
  ],

  exports:[RouterModule],
  providers:[
    AlertService,
    AuthGuard,

  ]
})
 export class AdminModule{

}
