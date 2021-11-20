import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';

@Component({
  selector: 'app-household-members',
  templateUrl: './household-members.component.html',
  styleUrls: ['./household-members.component.css']
})
export class HouseholdMembersComponent implements OnInit {


  members: any = [];
  constructor(private televisionService: TelevisionService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.getTelevisionMembers();
  }

  getTelevisionMembers() {
    this.televisionService.getTelevision().subscribe(
      (res: any) => {
        this.members = res;
      }
    );
  }
 
  continueNavigate(memberId:any){
    this.router.navigateByUrl('/television/tv-genres/'+memberId);
  }
}

