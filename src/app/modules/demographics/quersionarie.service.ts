import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { QuestionConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { Question } from "../login/model/question.model";
import { User } from "../login/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService extends ResourceService<Question> {
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        QuestionConstants.questionaire);
    }
  }