import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BeteService } from "src/app/bete.service";
import { Bete } from "../bete.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-bete-detail",
  templateUrl: "./bete-detail.page.html",
  styleUrls: ["./bete-detail.page.scss"]
})
export class BeteDetailPage implements OnInit {
  beteItem: Bete;

  constructor(
    private activatedRoute: ActivatedRoute,
    private beteService: BeteService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("beteId")) {
        //redirect
        return;
      }
      const beteId = paramMap.get("beteId");
      this.beteItem = this.beteService.getBete(beteId);
    });
  }

  onDeleteBete() {
    this.alertController
      .create({
        header: "Etes-vous sur ?",
        message:
          "Voulez-vous vraiment supprimer " + this.beteItem.reference + " ?",
        buttons: [
          {
            text: "Annuler",
            role: "cancel"
          },
          {
            text: "Supprimer",
            handler: () => {
              this.beteService.deleteBete(this.beteItem.reference);
              this.router.navigate(["/betail"]);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
