import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../../core/models/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  standalone: false
})
export class GameCardComponent {
  @Input() game!: Game;
  @Input() expanded = false;
  @Input() favorite = false;
  @Input() showFavoriteAction = true;
  @Input() showCartAction = false;

  @Output() favoriteToggle = new EventEmitter<Game>();
  @Output() cartAdd = new EventEmitter<Game>();
  @Output() expandedToggle = new EventEmitter<Game>();

  supportsWindows(): boolean {
    return this.game.platform.includes('PC');
  }

  supportsBrowser(): boolean {
    return this.game.platform.includes('Web Browser');
  }
}
