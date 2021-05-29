import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { JunaasematComponent } from './junaasemat/junaasemat.component';
import { HavaintoasematComponent } from './havaintoasemat/havaintoasemat.component';
import { RekisteroidyComponent } from './rekisteroidy/rekisteroidy.component';
import { KirjauduComponent } from './kirjaudu/kirjaudu.component';
import { HaeasemaComponent } from './haeasema/haeasema.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    JunaasematComponent,
    HavaintoasematComponent,
    RekisteroidyComponent,
    KirjauduComponent,
    HaeasemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
