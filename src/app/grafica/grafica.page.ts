import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {

  categorias: string[]= ["MMORPG", "Shooter", "MMO", "Social", "MOBA", "Fighting"];
  juegosCategorias: juego[] = [];
  numJuegoCategorias: number[] = [];

  constructor(private restService: RestService) { 
    
  }

  ngOnInit() {
    this.numJuegoCategorias = [];
    for(let i=0; i<6; i++){
      this.obtenerJuegoCategoria(i);
    }

    this.pieChartLabels = [[this.categorias[0]], [this.categorias[1]], [this.categorias[2]], [this.categorias[3]], [this.categorias[4]], [this.categorias[5]]];
    this.pieChartData = [{data: this.numJuegoCategorias}];
  }

  public pieChartOptions: ChartOptions = {
    color: '#ffffff',
    responsive: true,
  };
  public pieChartLabels;
  public pieChartData;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  obtenerJuegoCategoria(i:number){
    this.restService.listarJuegosPorGenero(this.categorias[i].toLowerCase()).then((juegos: juego[]) => {
      this.numJuegoCategorias.push(juegos.length);
    })
  }
}
