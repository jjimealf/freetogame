import { Component, Input } from '@angular/core';

type AppTabsMode = 'user' | 'admin';

interface AppTab {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.scss'],
  standalone: false
})
export class AppTabsComponent {
  @Input() mode: AppTabsMode = 'user';

  private readonly userTabs: AppTab[] = [
    { path: '/juegos', icon: 'game-controller-outline', label: 'Juegos' },
    { path: '/plataformas', icon: 'rocket-outline', label: 'Plataformas' },
    { path: '/favoritos', icon: 'heart-outline', label: 'Favoritos' }
  ];

  private readonly adminTabs: AppTab[] = [
    { path: '/admin', icon: 'person-outline', label: 'Usuarios' },
    { path: '/grafica', icon: 'pie-chart-outline', label: 'Grafica' }
  ];

  get tabs(): AppTab[] {
    return this.mode === 'admin' ? this.adminTabs : this.userTabs;
  }
}
