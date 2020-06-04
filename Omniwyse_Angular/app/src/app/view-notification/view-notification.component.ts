import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthServiceService} from '../api.service';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {
  public postList: any = {};
  public id: number;


  constructor(private authService: AuthServiceService, private router: ActivatedRoute,private route : Router) { }


getAnnouncementById(id){
  id=this.router.snapshot.params['id']
  this.authService.getAnnouncementById(id).subscribe(result =>{
    console.log(result);
    this.postList = result;
    //console.log(postList.image);
  },(error:any)=>alert("Announcements Cannot be Displayed"));
 console.log(this.postList);
 let admin= localStorage.getItem('isAdmin');
 console.log(admin);
}

ngOnInit() {
   this.getAnnouncementById(this.router.snapshot.params['id']); 

}
goToNotification(id){
  this.route.navigate(['/view-notification',id]);
}
}
