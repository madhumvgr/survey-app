import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-demograpgics-individual-members',
  templateUrl: './demograpgics-individual-members.component.html',
  styleUrls: ['./demograpgics-individual-members.component.css']
})
export class DemograpgicsIndividualMembersComponent implements OnInit {

  memberList: any[]= [];
  constructor(public questionaireService: QuestionaireService,  private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.questionaireService.customRead(QuestionConstants.memberIndividualList).subscribe( list => {
      console.log(list);
      this.memberList = list;
    })
  }

  continueNavigate(memberNo:any,homeNo:any, memberName:string){
    this.localStorageService.setIndividualName(memberName);
    this.router.navigateByUrl('/demographics/questionaire/'+memberNo+'/'+homeNo+'/1');
  }

}
