import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-demographic-overview',
  templateUrl: './demographic-overview.component.html',
  styleUrls: ['./demographic-overview.component.css']
})
export class DemographicOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var json = { elements: [
      {
        "type": "matrixdropdown",
        "name": "Feelings",
        "title": "In the PAST 7 Days, have you accessed TV, Radio, or the Internet in locations other than your home?(Check YES or NO for each)",

        "columns": [
            {
              "name": "tv",
              "title": "TV",
                "cellType": "radiogroup",
                "showInMultipleColumns": true,
                "isRequired": true,
                "choices": ["Yes", "No"]
            },
            {
              "name": "radio",
              "title": "Radio",
              "cellType": "radiogroup",
              "showInMultipleColumns": true,
              "isRequired": true,
              "choices": ["Yes", "No"]
          },
          {
            "name": "internet",
            "title": "Internet",
            "cellType": "radiogroup",
              "showInMultipleColumns": true,
              "isRequired": true,
              "choices": ["Yes", "No"]
        }
        ],
        "rows": [
          {
            "value": "work",
            "text": "Work"
        }, {
            "value": "vehicle",
            "text": "Private vehicle(e.g., car,truck, motorcycle)"
        }, {
            "value": "cab",
            "text": "Public transit or taxicab"
        }, {
            "value":"other",
            "text": "Other (e.g., cafe,health club,bar)"
        }
        ]
    }
]
};
      var model = new Survey.ReactSurveyModel(json);
    Survey.SurveyNG.render('surveyContainer', { model: model });

  }

}
