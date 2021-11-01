
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
    public static memberDeviceUsagePostUrl= "api/deviceOwnerByDeviceId";
    public static deviceInfo="api/deviceInfo/";

    public static deviceCoviewer= "api/portalDeviceCoviewer/"
}

export class NotificationConstants {
    public static api ="api/portal-notifications";
}