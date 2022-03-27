import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  isScrollTop!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  scrollInView(id:string){
    const dom:any = document.getElementById(id);
    if(dom){
      dom.scrollIntoView();
    }
  }

@HostListener("window:scroll", []) onWindowScroll() {
  this.scrollFunction();
}
  // When the user scrolls down 20px from the top of the document, show the button
scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) 
  {
    this.isScrollTop = true;
    } else {
    this.isScrollTop = false;

  }
}

// When the user clicks on the button, scroll to the top of the document
topFunction() 
  {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Oper
  }
}
