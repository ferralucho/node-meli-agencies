import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Agency } from "../agency.model";
import { AgencysService } from "../agencies.service";

@Component({
  selector: "app-agency-list",
  templateUrl: "./agency-list.component.html",
  styleUrls: ["./agency-list.component.css"]
})
export class AgencyListComponent implements OnInit, OnDestroy {
 
  agencies: Agency[] = [];
  isLoading = false;
  private agenciesSub: Subscription;

  constructor(public agenciesService: AgencysService) {}

  ngOnInit() {
    //this.isLoading = true;
    //this.agenciesService.getAgencys();
    
    this.agenciesSub = this.agenciesService.getAgencyUpdateListener()
      .subscribe((agencies: Agency[]) => {
      //  this.isLoading = false;
        this.agencies = agencies;
      });
  }

  onLike(agency) {
    this.agenciesService.likeAgency(agency.id, agency.site_id);
  }

  onUnlike(agency) {
    this.agenciesService.unlikeAgency(agency.id, agency.site_id);
  }

  ngOnDestroy() {
    this.agenciesSub.unsubscribe();
  }
}
