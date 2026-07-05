import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { GamesService } from '../core/games/games.service';

@Component({
    selector: 'app-grafica',
    templateUrl: './grafica.page.html',
    styleUrls: ['./grafica.page.scss'],
    standalone: false
})
export class GraficaPage implements OnInit {
  categorias: string[]= ['MMORPG', 'Shooter', 'MMO', 'Social', 'MOBA', 'Fighting'];
  loading = false;
  errorMessage = '';

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit() {
    void this.loadChartData();
  }

  public pieChartOptions: ChartOptions = {
    color: '#ffffff',
    responsive: true,
  };
  public pieChartLabels = this.categorias.map((categoria) => [categoria]);
  public pieChartData: { data: number[] }[] = [{ data: [] }];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  private async loadChartData(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const counts = await Promise.all(
        this.categorias.map(async (categoria) => {
          const games = await this.gamesService.listGamesByCategory(categoria.toLowerCase());
          return games.length;
        })
      );

      this.pieChartData = [{ data: counts }];
    } catch (error) {
      this.errorMessage = 'No se pudieron cargar los datos de la grafica.';
      this.pieChartData = [{ data: [] }];
    } finally {
      this.loading = false;
    }
  }
}
