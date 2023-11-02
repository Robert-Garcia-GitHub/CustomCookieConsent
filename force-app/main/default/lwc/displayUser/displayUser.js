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
    this.getUserDetails().then((result) => {});
  }

  async getUserDetails() {
    this.displayUserId = await getUserId();
    this.displayUserName = await getName();
    this.displayUserUsername = await getUserName();
    this.displayUserEmail = await getUserEmail();
    this.displayUserLanguage = await getLanguage();
    this.displayUserLanguageLocaleKey = await getLanguageLocaleKey();
  }

  getQueryParams(url, decode) {
    const paramArr = url.slice(url.indexOf("?") + 1).split("&");
    const params = [];
    var count = 0;
    paramArr.map((param) => {
      const [key, val] = param.split("=");
      if (decode === true) {
        params[key] = decodeURIComponent(val);
      } else {
        params[key] = val;
      }
      count++;
    });
    params[""] = count;
    return params;
  }

  renderedCallback() {
    var params = this.getQueryParams(window.location.href, false);
    console.log(params[""]);
    for (var key in params) {
      console.log(key + " = " + params[key]);
    }
  }
}
