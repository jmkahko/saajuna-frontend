import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { HavaintoasematComponent } from './havaintoasemat/havaintoasemat.component';
import { HavaintoasematiedotComponent } from './havaintoasematiedot/havaintoasematiedot.component';
import { InfoComponent } from './info/info.component';
import { JunaasematComponent } from './junaasemat/junaasemat.component';
import { JunantiedotComponent } from './junantiedot/junantiedot.component';
import { KirjauduComponent } from './kirjaudu/kirjaudu.component';
import { OmattiedotComponent } from './omattiedot/omattiedot.component';
import { RautatieasemanTiedotComponent } from './rautatieaseman-tiedot/rautatieaseman-tiedot.component';
import { RekirjausComponent } from './rekirjaus/rekirjaus.component';
import { RekisteroidyComponent } from './rekisteroidy/rekisteroidy.component';

// Reitit navbaaria varten
const routes: Routes = [
  { path: 'junaasemat', component: JunaasematComponent },
  { path: 'havaintoasemat', component: HavaintoasematComponent },
  { path: 'rekisteroidy', component: RekisteroidyComponent },
  { path: 'kirjaudu', component: KirjauduComponent },
  { path: 'rekirjaus', component: RekirjausComponent },
  { path: 'omattiedot', component: OmattiedotComponent },
  { path: 'etusivu', component: EtusivuComponent },
  { path: 'rautatieasema/:id', component: RautatieasemanTiedotComponent },
  { path: 'juna/aikataulu/:aika/:junanumero', component: JunantiedotComponent },
  { path: 'havaintoasematiedot/:id', component: HavaintoasematiedotComponent },
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/etusivu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
