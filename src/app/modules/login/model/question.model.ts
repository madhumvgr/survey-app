import { Resource } from "src/app/shared/services/http-resource.service";

export class Question extends Resource {
    //id is inherited from Resource
  queId? : string;
  queNo? : string;
  type? : string;
  queType? : string;
  name? : string;
  title? : string;
  description? : string;
  column? : any[];
  row? : any[];
  answer?: any;
  required?:any;
  }

  // {
  //   value : 3,
  //   seqNo : 1,
  //   text : Self,
  //   description : null

export class QuestionSerializer {
    fromJson(json: any): Question {
      const user = new Question();
      user.id = json.id;
      user.name = json.name;
      return user;
    }
  
    toJson(question: Question): any {
      return {
        id: question.id,
        name: question.name
      };
    }
  }