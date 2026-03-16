import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritosPageRoutingModule } from './favoritos-routing.module';

import { FavoritosPage } from './favoritos.page';
import { PipesModule } from '../pipes/pipes.module';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoPageRoutingModule } from '../carrito/carrito-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavoritosPageRoutingModule,
        PipesModule,
        CarritoPageRoutingModule,
    ],
    declarations: [FavoritosPage]
})
export class FavoritosPageModule {}
