import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewChecked
} from "@angular/core";
import * as $ from "jquery";
import { NgSwitch } from "@angular/common";
@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit {
  constructor() {}

  buttons = {
    vente: "Vente",
    prods: "Produits",
    marques: "Marques"
  };

  ngOnInit() {
    //  var annimate= myclass => {
    //     var newq = this.makeNewPosition();
    //     $(myclass).animate({ top: newq[0], left: newq[1] }, 3000, function() {
    //       //annimate(myclass);
    //       this.makeNewPosition();
    //     });
    //   };
    //   $(document).ready(function() {
    //     annimate(".a");
    //     annimate(".b");
    //     annimate(".c");
    //     annimate(".d");
    //   });
  }

  /* private makeNewPosition = () => {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
  };*/

  onMouseOver(a: HTMLElement) {
    switch (a.innerHTML) {
      case this.buttons.vente:
        a.innerHTML = "buy me";

        break;
      case this.buttons.marques:
        a.innerHTML = "vos marques ici";

        break;
      case this.buttons.prods:
        a.innerHTML = "decouvrez nos produits";

        break;

      default:
        break;
    }
  }
  onMouseLeave(a: HTMLElement) {
    switch (a.innerHTML) {
      case "buy me":
        a.innerHTML = this.buttons.vente;

        break;
      case "vos marques ici":
        a.innerHTML = this.buttons.marques;

        break;
      case "decouvrez nos produits":
        a.innerHTML = this.buttons.prods;

        break;

      default:
        break;
    }
  }
 
}
