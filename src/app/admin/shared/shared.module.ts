@NgModule({
  imports:[
    HttpClient,
    QuillModule.forRoot()
  ],
  exports:[
    QuillModule,
    HttpClient
  ],
}) export class SharedModule{

}
