import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Agency } from "./agency.model";

@Injectable({ providedIn: "root" })
export class AgencysService {
  private agencies: Agency[] = [];
  private agenciesUpdated = new Subject<Agency[]>();

  private agenciesRecomendadas: Agency[] = [];
  private agenciesRecomendadasUpdated = new Subject<Agency[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAgencys() {
      this.http
      .get("http://localhost:3000/api/agencies/MLA?payment_method=rapipago&latitud=-31.412971&longitud=-64.18758&radio=500&limit=500&order_criteria=address_line&order_criteria_sort=")
      .subscribe((transformedAgencys: any[]) => {
        this.agencies = transformedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
      });
      
  }

  getAgenciesRecomendadas() {
    this.http
    .get("http://localhost:3000/api/agencies/MLA/agencias-recomendadas")
    .subscribe((transformedAgencys: any[]) => {
      if(transformedAgencys){
        this.agenciesRecomendadas = transformedAgencys;
        this.agenciesRecomendadasUpdated.next([...this.agenciesRecomendadas]);
      }

    });
    
}

  getAgencyUpdateListener() {
    return this.agenciesUpdated.asObservable();
  }

  getAgenciesRecomendadasUpdateListener() {
    return this.agenciesRecomendadasUpdated.asObservable();
  }

  getAgency(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/agencies/" + id
    );
  }

  likeAgency(agencyId: string, siteId: string) {
    this.http
      .get("http://localhost:3000/api/agencies/" + siteId + "/" + agencyId +"/like")
      .subscribe((res) => {
        console.log(res)
        /*
        const updatedAgencys = this.agencies.filter(agency => agency.id !== agencyId);
        this.agencies = updatedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
        */
      });
  }

  unlikeAgency(agencyId: string, siteId: string) {
    this.http
      .get("http://localhost:3000/api/agencies/" + siteId + "/" + agencyId +"/unlike")
      .subscribe((res) => {
        console.log(res)
        /*
        const updatedAgencys = this.agencies.filter(agency => agency.id !== agencyId);
        this.agencies = updatedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
        */
      });
  }

/*
  addAgency(title: string, content: string) {
    const agency: Agency = { id: null, title: title, content: content };
    this.http
      .agency<{ message: string; agencyId: string }>(
        "http://localhost:3000/api/agencies",
        agency
      )
      .subscribe(responseData => {
        const id = responseData.agencyId;
        agency.id = id;
        this.agencies.push(agency);
        this.agenciesUpdated.next([...this.agencies]);
        this.router.navigate(["/"]);
      });
  }

  updateAgency(id: string, title: string, content: string) {
    const agency= { };
    this.http
      .put("http://localhost:3000/api/agencies/" + id, agency)
      .subscribe(response => {
        const updatedAgencys = [...this.agencies];
        const oldAgencyIndex = updatedAgencys.findIndex(p => p.id === agency.id);
        updatedAgencys[oldAgencyIndex] = agency;
        this.agencies = updatedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
        this.router.navigate(["/"]);
      });
  }

  deleteAgency(agencyId: string) {
    this.http
      .delete("http://localhost:3000/api/agencies/" + agencyId)
      .subscribe(() => {
        const updatedAgencys = this.agencies.filter(agency => agency.id !== agencyId);
        this.agencies = updatedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
      });
  }
  */
}
