import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HaeasemaComponent } from './haeasema/haeasema.component';
import { HavaintoasematComponent } from './havaintoasemat/havaintoasemat.component';
import { JunaasematComponent } from './junaasemat/junaasemat.component';
import { KirjauduComponent } from './kirjaudu/kirjaudu.component';
import { OmattiedotComponent } from './omattiedot/omattiedot.component';
import { RekisteroidyComponent } from './rekisteroidy/rekisteroidy.component';

// Reitit navbaaria varten
const routes: Routes = [
  { path: 'junaasemat', component: JunaasematComponent},
  { path: 'havaintoasemat', component: HavaintoasematComponent},
  { path: 'rekisteroidy', component: RekisteroidyComponent},
  { path: 'kirjaudu', component: KirjauduComponent},
  { path: 'haeasema', component: HaeasemaComponent},
  { path: 'omattiedot', component: OmattiedotComponent},
  { path: '', redirectTo:'/haeasema', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
