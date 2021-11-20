import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';

@Component({
  selector: 'app-tv-genres',
  templateUrl: './tv-genres.component.html',
  styleUrls: ['./tv-genres.component.css']
})
export class TvGenresComponent implements OnInit {
  memberNo: string | undefined;
  constructor(private router: Router, private televisionService: TelevisionService,
    private Activatedroute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.memberNo = this.Activatedroute.snapshot.params['memberNo'];
    this.getTelevisionByMembers(this.memberNo);
  }

  getTelevisionByMembers(memberId:any) {
    this.televisionService.tvStationByMember(memberId).subscribe(
      (res: any) => {
        console.log(res);
        // this.router.navigateByUrl('/television/tv-channels');
      }
    );
  }

  navigateToChannel(){
    this.router.navigateByUrl('/television/tv-channels');
  }
}
