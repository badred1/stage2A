import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeteService } from 'src/app/bete.service';
import { LoadingController, PopoverController } from '@ionic/angular';
import { Bete } from '../bete.model';

@Component({
  selector: "app-vente",
  templateUrl: "./vente.component.html",
  styleUrls: ["./vente.component.scss"]
})
export class VenteComponent implements OnInit {
@Input() selectedBete: Bete;

  form: FormGroup;

  constructor(
    private beteService: BeteService,
    private loadingCtrl: LoadingController,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      Nom: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
      
    });
  }

  onSell() {
    if (!this.form.valid) {
      return;
    }
    this.popCtrl.dismiss({newProp: this.form.value.Nom},'confirm');
    // this.loadingCtrl
    //   .create({
    //     keyboardClose: true,
    //     message: "Enregistrement"
    //   })
    //   .then(loadingEl => {
    //     loadingEl.present();
    //     setTimeout(() => {
    //       this.loadingCtrl.dismiss();
    //       this.beteService.addBete(
    //         this.form.value.Origine,
    //         this.form.value.Age,
    //         this.form.value.Poids,

    //         this.form.value.Race,
    //         this.form.value.Propri
    //       );
    //     }, 1500);
    //   });
  }
  onCancel() {
    this.popCtrl.dismiss(null,'cancel');
  }
}
