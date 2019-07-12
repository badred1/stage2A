import { Router } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { Bete } from "./bete.model";
import { BeteService } from "../bete.service";
import { IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-betail",
  templateUrl: "./betail.page.html",
  styleUrls: ["./betail.page.scss"]
})
export class BetailPage implements OnInit {
  betes: Bete[];

  constructor(private beteService: BeteService, private router: Router) {}

  ngOnInit() {
    this.betes = this.beteService.getAllBetes();
  }

  ionViewWillEnter() {
    this.betes = this.beteService.getAllBetes();
  }

  onAddButton() {
    this.router.navigate(["/new-betail"]);
  }
  onEdit(beteId: string, s: IonItemSliding) {
    s.close();
    this.router.navigate(["/edit-betail",beteId]);
  }
}
