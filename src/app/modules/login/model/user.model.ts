import { Resource } from "src/app/shared/services/http-resource.service";

export class User extends Resource {
    //id is inherited from Resource
    name: string | undefined;
    activated: boolean | false | undefined;
    authorities!: string[];
    createdBy!: string;
    createdDate!: string;
    email: string | undefined;
    firstName: string | undefined;
    id: number | undefined;
    imageUrl: string | undefined;
    langKey: string | undefined;
    lastModifiedBy: string | undefined;
    lastModifiedDate: string | undefined;
    lastName: string | undefined;
    login: string | undefined;
    password: string | undefined;
    profileId: string | undefined
}

export class UserSerializer {
    fromJson(json: any): User {
      const user = new User();
      user.id = json.id;
      user.name = json.name;
      return user;
    }
  
    toJson(user: User): any {
      return {
        id: user.id,
        name: user.name
      };
    }
  }