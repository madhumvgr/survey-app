
export class UrlConstants {
    public static login ="api/authenticate";
    public static changePassword ="api/account/change-password";
    public static initiateForgotPassword = "api/account/reset-password/init"
    public static finishForgotPassword = "api/account/reset-password/finish"
    public static registerUser = "api/register";
    public static registerKeyForOtp = "api/portal-user-otps"
    public static getExistingHomes = "api/prod-homes"
}

export class DeviceConstants {
    public static deviceDetails ="api/account";
    public static deviceCountWithStatus ="api/deviceCountWithStatus";
    public static deviceListByStatus ="api/deviceListByStatus/"; 
    public static deviceOwnerByDeviceId ="api/deviceOwnerByDeviceId/"; 
    public static memberListByDeviceId ="api/memberListByDeviceId/"; 
    public static memberDeviceUsagePostUrl= "api/memberDeviceUsage";
    public static memberDeviceUsageGetUrl= "api/memberListByDeviceId/"
    
 
    public static deviceInfo="api/deviceInfo/";
    public static deviceInnerInfo="api/portal-devices/";
    public static devicePreviousStatus="api/portal-devices/status/";

    public static deviceCoviewer= "api/portalDeviceCoviewer/";
    public static deviceCoviewerPostUrl = "api/portalDeviceCoviewer";

    public static deviceGenersGetUrl ="api/portal-genres/";
    public static deviceGenersPostUrl ="api/portal-genres";

    public static selectGenersGetUrl ="api/device-genres-mapping/";
    public static selectGenersPostUrl ="api/device-genres-mapping";

    public static selectChannelGetUrl ="api/device-channel-mapping/";
    public static selectChannelPostUrl ="api/device-channel-mapping";

    public static deviceHouseHoldSurveyPostUrl = "api/portal-survey-trackers/householdSurvey/";
    public static memberHouseHoldSurveyPostUrl = "api/portal-survey-trackers/memberSurvey/";
    
    public static markNotInUse = "api/portal-devices/markNotInUse/";
    public static markInUse = "api/portal-devices/markInUse/";
    //public static memberHouseHoldSurveyPostUrl = "api/portal-survey-trackers/memberSurvey/";
    public static techSupport ="api/tech-supports";
}

export class NotificationConstants {
    public static api ="api/portal-notifications";
}

export class TelevisionConstants {
    public static memberList ="api/memberListByDeviceId-television";
    public static tvStationByMember ="api/portal-genres-television/";
    public static updateTimeLine="api/portal-genres-television";
    public static markMember="api/portal-survey-trackers-television/memberSurvey/";

    //station apis with out device id
    public static getStations= "api/portal-tv-claim-stations-television/byMember/";
    public static updateStations= "api/portal-tv-claim-stations-television";

    //station apis with device id
    public static getStationsWithDeviceId= "api/portal-tv-stations/";
    public static updateStationsWithDeviceId= "api/portal-tv-claim-stations";

}

export class QuestionConstants {
    public static questionaire ="api/survey-questions-individual";    
    public static vam_questionaire ="api/vam-survey-questions-individual";
    public static answers ="api/survey-answers";
    public static vam_answers ="api/vam-survey-answers";
    public static memberIndividualList = "api/memberListOfDemoSurvey";
    public static markSurveyCompleted = "api/survey-answers-completed/";

    // public static questionaire ="api/survey-questions-individual";
    // public static answers ="api/survey-answers";
    public static houseHoldQuestions = "api/survey-questions-household";
    public static vam_houseHoldQuestions = "api/vam-survey-questions-household";
    public static houseHoldAnswers = "api/household-survey-answers";
    public static vam_houseHoldAnswers ="api/vam-household-survey-answers";
    public static memberHouseHoldList = "api/householdStatusOfDemoSurvey";
    public static markHouseHold = "api/household-survey-answers-completed/";

}
