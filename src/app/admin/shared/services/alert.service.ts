
export interface Alert{
  text:string
  type:AlertType
}
export type AlertType='success' | 'warning' | 'danger'
@Injectable({

}) export class AlertService{
  public alert$=new Subject<Alert>()
  success(text:string){
    this.alert$.next({type:'success'})
  }
  warning(text:string){
    this.alert$.next({type:'warning'})
  }
  danger(text:string){
    this.alert$.next({type:'danger'})
  }
}
