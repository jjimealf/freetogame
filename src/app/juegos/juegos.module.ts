import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './juegos-routing.module';

import { UserPage } from './juegos.page';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    PipesModule,
    SharedModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
