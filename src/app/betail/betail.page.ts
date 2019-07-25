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

  constructor(private beteService: BeteService, private router: Router) {}

  ngOnInit() {
    this.beteSub = this.beteService.betes.subscribe(betes => {
      this.betes = betes;
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
}
