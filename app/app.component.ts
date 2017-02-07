import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
    selector: 'my-app',
    template:`<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="header">
                    <h4 class="title">&nbsp;&nbsp; Web Speech API in Angular2</h4>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label></label>
                                <input type="text" class="form-control border-input" name="txtSpeechSearchMovieName" id="txtSpeechSearchMovieName" value=""
                                       placeholder="Click below button and then say something!!!" [(ngModel)]="speechData">
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <br />
                    <div class="text-center">
                        <button class="btn btn-info btn-fill btn-wd" name="btnActivateSpeechSearchMovie" id="btnActivateSpeechSearchMovie" (click)="activateSpeechSearchMovie()"
                                [disabled]="!showSearchButton">
                            Enable Speech Search
                        </button>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    </div>
</div>`
})

export class AppComponent implements OnInit, OnDestroy {
    showSearchButton: boolean;
    speechData: string;

    constructor(private speechRecognitionService: SpeechRecognitionService) {
        this.showSearchButton = true;
        this.speechData = "";
    }

    ngOnInit() {
        console.log("hello")
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                this.activateSpeechSearchMovie();
            });
    }

}