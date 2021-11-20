import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants, TelevisionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
@Component({
  selector: 'app-tv-channels',
  templateUrl: './tv-channels.component.html',
  styleUrls: ['./tv-channels.component.css']
})
export class TvChannelsComponent implements OnInit {
  stationForm: FormGroup[] = []
  stations: Array<any> = [{
    "id": '1',
    "name": "CTV"
  },
  {
    "id": '2',
    "name": "CityTV"
  },
  {
    "id": '3',
    "name": "CBC"
  },
  {
    "id": '4',
    "name": "Global"
  },
  {
    "id": '5',
    "name": "TVA"
  },
  {
    "id": '6',
    "name": "V"
  },
  {
    "id": '7',
    "name": "SRC"
  }
  ]
  timeLines: Array<any> = [
    {
      "id": "1",
      "label": "Select answer"
    },
    {
      "id": "2",
      "label": "I don't watch this channel"
    },
    {
      "id": "3",
      "label": "Upto 30 minutes"
    },
    {
      "id": "4",
      "label": "More than 30 minutes up to 1 hr"
    },
    {
      "id": "5",
      "label": "More than 1 hour up to 2 hours"
    },
    {
      "id": "6",
      "label": "More than 2 hours up to 3 hours"
    }

  ]
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, 
    private televisionService:TelevisionService) {
   
  }
  memberNo: any;
  ngOnInit(): void {
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    this.stations.forEach((station, i) => {
      this.createForm(station.id);
      // for (let d of this.timeLines) {
      //   this.addMore(d, i + 1);
      // }
    });

    this.televisionService.getCustomRequest(TelevisionConstants.getStations + this.memberNo).
    subscribe(response => {
      console.log(response);
    });
  }

  createForm(genereId: number) {
    this.stationForm[genereId] = this.fb.group({
      weekDays: new FormControl("1"),
      weekEnds: new FormControl("1")
    });
  }

  submit() {
    console.log(this.stationForm);
    // if(this.isTvGenere){
    }
}
