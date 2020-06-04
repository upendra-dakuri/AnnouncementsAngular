import { NgModule } from '@angular/core';
import {AuthGuard} from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path:'notification', component:NotificationsComponent, canActivate:[AuthGuard]},
  {path:'view-notification/:id', component:ViewNotificationComponent},
  {path:'user', component:UserComponent},
  {path:'about', component:AboutComponent},
  {path:'scheduled',component:ScheduledComponent},
  {path:'update/:id',component:EditAnnouncementComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
