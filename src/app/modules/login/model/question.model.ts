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
  noSkip?: string;
  skip?: string
  answer?: any;
  maxLevel?:any;
  required?:any;
  mandatory?:any;
  mainQueId?: any;
  questionLevel1Id?:any;
  questionLevel2Id?:any;
  selected?:any[] =[];
  titleFr?: string;
  hhQueNo?:string;
  condition?: any;
  subQuestions?: Question[]=[];
  subSurveyQueAnsDTO?: Question[]=[];
  condQuestionId?: number;
  condQuestionLevel1Id?: null;
  condQuestionLevel2Id?: null;
  condAnswer?: string;
  condQueType?: string;
  condMaxLevel?: string;
  condOtherDescription?: string;
  extraCond?: string;
  disabled?: boolean;
  subQuestion?:string;
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