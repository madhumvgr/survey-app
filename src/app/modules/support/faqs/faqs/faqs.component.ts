import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  isScrollTop!: boolean;
  isSSP: boolean = false;
  isVAM: boolean = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getExistingHomes().subscribe(existingHomes => { 
      if (existingHomes && existingHomes.panels) {
        const panelIds = existingHomes.panels.map((obj: any) => obj.id);
        console.log(panelIds);
        const filteredArray = panelIds.filter((value:any) => ['620','621','630','631'].includes(value));
        if(!filteredArray.length) {
          const filteredArray = panelIds.filter((value:any) => ['001','010','020','021','030','031','041','050','060','070'].includes(value));
           this.isSSP = filteredArray.length ? true : false;
           
        } else {
          this.isVAM = true;
        }
      
      }
      });
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
