import { Component, OnInit } from "@angular/core";
import { Bete } from "../bete.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BeteService } from "src/app/bete.service";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-betail",
  templateUrl: "./edit-betail.page.html",
  styleUrls: ["./edit-betail.page.scss"]
})
export class EditBetailPage implements OnInit {
  beteItem: Bete;
  form: FormGroup;

  constructor(
    private beteService: BeteService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.beteItem = this.beteService.getBete(paramMap.get("beteId"));
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
        })
      });
    });
  }

  onCreateBetail() {
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
        setTimeout(() => {
          this.loadingCtrl.dismiss();
          this.beteService.deleteBete(this.beteItem.reference);
          this.beteService.addBeteWithId(
            this.beteItem.reference,
            this.form.value.Origine,
            this.form.value.Age,
            this.form.value.Poids,
            this.form.value.Race,
            this.form.value.Propri,
            this.beteItem.imgURL
          );
        }, 1500);
      });
  }
}
