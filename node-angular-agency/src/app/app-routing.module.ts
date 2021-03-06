import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AgencyListComponent } from "./agencies/agency-list/agency-list.component";
import { AgencyCreateComponent } from "./agencies/agency-create/agency-create.component";
import { AgencyRecomendadasComponent } from "./agencies/agency-recomendadas/agency-recomendadas.component";

const routes: Routes = [
  { path: '', component: AgencyListComponent },
  { path: 'agencias-recomendadas', component: AgencyRecomendadasComponent },
  { path: 'create', component: AgencyCreateComponent },
  { path: 'edit/:agencyId', component: AgencyCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
