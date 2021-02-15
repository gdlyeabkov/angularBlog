const  router: Routes=[
  {path:'',component:MainLayoutComponent, chiildren:[
    {path:'', redirectTo:'/',pathMatch:"full" },
    {path:'',component:HomePageComponent},
    {path:'post/:id',component:PostPageComponent},

  ]},
  {path:'admin', loadChildren:'./admin/admin.module#AdminModule', redirectTo:'/',pathMatch:"full" },
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports :[RouterModule]
})
export class AppRoutingModule{

}
