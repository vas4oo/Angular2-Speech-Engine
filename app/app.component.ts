import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
    showSearchButton: boolean;
    speechData: string;
    showDisableButton: boolean;
    showUpdate: boolean;
    showAdd:boolean;
    tagName = document.getElementsByTagName("button");

    constructor(private speechRecognitionService: SpeechRecognitionService) {
        this.showSearchButton = true;
        
        this.speechData = "";
    }

    ngOnInit() {
        console.log("hello");
        console.log(this.tagName);
        this.showDisableButton = false;
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;
        this.showDisableButton = true;

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                if(value == document.getElementById("update").name){
                    this.onUpdateClick();
                }
                if(value == document.getElementById("add").name){
                    this.onAddClick();
                }
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                    //this.onDisableClick();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                if(this.speechData == "update"){
                    this.onUpdateClick();
                }
                //this.activateSpeechSearchMovie();
            });
    }
    onDisableClick(){
        this.speechRecognitionService.speechRecognition.stop();
        this.showDisableButton = false;
        this.showSearchButton = true;

    }
    onUpdateClick() {
        this.showUpdate = true;
        this.showAdd = false;
    }
    onAddClick(){
        this.showUpdate = false;
        this.showAdd = true;
    }
}