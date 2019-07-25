import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bete } from "../bete.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BeteService } from "src/app/bete.service";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PlaceLocation } from '../location.model';


@Component({
  selector: "app-edit-betail",
  templateUrl: "./edit-betail.page.html",
  styleUrls: ["./edit-betail.page.scss"]
})
export class EditBetailPage implements OnInit, OnDestroy {
  beteItem: Bete;
  form: FormGroup;
  beteSub: Subscription;

  constructor(
    private beteService: BeteService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.beteService.getBete(paramMap.get("beteId")).subscribe(bete => {
        this.beteItem = bete;
      });
      this.form = new FormGroup({
        Nom: new FormControl(this.beteItem.reference, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Race: new FormControl(this.beteItem.race, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Age: new FormControl(this.beteItem.age, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Poids: new FormControl(this.beteItem.poids, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Propri: new FormControl(this.beteItem.proprietaire, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Origine: new FormControl(this.beteItem.origine, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        Location:new FormControl(null, {
          validators: [Validators.required]
        })
      });
    });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ Location: location });
  }

  onEditBetail() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Ajout des modifications..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.beteService
          .updateBete(
            this.beteItem.reference,
            this.form.value.Origine,
            this.form.value.Age,
            this.form.value.Poids,
            this.form.value.Race,
            this.form.value.Propri,
            this.beteItem.imgURL,
            this.form.value.location
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/betail']);
          });
      });
  }
  ngOnDestroy() {
    if (this.beteSub) {
      this.beteSub.unsubscribe();
    }
  }
}
