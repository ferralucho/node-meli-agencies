import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Agency } from "../agency.model";
import { AgencysService } from "../agencies.service";

@Component({
  selector: "app-agency-recomendadas",
  templateUrl: "./agency-recomendadas.component.html",
  styleUrls: ["./agency-recomendadas.component.css"]
})
export class AgencyRecomendadasComponent implements OnInit, OnDestroy {
 
  agencies: Agency[] = [];
  isLoading = false;
  private agenciesSub: Subscription;

  constructor(public agenciesService: AgencysService) {}

  ngOnInit() {
    this.isLoading = true;
    this.agenciesService.getAgenciesRecomendadas();
    this.agenciesSub = this.agenciesService.getAgenciesRecomendadasUpdateListener()
      .subscribe((agencies: Agency[]) => {
        this.isLoading = false;
        this.agencies = agencies;
      });
  }

  ngOnDestroy() {
    this.agenciesSub.unsubscribe();
  }
}
