import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficaPageRoutingModule } from './grafica-routing.module';

import { GraficaPage } from './grafica.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficaPageRoutingModule,
    NgChartsModule
  ],
  declarations: [GraficaPage]
})
export class GraficaPageModule {}
