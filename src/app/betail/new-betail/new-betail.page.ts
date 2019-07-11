import { BeteService } from './../../bete.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-betail',
  templateUrl: './new-betail.page.html',
  styleUrls: ['./new-betail.page.scss'],
})
export class NewBetailPage implements OnInit {

  form: FormGroup;


  constructor(private beteService: BeteService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      Nom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      Race: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      Age: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      }),
      Poids: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      Propri: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      Origine: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),



    });

  }

 /* onCreateBetail() {
    if (!this.form.valid ) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.beteService.addBete(
          this.form.value.Origine,
              this.form.value.Age,
              this.form.value.Poids,


              this.form.value.Race,
              this.form.value.Propri,


            );
          });
         



  }*/
}
