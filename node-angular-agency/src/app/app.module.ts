import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { AgencyCreateComponent } from "./agencies/agency-create/agency-create.component";
import { HeaderComponent } from "./header/header.component";
import { AgencyListComponent } from "./agencies/agency-list/agency-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { AgencyRecomendadasComponent } from "./agencies/agency-recomendadas/agency-recomendadas.component";

@NgModule({
  declarations: [
    AppComponent,
    AgencyCreateComponent,
    HeaderComponent,
    AgencyListComponent,
    AgencyRecomendadasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
