import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute) {
    let url = this.activatedroute.snapshot.url[0].path;
    console.log(url);
   }

  ngOnInit(): void {
  }

}
