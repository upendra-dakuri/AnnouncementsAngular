import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from  'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }

loggedIn(){
  return !!localStorage.getItem('token');
}

getToken(){
  return localStorage.getItem('token');
}

logout(){
 return localStorage.removeItem('ACCESS_TOKEN');
}

getTags():Observable<any>{
  return this.httpClient.get(environment.api+'/tags');
}

  login(data):Observable<any>{
    return this.httpClient.post(environment.api+'/login',data);
  }

  postAnnouncement(data):Observable<any>{
    return this.httpClient.post(environment.api+'/announcement', data);
  }

  getAnnouncement():Observable<any>{
    return this.httpClient.get(environment.api+'/getAll');
  }

  getAnnouncementById(id):Observable<any>{
    return this.httpClient.get(environment.api+'/announcement/'+id);
  }

  getTagsByUserId(userid:String):Observable<any>{
    return this.httpClient.get(environment.api+'/userintags/'+'"'+userid+'"');
  }

  getAnnouncementByTags(tags:String):Observable<any>{
    return this.httpClient.get(environment.api+'/announcementbytags/'+tags);
  }
 
  getDelete(id):Observable<any>{
    return this.httpClient.delete(environment.api+'/delete/'+id);
  }
  getScheduledAnnouncement():Observable<any>{
    return this.httpClient.get(environment.api+'/scheduled');
  }
  editAnnouncement(id,data)
  {
    return this.httpClient.put(environment.api+'/update/'+id,data)
  }
}
