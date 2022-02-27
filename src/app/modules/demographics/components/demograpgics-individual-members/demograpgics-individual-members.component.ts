import { Component, OnInit } from '@angular/core';
import { QuestionConstants } from 'src/app/shared/models/url-constants';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-demograpgics-individual-members',
  templateUrl: './demograpgics-individual-members.component.html',
  styleUrls: ['./demograpgics-individual-members.component.css']
})
export class DemograpgicsIndividualMembersComponent implements OnInit {

  memberList: any[]= [];
  constructor(public questionaireService: QuestionaireService) { }

  ngOnInit(): void {
    this.questionaireService.customRead(QuestionConstants.memberIndividualList).subscribe( list => {
      console.log(list);
      this.memberList = list;
    })
  }

}
