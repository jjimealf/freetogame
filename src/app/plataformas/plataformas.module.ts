import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlataformasPageRoutingModule } from './plataformas-routing.module';

import { PlataformasPage } from './plataformas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlataformasPageRoutingModule
  ],
  declarations: [PlataformasPage]
})
export class PlataformasPageModule {}
