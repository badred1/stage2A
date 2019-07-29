import { TestComponent } from './test/test.component';
import { LocationV2Component } from './pickers/location-v2/location-v2.component';
import { MapmodV2Component } from './mapmod-v2/mapmod-v2.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';


// import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

@NgModule({
  declarations: [
   
    LocationV2Component,
    MapmodV2Component,
    ImagePickerComponent,
    TestComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [LocationV2Component,MapmodV2Component,ImagePickerComponent,TestComponent],
  entryComponents: [MapmodV2Component]
})
export class SharedModule {}
