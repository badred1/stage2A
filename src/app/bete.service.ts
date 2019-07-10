import { Injectable } from "@angular/core";
import { Bete } from "./betail/bete.model";

@Injectable({
  providedIn: "root"
})
export class BeteService {
  betes: Bete[] = [
    {
      reference: "r1",
      origine: "Casablanca",
      imgURL:
        "https://mcetv.fr/wp-content/uploads/2016/11/Bordeaux-un-homme-tu%C3%A9-par-un-mouton-agressif-grande.jpg",
      age: "8 ans",
      poids: "50kg",
      proprietaire: "XXX",
      race: "Mouton"
    },
    {
      reference: "r2",
      origine: "Rabat",
      imgURL:
        "https://www.lobservateur.fr/wp-content/uploads/2018/05/b%C5%93uf.jpg",
      age: "7 ans",
      poids: "100kg",
      proprietaire: "XXX",
      race: "Boeuf"
    },
    {
      reference: "r3",
      origine: "Beni-mellal",
      imgURL:
        "https://www.rustica.fr//images/ouv-chevre-ch120608-060-1435746972-l750-h512.jpg",
      age: "3 ans",
      poids: "30kg",
      proprietaire: "XXX",
      race: "chevre"
    },
    {
      reference: "r4",
      origine: "Oujda",
      imgURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg/1200px-HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg",
      age: "12ans",
      poids: "120kg",
      proprietaire: "XXX",
      race: "Vache"
    },
    {
      reference: "r5",
      origine: "Casablanca",
      imgURL:
        "https://cheval.quebec/Image/Le-Cheval/DSCN3038.JPG",
      age: "15 ans",
      poids: "100kg",
      proprietaire: "XXX",
      race: "Cheval"
    }
  ];

  constructor() {}

  getAllBetes() {
    return [...this.betes];
  }

  getBete(beteId: string) {
    return {
      ...this.betes.find(bete => {
        return bete.reference === beteId;
      })
    };
  }

  deleteBete(beteId: string) {
    this.betes = this.betes.filter(bete => {
      return bete.reference !== beteId;
    });
  }
}
