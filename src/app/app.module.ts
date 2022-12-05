import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { SpinnerService } from './core/services/spinner.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CoreModule } from './core';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastComponent } from './shared/components/toast/toast.component';

const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  MainLayoutComponent,
  LoadingComponent,
  AlertModalComponent,
  ToastComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    CoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
