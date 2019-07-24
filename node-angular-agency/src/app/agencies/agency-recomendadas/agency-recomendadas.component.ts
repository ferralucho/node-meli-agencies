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
    this.agenciesService.getAgencys();
    this.agenciesSub = this.agenciesService.getAgencyUpdateListener()
      .subscribe((agencies: Agency[]) => {
        this.isLoading = false;
        this.agencies = agencies;
      });
  }

  onLike(agency) {
    this.agenciesService.likeAgency(agency.id, agency.site_id);
  }

  onUnlike(agency) {
    //this.agenciesService.(agencyId);
  }

  ngOnDestroy() {
    this.agenciesSub.unsubscribe();
  }
}
