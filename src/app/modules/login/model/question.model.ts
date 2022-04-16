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
  descriptionFr?: string;
  column? : any[];
  row? : any[] = [];
  answer?: any;
  required?:any;
  mandatory?:any;
  questionLevel1Id?:any;
  questionLevel2Id?:any;
  selected?:any[] =[];
  titleFr?: string;
  hhQueNo?:string;
  }

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