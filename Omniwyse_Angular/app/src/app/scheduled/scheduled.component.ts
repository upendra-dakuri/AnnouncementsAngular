import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  public postList: any = [];
  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    var admin = localStorage.getItem('isAdmin');
    console.log(admin);
    if(admin === 'true'){
    this.authService.getScheduledAnnouncement().subscribe(result =>{
      console.log(result);
      this.postList = result;
      //console.log(postList.image);
    },(error:any)=>alert("Announcements Cannot be Displayed"));
   console.log(this.postList);
  
 }else{
  var userid = localStorage.getItem('id');
  console.log(userid);
  var tags;
  this.authService.getTagsByUserId(userid).subscribe(result =>{
     console.log(result);
     tags = JSON.stringify(result);
     console.log(tags);


  }) 
 setTimeout(()=>{
    this.authService.getAnnouncementByTags(tags).subscribe(announcements =>{
      this.postList= announcements;
      console.log(announcements);

    })

 }, 1000)

 }

}
goToUpdate(id)
{
  this.router.navigate(['/update',id])
}
deleteAnnouncement(id)
{
  this.authService.getDelete(id).subscribe(result =>{
    alert("Announcement Deleted");
    console.log(result);
    this.router.navigate(['/scheduled'])
  })
}
}

