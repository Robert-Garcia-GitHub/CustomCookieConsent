import { LightningElement, api, track } from "lwc";

export default class ForceLanguage extends LightningElement {
  @api forcedLanguage;

  @track preview;
  @track language;

  checkIfInPreview() {
    let urlToCheck = window.location.href;
    if (!urlToCheck) {
      urlToCheck = window.location.hostname;
    }
    if (!urlToCheck) {
      this.preview = false;
    } else {
      urlToCheck = urlToCheck.toLowerCase();
      this.preview =
        urlToCheck.indexOf("sitepreview") >= 0 ||
        urlToCheck.indexOf("livepreview") >= 0;
    }
  }

  getQueryParams(url, decode) {
    const params = [];
    var count = 0;
    const question = url.indexOf("?");
    if (question >= 0) {
      const paramArr = url.slice(question + 1).split("&");
      paramArr.map((param) => {
        const [key, val] = param.split("=");
        if (decode === true) {
          params[key] = decodeURIComponent(val);
        } else {
          params[key] = val;
        }
        count++;
      });
    }
    params[""] = count;
    return params;
  }

  rebuildQueryParams(url, params) {
    var result = url.replace(/[?].*$/, "");
    var count = 0;
    for (let key in params) {
      if (key !== "") {
        result += (count++ === 0 ? "?" : "&") + key + "=" + params[key];
      }
    }
    return result;
  }

  connectedCallback() {
    this.checkIfInPreview();
  }

  renderedCallback() {
    var url = window.location.href;
    var params = this.getQueryParams(url, false);

    this.language = this.forcedLanguage;

    if (!this.preview) {
      if (params[""] === 0) {
        window.location.href = url + "?language=" + this.language;
      } else if (
        params["language"] === undefined 
        // || params["language"] !== this.language
      ) {
        params["language"] = this.language;
        window.location.href = this.rebuildQueryParams(url, params);
      }
    }
  }
}
