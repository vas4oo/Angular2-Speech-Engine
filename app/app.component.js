"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var speech_recognition_service_1 = require("./speech-recognition.service");
var AppComponent = (function () {
    function AppComponent(speechRecognitionService) {
        this.speechRecognitionService = speechRecognitionService;
        this.showSearchButton = true;
        this.speechData = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("hello");
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.speechRecognitionService.DestroySpeechObject();
    };
    AppComponent.prototype.activateSpeechSearchMovie = function () {
        var _this = this;
        this.showSearchButton = false;
        this.speechRecognitionService.record()
            .subscribe(
        //listener
        function (value) {
            _this.speechData = value;
            console.log(value);
        }, 
        //errror
        function (err) {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                _this.activateSpeechSearchMovie();
            }
        }, 
        //completion
        function () {
            _this.showSearchButton = true;
            console.log("--complete--");
            _this.activateSpeechSearchMovie();
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-lg-12 col-md-12\">\n            <div class=\"card\">\n                <div class=\"header\">\n                    <h4 class=\"title\">&nbsp;&nbsp; Web Speech API in Angular2</h4>\n                </div>\n                <div class=\"content\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\"></div>\n                        <div class=\"col-md-8\">\n                            <div class=\"form-group\">\n                                <label></label>\n                                <input type=\"text\" class=\"form-control border-input\" name=\"txtSpeechSearchMovieName\" id=\"txtSpeechSearchMovieName\" value=\"\"\n                                       placeholder=\"Click below button and then say something!!!\" [(ngModel)]=\"speechData\">\n                            </div>\n                        </div>\n                        <div class=\"col-md-2\"></div>\n                    </div>\n                    <br />\n                    <div class=\"text-center\">\n                        <button class=\"btn btn-info btn-fill btn-wd\" name=\"btnActivateSpeechSearchMovie\" id=\"btnActivateSpeechSearchMovie\" (click)=\"activateSpeechSearchMovie()\"\n                                [disabled]=\"!showSearchButton\">\n                            Enable Speech Search\n                        </button>\n                    </div>\n                    <br />\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"
    }),
    __metadata("design:paramtypes", [speech_recognition_service_1.SpeechRecognitionService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map