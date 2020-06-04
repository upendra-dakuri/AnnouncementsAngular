import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, RequiredValidator} from '@angular/forms';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.css']
})
export class EditAnnouncementComponent implements OnInit {
  public post: any = {};
  public id: number;
  editForm:FormGroup;
  notification;
 //imageDisabled:Boolean = true;
  //environmentURL:String = environment.api + "/";
  selectedFile: File=null;
  tagList:String [] = [];


  constructor(private authService:AuthServiceService, private router:ActivatedRoute,private fb:FormBuilder,private route:Router) { 
    this.editForm = this.fb.group({
      title:[''],
      description:[''],
      subject:[''],
      link:[''],
      //image:[''],
     tags:['',Validators.required],
      date:['']
    })
  }

  ngOnInit(): void {
   this.id=this.router.snapshot.params['id']
    this.authService.getAnnouncementById(this.id).subscribe(result =>{
      console.log(result);
      this.post = result;
      this.notification=result;
      //console.log(post.image);
    },(error:any)=>alert("Announcements Cannot be Displayed"));
   console.log(this.post);
  
  }
  addToTags(){
    if(this.tagList === null){
      this.tagList = [];
    }
    var count = 0;
    for(var i=0;i < this.tagList.length;i++){
      if(this.editForm.get('tags').value==="" || this.editForm.get('tags').value === this.tagList[i]){
        count = count+1;
      }
    }
    if(this.editForm.get('tags').value!=="" &&(count === 0 || this.tagList.length === 0)){
      this.tagList.push(this.editForm.get('tags').value);
    }
    
    console.log(this.tagList)
  }

  onFileSelected(event){
    this.selectedFile =<File> event.target.files[0];
  }
  editScheduled(){
   
    const id = this.router.snapshot.params['id'];
    const fd = new FormData();
    if(this.selectedFile != null){
      fd.append('image',this.selectedFile,this.selectedFile.name);
    }
   
    fd.append('title',this.editForm.get('title').value);
    fd.append('description',this.editForm.get('description').value);
    fd.append('subject',this.editForm.get('subject').value);
    fd.append('link',this.editForm.get('link').value);
    fd.append('tags',JSON.stringify(this.tagList));
    fd.append('date',this.notification.date);
    //console.log(this.editForm.get('tags').value);
   // console.log(this.notification.scheduledDate)*/
    console.log(fd);
    console.log(this.editForm.value)
    //console.log("Tags: "+this.editForm.get('tags').value);
   this.editForm.patchValue({
     tags:this.tagList
    })
    if(this. editForm.valid){
      console.log('Post Announcement Called');
      console.log(this.editForm.value);
      //this.saveAnnouncementButton = true;
      console.log(fd)
      this.authService.editAnnouncement(id,this.editForm.value).subscribe( result =>{
        console.log("Announcement :",result);
        alert("Announcement Updated Succesfully");
        this.route.navigate(['/scheduled']);
      },(error:any)=>alert("Error in sending Annnouncement"))
    }
  }

    }
  

