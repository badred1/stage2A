import { Component, OnInit, OnChanges } from "@angular/core";
import { Bete } from "./bete.model";
import { BeteService } from "../bete.service";

@Component({
  selector: "app-betail",
  templateUrl: "./betail.page.html",
  styleUrls: ["./betail.page.scss"]
})
export class BetailPage implements OnInit {
  betes: Bete[];

  constructor(private beteService: BeteService) {}

  ngOnInit() {
    this.betes = this.beteService.getAllBetes();
  }
  clickedStar(){
    
  }
}
