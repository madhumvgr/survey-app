import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
  public quersionSubject = new BehaviorSubject<any>(false);    
  public quersionSubjectRecevier$$ = this.quersionSubject.asObservable(); 
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        QuestionConstants.questionaire);
    }

    SetQuestionValid(value:any) {
      this.quersionSubject.next(value)
    }
  }