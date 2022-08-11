import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  isScrollTop!: boolean;
  panelistType = localStorage.panellistType;
  language: any;

  constructor(private deviceService: DeviceService, private localStorageService: LocalStorageService) {
    this.language = this.localStorageService.getItem(StorageItem.LANG);
   }

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
  // When the user scrolls down 1000px from the top of the document, show the button
scrollFunction() {
  this.language = localStorage.lang;
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
