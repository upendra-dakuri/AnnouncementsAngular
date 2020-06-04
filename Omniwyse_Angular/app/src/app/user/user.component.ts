import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthServiceService} from '../api.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    message = "Welcome to Dashboard";
    public postList: any = [];

  constructor(private authService:AuthServiceService, private router:Router, private route:ActivatedRoute) { }
  name:String='';
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    var  admin=localStorage.getItem('isAdmin');
    console.log(admin);
    
    var userid = localStorage.getItem('id');
    var tags;
    this.authService.getTagsByUserId(userid).subscribe(result=>{
      console.log(result);
       tags = JSON.stringify(result);
     
    })
    setTimeout(()=>{
      this.authService.getAnnouncementByTags(tags).subscribe(announcements=>{
        this.postList = announcements;
        console.log(announcements)
      })
    },1000)
    
  
}

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  goToNotification(id) {
    this.router.navigate(['/view-notification',id]);
  }
  

}
