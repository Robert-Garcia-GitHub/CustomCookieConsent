public with sharing class displayUserHelper {
    public displayUserHelper() {

    }

    @AuraEnabled
    public static String getUserId() {  
        return UserInfo.getUserId();
    }

    @AuraEnabled
    public static String getUserEmail() {
        return UserInfo.getUserEmail();
    }

    @AuraEnabled
    public static String getUserName() {
        return UserInfo.getUserName();
    }

    @AuraEnabled
    public static String getName() {
        return UserInfo.getName();
    }

    @AuraEnabled
    public static String getLanguage() {
        return UserInfo.getLanguage();
    }

    @AuraEnabled
    public static String getLanguageLocaleKey() {
        User u = [SELECT LanguageLocaleKey FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        return u.LanguageLocaleKey;
    }
}