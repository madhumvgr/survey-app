import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-demograpgics-owner',
  templateUrl: './demograpgics-owner.component.html',
  styleUrls: ['./demograpgics-owner.component.css']
})
export class DemograpgicsOwnerComponent implements OnInit {
  memberList: any[]= [];
  constructor(public questionaireService: QuestionaireService,  private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.questionaireService.customRead(QuestionConstants.memberHouseHoldList).subscribe( list => {
      this.memberList = list;
    })
  }

  continueNavigate(memberNo:any,homeNo:any, memberName:string){
    this.localStorageService.setIndividualName(memberName);
    this.router.navigateByUrl('/demographics/questionaire/'+memberNo+'/'+homeNo+'/1');
  }
}
