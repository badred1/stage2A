import { PlaceLocation } from "./../location.model";
import { BeteService } from "./../../bete.service";
import { Component, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoadingController, PickerController } from "@ionic/angular";
import { Router } from "@angular/router";
import { viewClassName } from "@angular/compiler";
import { PickerOptions } from "@ionic/core";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-new-betail",
  templateUrl: "./new-betail.page.html",
  styleUrls: ["./new-betail.page.scss"]
})
export class NewBetailPage implements OnInit {
  form: FormGroup;
  origines: string[];
  race: string = "";
  poids: string = "";
  age: string = "";
  // allowPickRace: boolean = false;

  constructor(
    private beteService: BeteService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.origines = ["bauvin", "ovin"];
    this.form = new FormGroup({
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
        updateOn: "change",
        validators: [Validators.required]
      }),
      Location: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }
  // ngOnChanges(){
  //   if (this.form.value.Origine){
  //     this.allowPickRace=true;
  //   }
  //}
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ Location: location });
    console.log(location.staticMapImageUrl);
  }
  onCreateBetail() {
    if (!this.form.valid || !this.form.get("image").value) {
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
            this.form.value.image,
            this.form.value.Location
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/betail"]);
          });
      });
  }
  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === "string") {
      try {
        imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  async showBasicPickerRace() {
    let optionPicked: string = this.form.value.Origine;
    let optsOv: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          name: "races ovines",
          options: [
            { text: "Sardi", value: "A" },
            { text: "Boujaad", value: "B" },
            { text: "Beni Guil", value: "C" },
            { text: "Bergui", value: "D" },
            { text: "D'man", value: "E" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let optsBov: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          name: "races bovines",
          options: [
            { text: "Brune de l'atlas", value: "A" },
            { text: "Oulmès-Zaër", value: "B" },
            { text: "Pie-Noir", value: "C" },
            { text: "Tidili (ou Ouzguitia)", value: "D" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let picker: any;
    if (optionPicked === "Ovin") {
      picker = await this.pickerCtrl.create(optsOv);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col = await picker.getColumn("races ovines");
        this.race = col.options[col.selectedIndex].text;
        console.log(this.race);
      });
    } else {
      picker = await this.pickerCtrl.create(optsBov);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col = await picker.getColumn("races bovines");
        this.race = col.options[col.selectedIndex].text;
        console.log(this.race);
      });
    }
    // picker.present();
    // picker.onDidDismiss().then(async data => {
    //   let col = await picker.getColumn("races bovines");
    //   this.race = col.options[col.selectedIndex].text;
    //   console.log(this.race);
    // });
  }
  async showBasicPickerPoids() {
    let optionPicked: string = this.form.value.Origine;
    let optsOv: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          name: "poids ovins",
          options: [
            { text: "45Kg", value: "A" },
            { text: "50Kg", value: "B" },
            { text: "55Kg", value: "C" },
            { text: "60Kg", value: "D" },
            { text: "65Kg", value: "E" },
            { text: "70Kg", value: "F" },
            { text: "75Kg", value: "G" },
            { text: "80Kg", value: "H" },
            { text: "85Kg", value: "I" },
            { text: "90Kg", value: "J" },
            { text: "95Kg", value: "K" },
            { text: "100Kg", value: "L" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let optsBov: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          name: "poids bovins",
          options: [
            { text: "550Kg", value: "A" },
            { text: "600Kg", value: "B" },
            { text: "650Kg", value: "C" },
            { text: "700Kg", value: "D" },
            { text: "750Kg", value: "E" },
            { text: "800Kg", value: "F" },
            { text: "850Kg", value: "G" },
            { text: "900Kg", value: "H" },
            { text: "950Kg", value: "I" },
            { text: "1000Kg", value: "J" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let picker: any;
    if (optionPicked === "Ovin") {
      picker = await this.pickerCtrl.create(optsOv);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col = await picker.getColumn("poids ovins");
        this.poids = col.options[col.selectedIndex].text;
        console.log(this.race);
      });
    } else {
      picker = await this.pickerCtrl.create(optsBov);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col = await picker.getColumn("poids bovins");
        this.poids = col.options[col.selectedIndex].text;
        console.log(this.race);
      });
    }
    // picker.present();
    // picker.onDidDismiss().then(async data => {
    //   let col = await picker.getColumn("races bovines");
    //   this.race = col.options[col.selectedIndex].text;
    //   console.log(this.race);
    // });
  }
  async showBasicPickerAge() {
    let optionPicked: string = this.form.value.Origine;
    let optsOv: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          suffix: "ans",
          name: "ages ovins ans",
          options: [
            { text: "1", value: "A" },
            { text: "2", value: "B" },
            { text: "3", value: "C" },
            { text: "4", value: "D" },
            { text: "5", value: "E" },
            { text: "6", value: "F" },
            { text: "7", value: "G" },
            { text: "8", value: "H" },
            { text: "9", value: "I" },
            { text: "10", value: "J" },
            { text: "11", value: "K" },
            { text: "12", value: "L" }
          ]
        },
        {
          suffix: "mois",
          name: "ages ovins mois",
          options: [
            { text: "1", value: "A" },
            { text: "2", value: "B" },
            { text: "3", value: "C" },
            { text: "4", value: "D" },
            { text: "5", value: "E" },
            { text: "6", value: "F" },
            { text: "7", value: "G" },
            { text: "8", value: "H" },
            { text: "9", value: "I" },
            { text: "10", value: "J" },
            { text: "11", value: "K" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let optsBov: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "cancelBtnPick"
        },
        {
          text: "Done"
        }
      ],
      columns: [
        {
          suffix: "ans",
          name: "ages bovins ans",
          options: [
            { text: "1", value: "A" },
            { text: "2", value: "B" },
            { text: "3", value: "C" },
            { text: "4", value: "D" },
            { text: "5", value: "E" },
            { text: "6", value: "F" },
            { text: "7", value: "G" },
            { text: "8", value: "H" },
            { text: "9", value: "I" },
            { text: "10", value: "J" },
            { text: "11", value: "K" },
            { text: "12", value: "L" },
            { text: "13", value: "M" },
            { text: "14", value: "N" },
            { text: "15", value: "O" },
            { text: "16", value: "P" },
            { text: "17", value: "Q" },
            { text: "18", value: "R" },
            { text: "19", value: "S" },
            { text: "20", value: "T" },
            { text: "21", value: "U" }
          ]
        },
        {
          suffix: "mois",
          name: "ages bovins mois",
          options: [
            { text: "1", value: "A" },
            { text: "2", value: "B" },
            { text: "3", value: "C" },
            { text: "4", value: "D" },
            { text: "5", value: "E" },
            { text: "6", value: "F" },
            { text: "7", value: "G" },
            { text: "8", value: "H" },
            { text: "9", value: "I" },
            { text: "10", value: "J" },
            { text: "11", value: "K" }
          ]
        }
      ],
      // mode:'ios',
      cssClass: "RacePicker"
    };
    let picker: any;
    if (optionPicked === "Ovin") {
      picker = await this.pickerCtrl.create(optsOv);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col1 = await picker.getColumn("ages ovins ans");
        let col2 = await picker.getColumn("ages ovins mois");
        let Ans: string = col1.options[col1.selectedIndex].text;
        let Mois: string = col2.options[col2.selectedIndex].text;
        if (+Ans === 1 ) {
          this.age = Ans + " an " + Mois + " mois";
        } else {
          this.age = Ans + " ans " + Mois + " mois";
        }
      });
    } else {
      picker = await this.pickerCtrl.create(optsBov);
      picker.present();
      picker.onDidDismiss().then(async data => {
        let col1 = await picker.getColumn("ages bovins ans");
        let col2 = await picker.getColumn("ages bovins mois");
        let Ans: string = col1.options[col1.selectedIndex].text;
        let Mois: string = col2.options[col2.selectedIndex].text;
        if (+Ans === 1 ) {
          this.age = Ans + " an " + Mois + " mois";
        } else {
          this.age = Ans + " ans " + Mois + " mois";
        }
      });
    }
    // picker.present();
    // picker.onDidDismiss().then(async data => {
    //   let col = await picker.getColumn("races bovines");
    //   this.race = col.options[col.selectedIndex].text;
    //   console.log(this.race);
    // });
  }
}
