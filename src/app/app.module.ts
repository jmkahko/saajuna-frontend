import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { JunaasematComponent } from './junaasemat/junaasemat.component';
import { HavaintoasematComponent } from './havaintoasemat/havaintoasemat.component';
import { RekisteroidyComponent } from './rekisteroidy/rekisteroidy.component';
import { KirjauduComponent } from './kirjaudu/kirjaudu.component';
import { AuthGuard } from './auth.guard';
import { OmattiedotComponent } from './omattiedot/omattiedot.component';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { RautatieasemanTiedotComponent } from './rautatieaseman-tiedot/rautatieaseman-tiedot.component';
import { HavaintoasematiedotComponent } from './havaintoasematiedot/havaintoasematiedot.component';
import { JunantiedotComponent } from './junantiedot/junantiedot.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    JunaasematComponent,
    HavaintoasematComponent,
    RekisteroidyComponent,
    KirjauduComponent,
    OmattiedotComponent,
    EtusivuComponent,
    RautatieasemanTiedotComponent,
    HavaintoasematiedotComponent,
    JunantiedotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
