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
    showDelete:boolean;
    tagName = document.getElementsByTagName("button");
    pulsing = document.getElementsByClassName("pulse-button");
    myStyle: string;

    constructor(private speechRecognitionService: SpeechRecognitionService) {
        this.showSearchButton = true;
        
        this.speechData = "";
    }

    ngOnInit() {
        console.log("hello");
        console.log(this.tagName);
        this.showDisableButton = false;
        this.myStyle = "none";
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;
        this.showDisableButton = true;
        this.myStyle = "block";

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
                if(value == document.getElementById("delete").name){
                    this.onDeleteClick();
                }
                console.log(value);
                if(value){
                this.onDisableClick();
                }
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                    this.onDisableClick();
                }
            },
            //completion
            () => {
                this.onDisableClick();
                console.log("--complete--");
                //this.activateSpeechSearchMovie();
                if(!this.speechData){
                this.onDisableClick();
                }
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
        this.showDelete = false;
    }
    onAddClick(){
        this.showUpdate = false;
        this.showAdd = true;
        this.showDelete = false;
    }
    onDeleteClick(){
        this.showUpdate = false;
        this.showAdd = false;
        this.showDelete = true;
    }
}