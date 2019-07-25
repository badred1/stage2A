import { PlaceLocation } from './../location.model';
import { BeteService } from "./../../bete.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-new-betail",
  templateUrl: "./new-betail.page.html",
  styleUrls: ["./new-betail.page.scss"]
})
export class NewBetailPage implements OnInit {
  form: FormGroup;

  constructor(
    private beteService: BeteService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      Nom: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Race: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Age: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Poids: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Propri: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Origine: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      Location:new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ Location: location });
  }
  onCreateBetail() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Creation ..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.beteService
          .addBete(
            this.form.value.Origine,
            this.form.value.Age,
            this.form.value.Poids,
            this.form.value.Race,
            this.form.value.Propri,
            this.form.value.Location
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/betail']);
          });
      });
  }
 
  
}
