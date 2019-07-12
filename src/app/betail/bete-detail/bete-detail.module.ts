import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { BeteDetailPage } from "./bete-detail.page";
import { VenteComponent } from "../vente/vente.component";

const routes: Routes = [
  {
    path: "",
    component: BeteDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeteDetailPage, VenteComponent],
  entryComponents: [VenteComponent]
})
export class BeteDetailPageModule {}
