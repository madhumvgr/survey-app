import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollInView(id:string){
    const dom:any = document.getElementById(id);
    if(dom){
      dom.scrollIntoView();
    }
  }

}
