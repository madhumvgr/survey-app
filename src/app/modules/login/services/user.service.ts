import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { User, UserSerializer } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
    constructor(httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        UrlConstants.registerUser,
        new UserSerializer());
    }
  }