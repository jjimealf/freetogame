import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AppTabsComponent } from './components/app-tabs/app-tabs.component';
import { GameCardComponent } from './components/game-card/game-card.component';

@NgModule({
  declarations: [AppTabsComponent, GameCardComponent],
  imports: [CommonModule, IonicModule, PipesModule, RouterModule],
  exports: [AppTabsComponent, GameCardComponent]
})
export class SharedModule {}
