import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

contact(){
  window.open("https://omniwyse.com/Contact-Us", "_blank");
}

}
