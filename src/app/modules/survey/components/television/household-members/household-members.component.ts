import { Component, OnInit } from '@angular/core';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';

@Component({
  selector: 'app-household-members',
  templateUrl: './household-members.component.html',
  styleUrls: ['./household-members.component.css']
})
export class HouseholdMembersComponent implements OnInit {

  constructor(private televisionService : TelevisionService) { }
  members:any = [];
  ngOnInit(): void {
    this.getTelevisionMembers();
  }

  async getTelevisionMembers(){
    let res:any = await this.televisionService.getTelevision().toPromise();
    this.members = res;
    console.log(this.members)

  }
 
}

