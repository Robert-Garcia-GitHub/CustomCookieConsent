import { LightningElement, api, track } from "lwc";

import getUserId from "@salesforce/apex/displayUserHelper.getUserId";
import getUserName from "@salesforce/apex/displayUserHelper.getUserName";
import getUserEmail from "@salesforce/apex/displayUserHelper.getUserEmail";
import getName from "@salesforce/apex/displayUserHelper.getName";
import getLanguage from "@salesforce/apex/displayUserHelper.getLanguage";
import getLanguageLocaleKey from "@salesforce/apex/displayUserHelper.getLanguageLocaleKey";

export default class Userinfoexample extends LightningElement {
  @track displayUserId = "";
  @track displayUserUsername = "";
  @track displayUserEmail = "";
  @track displayUserName = "";
  @track displayUserLanguage = "";
  @track displayUserLanguageLocaleKey = "";
  @track displayUserError = "none";

  @api userDataVisible;

  fromDate = "";
  toDate = "";

  connectedCallback() {
    this.getUserDetails().then(result => {});
  }

  async getUserDetails() {
    this.displayUserId = await getUserId();
    this.displayUserName = await getName();
    this.displayUserUsername = await getUserName();
    this.displayUserEmail = await getUserEmail();
    this.displayUserLanguage = await getLanguage();
    this.displayUserLanguageLocaleKey = await getLanguageLocaleKey();
  }
 }