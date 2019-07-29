import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BetailPage } from './betail.page';
import { SharedModule } from '../shared/shared.module';
// import { MatSelectModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: BetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    // MatSelectModule
  ],
  declarations: [BetailPage]
})
export class BetailPageModule {}
