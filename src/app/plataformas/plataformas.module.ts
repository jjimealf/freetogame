import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlataformasPageRoutingModule } from './plataformas-routing.module';

import { PlataformasPage } from './plataformas.page';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlataformasPageRoutingModule,
    PipesModule,
    SharedModule
  ],
  declarations: [PlataformasPage]
})
export class PlataformasPageModule {}
