import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message = "Welcome to Dashboard";
  formGroup: FormGroup;
  public postList: any = [];
  

  constructor(private authService: AuthServiceService, private router: Router){ }
  name:String='';
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    var admin = localStorage.getItem('isAdmin');
    console.log(admin);
    if(admin === 'true'){
    this.authService.getAnnouncement().subscribe(result =>{
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

 logout(){
  localStorage.clear();
  this.authService.logout();
  this.router.navigateByUrl('');
}

goToNotification(id) {
  this.router.navigate(['/view-notification',id]);
}

}
