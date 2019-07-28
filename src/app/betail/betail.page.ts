import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bete } from "./bete.model";
import { BeteService } from "../bete.service";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-betail",
  templateUrl: "./betail.page.html",
  styleUrls: ["./betail.page.scss"]
})
export class BetailPage implements OnInit, OnDestroy {
  betes: Bete[];
  private beteSub: Subscription;
  iconesToLoad: string[] = [];

  constructor(private beteService: BeteService, private router: Router) {}

  ngOnInit() {
    this.beteSub = this.beteService.betes.subscribe(betes => {
      this.betes = betes;
      this.betes.forEach((beteEl, index) => {
        if (beteEl.origine === "Ovin") {
          this.iconesToLoad[index] =
            "https://mcetv.fr/wp-content/uploads/2016/11/Bordeaux-un-homme-tu%C3%A9-par-un-mouton-agressif-grande.jpg";
        } else if(beteEl.origine ==="Bovin"){
          this.iconesToLoad[index] =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg/1200px-HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg";
        }
        
      });
    });

  }

  // ionViewWillEnter() {
  //   this.betes = this.beteService.getAllBetes();
  // }

  onAddButton() {
    this.router.navigate(["/new-betail"]);
  }
  onEdit(beteId: string, s: IonItemSliding) {
    s.close();
    this.router.navigate(["/edit-betail", beteId]);
  }

  ngOnDestroy() {
    if (this.beteSub) {
      this.beteSub.unsubscribe();
    }
  }
  pickIcon(or: string): string {
    if (or === "bovin") {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg/1200px-HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg";
    } else {
      return "https://mcetv.fr/wp-content/uploads/2016/11/Bordeaux-un-homme-tu%C3%A9-par-un-mouton-agressif-grande.jpg";
    }
  }
}
