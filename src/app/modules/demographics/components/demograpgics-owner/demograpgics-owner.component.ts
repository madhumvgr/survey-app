import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-demograpgics-owner',
  templateUrl: './demograpgics-owner.component.html',
  styleUrls: ['./demograpgics-owner.component.css']
})
export class DemograpgicsOwnerComponent implements OnInit {
  member: any;
  panelistType:any;
  houseHold = false;
  constructor(public questionaireService: QuestionaireService,  private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.questionaireService.customRead(QuestionConstants.memberHouseHoldList).subscribe( list => {
      this.member = list;
      this.localStorageService.setIndividualName(this.member.memberName);
      this.panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
      if(this.panelistType == "SSP"){
          this.houseHold = true;
      }
    })
  }

  continueNavigate(memberNo:any,homeNo:any, memberName:string){
    this.router.navigateByUrl('/demographics/questionaire/true/'+memberNo+'/true/1');
  }
}
