
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
}

export class NotificationConstants {
    public static api ="api/portal-notifications";
}
