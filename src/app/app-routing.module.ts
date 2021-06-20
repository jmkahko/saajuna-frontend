import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { HavaintoasematComponent } from './havaintoasemat/havaintoasemat.component';
import { JunaasematComponent } from './junaasemat/junaasemat.component';
import { KirjauduComponent } from './kirjaudu/kirjaudu.component';
import { OmattiedotComponent } from './omattiedot/omattiedot.component';
import { RautatieasemanTiedotComponent } from './rautatieaseman-tiedot/rautatieaseman-tiedot.component';
import { RekisteroidyComponent } from './rekisteroidy/rekisteroidy.component';

// Reitit navbaaria varten
const routes: Routes = [
  { path: 'junaasemat', component: JunaasematComponent },
  { path: 'havaintoasemat', component: HavaintoasematComponent },
  { path: 'rekisteroidy', component: RekisteroidyComponent },
  { path: 'kirjaudu', component: KirjauduComponent} ,
  { path: 'omattiedot', component: OmattiedotComponent },
  { path: 'etusivu', component: EtusivuComponent },
  { path: 'rautatieasema/:id', component: RautatieasemanTiedotComponent },
  { path: '', redirectTo:'/etusivu', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
