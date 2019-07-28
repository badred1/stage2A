import { PlaceLocation } from "./../location.model";
import { BeteService } from "./../../bete.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

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
      Location: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ Location: location });
  }
  onCreateBetail() {
    if (!this.form.valid || !this.form.get("image").value) {
      return;
    }
    console.log(this.form.value);
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
          .subscribe(bete => {
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
    console.log(imageData);
    console.log(imageFile);
    this.form.patchValue({ image: imageFile });
  }
}
