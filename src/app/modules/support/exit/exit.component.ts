import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit {
  newValue:any;
  data: any;
  message: any;
  state:any;
  constructor(private Activatedroute: ActivatedRoute, private router: Router) {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
    this.message = this.router.getCurrentNavigation()?.extras?.state?.message;
   }

  ngOnInit(): void {
    this.newValue = this.Activatedroute.snapshot.params['value'];
  }

}
