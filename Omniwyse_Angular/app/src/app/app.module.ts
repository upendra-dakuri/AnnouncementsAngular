import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes, ROUTES} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';



import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NotificationsComponent,
    ViewNotificationComponent,
    ScheduledComponent,
    EditAnnouncementComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    
   
  ],
  providers: [AuthGuard,{ 
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
