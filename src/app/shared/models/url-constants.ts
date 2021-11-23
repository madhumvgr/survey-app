
export class UrlConstants {
    public static login ="api/authenticate";
    public static changePassword ="api/account/change-password";
    public static initiateForgotPassword = "api/account/reset-password/init"
    public static finishForgotPassword = "api/account/reset-password/finish"
    public static registerUser = "api/register";
    public static registerKeyForOtp = "api/portal-user-otps"
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
    public static deviceInnerInfo="api/portal-devices/"

    public static deviceCoviewer= "api/portalDeviceCoviewer/";
    public static deviceCoviewerPostUrl = "api/portalDeviceCoviewer";

    public static deviceGenersGetUrl ="api/portal-genres/";
    public static deviceGenersPostUrl ="api/portal-genres";

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
