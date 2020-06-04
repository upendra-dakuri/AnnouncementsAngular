import { Component, OnInit, TestabilityRegistry} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, RequiredValidator} from '@angular/forms';
import {AuthServiceService} from '../api.service';
import { Router } from '@angular/router';
   
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  title  = 'Create Announcement';
  public scheduleMessage =  "Announcement Scheduled"; 
  public announcementMessage = "Announcement Posted";
  selectedFile: File=null;
  notificationForm:FormGroup;
  tagList:String [] = [];
  scheduleHidden:Boolean = true;

  constructor(private router:Router, private authService:AuthServiceService, private fb:FormBuilder) {
    this.notificationForm = this.fb.group({
      title:[''],
      subject:[''],
      description:[''],
      link:[''],
      image:[''],
      tags:['', Validators.required],
      scheduledTime:['']
    })
   }

  ngOnInit(): void {
}

onFileSelected(event){
  this.selectedFile =<File> event.target.files[0];
}

logout(){
  localStorage.clear();
  this.authService.logout();
  this.router.navigateByUrl('');
}

cancel(){
  window.location.reload();
}

getTags(){
  this.authService.getTags().subscribe(result =>{
    console.log(result[0]);

  },(error:any)=>alert("Invalid Username or Password"))
}

addToTags(){
  console.log(this.tagList.length)
  var count = 0;
  for(var i=0;i < this.tagList.length;i++){
    if(this.notificationForm.get('tags').value==="" || this.notificationForm.get('tags').value === this.tagList[i]){
      count = count+1;
    }
  }
  if(this.notificationForm.get('tags').value!=="" &&(count === 0 || this.tagList.length === 0)){
    this.tagList.push(this.notificationForm.get('tags').value);
  }
  
  console.log(this.tagList)
}

postAnnouncement(){
  const fd = new FormData();
  if(this.selectedFile != null){
    fd.append('image', this.selectedFile, this.selectedFile.name);
  }

    fd.append('title',this.notificationForm.get('title').value);
    fd.append('subject',this.notificationForm.get('subject').value);
    fd.append('description',this.notificationForm.get('description').value);
    fd.append('link',this.notificationForm.get('link').value);
    fd.append('tags',JSON.stringify(this.tagList));
    fd.append('scheduledTime', this.notificationForm.get('scheduledTime').value);
    console.log(this.notificationForm.get('scheduledTime').value)
  console.log(fd);
  if(this.notificationForm.valid){
        alert("Announcement Posted");
        console.log('Post Announcement Called');       
        console.log(this.notificationForm.value);
        this.authService.postAnnouncement(fd).subscribe(result=>{
          console.log(result);
          this.router.navigateByUrl('/admin');
  }, (error:any)=> alert("Error in sending Announcement"))        
  }

 }
 scheduleAnnouncement(){
  this.scheduleHidden = false;
}

announcementSchedule(){
  alert(this.scheduleMessage);

}

announceNow(){
  alert(this.announcementMessage);
}

}

 