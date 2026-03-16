import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CarritoPage } from './carrito/carrito.page';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({ declarations: [AppComponent, CarritoPage],
    bootstrap: [AppComponent], imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, PipesModule], providers: [File, FileOpener, EmailComposer, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(withInterceptorsFromDi()), provideCharts(withDefaultRegisterables())] })
export class AppModule {}
