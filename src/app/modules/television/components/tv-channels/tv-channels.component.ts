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
  memberNo: any;
  memberName: any;
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
    private televisionService: TelevisionService,
    private localStorageService: LocalStorageService) {
      this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
  }

  ngOnInit(): void {
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    this.stations.forEach((station, i) => {
      this.createForm(station.id);
    });

    this.televisionService.getCustomRequest(TelevisionConstants.getStations + this.memberNo).
      subscribe(response => {
        this.setPreviousValues(response);
      });
  }

  createForm(genereId: number) {
    this.stationForm[genereId] = this.fb.group({
      weekDays: new FormControl("1"),
      weekEnds: new FormControl("1")
    });
  }

  setPreviousValues(genereList: any) {
    genereList.forEach((element: any) => {
      if (element.portalTvStationUsageDTO) {
        this.stationForm[element.stationId]?.patchValue({
          weekDays: element.portalTvStationUsageDTO.avgWeekdayUsa?''+element.portalTvStationUsageDTO.avgWeekdayUsa:'1',
          weekEnds: element.portalTvStationUsageDTO.avgWeekendUsa?''+element.portalTvStationUsageDTO.avgWeekendUsa:'1'
        }); 
      }
    });
  }

  submit() {
    
    this.televisionService.updateMemberSurvey(this.memberNo).subscribe(
      res => {
        this.router.navigateByUrl('television/thankyou');
      });
  }


  updateTimeLine(generId: any) {
    console.log(generId);
    let weekDayStationValue, weekEndstationValue;
    weekDayStationValue = this.stationForm[generId]?.get('weekDays')?.value;
    weekEndstationValue = this.stationForm[generId]?.get('weekEnds')?.value;

    let updateItem = {
      "stationClaimId": generId,
      "avgWeekdayUsa": weekDayStationValue,
      "avgWeekEndUsa": weekEndstationValue,
      "memberNo": this.memberNo,
      "portalTvStations": {
        "id": generId
      }
    }
    this.televisionService.updateTelevisionStation(updateItem).
      subscribe((response: any) => {
        console.log("Update record");
      });

  }

  // let item = control.value;
  // item['memberNo'] = this.memberNo;

  //if(this.isTvGenere){

  //}else{
  //   this.deviceService.updateDeviceTimeLine(item).
  //   subscribe((response: any) => {
  //     console.log("Update record");
  //   });
  // }
}

