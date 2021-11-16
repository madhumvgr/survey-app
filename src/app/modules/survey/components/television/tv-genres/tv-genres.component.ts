import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-genres',
  templateUrl: './tv-genres.component.html',
  styleUrls: ['./tv-genres.component.css']
})
export class TvGenresComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  navigateToChannel() {
    this.router.navigateByUrl('/television/tv-channels');
  }

}
