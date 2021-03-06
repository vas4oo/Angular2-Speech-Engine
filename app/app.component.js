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
        this.tagName = document.getElementsByTagName("button");
        this.pulsing = document.getElementsByClassName("pulse-button");
        this.showSearchButton = true;
        this.speechData = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("hello");
        console.log(this.tagName);
        this.showDisableButton = false;
        this.myStyle = "none";
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.speechRecognitionService.DestroySpeechObject();
    };
    AppComponent.prototype.activateSpeechSearchMovie = function () {
        var _this = this;
        this.showSearchButton = false;
        this.showDisableButton = true;
        this.myStyle = "block";
        this.speechRecognitionService.record()
            .subscribe(
        //listener
        function (value) {
            _this.speechData = value;
            if (value == document.getElementById("update").name) {
                _this.onUpdateClick();
            }
            if (value == document.getElementById("add").name) {
                _this.onAddClick();
            }
            if (value == document.getElementById("delete").name) {
                _this.onDeleteClick();
            }
            console.log(value);
            if (value) {
                _this.onDisableClick();
            }
        }, 
        //errror
        function (err) {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                _this.activateSpeechSearchMovie();
                _this.onDisableClick();
            }
        }, 
        //completion
        function () {
            _this.onDisableClick();
            console.log("--complete--");
            //this.activateSpeechSearchMovie();
            if (!_this.speechData) {
                _this.onDisableClick();
            }
        });
    };
    AppComponent.prototype.onDisableClick = function () {
        this.speechRecognitionService.speechRecognition.stop();
        this.showDisableButton = false;
        this.showSearchButton = true;
    };
    AppComponent.prototype.onUpdateClick = function () {
        this.showUpdate = true;
        this.showAdd = false;
        this.showDelete = false;
    };
    AppComponent.prototype.onAddClick = function () {
        this.showUpdate = false;
        this.showAdd = true;
        this.showDelete = false;
    };
    AppComponent.prototype.onDeleteClick = function () {
        this.showUpdate = false;
        this.showAdd = false;
        this.showDelete = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html'
    }),
    __metadata("design:paramtypes", [speech_recognition_service_1.SpeechRecognitionService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map