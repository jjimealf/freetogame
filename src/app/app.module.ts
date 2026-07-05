import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CarritoPage } from './carrito/carrito.page';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { requireFirebaseConfig } from '../environments/firebase-config';

@NgModule({
  declarations: [AppComponent, CarritoPage],
  bootstrap: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, PipesModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
    provideFirebaseApp(() => initializeApp(requireFirebaseConfig(environment.firebase))),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions())
  ]
})
export class AppModule {}
