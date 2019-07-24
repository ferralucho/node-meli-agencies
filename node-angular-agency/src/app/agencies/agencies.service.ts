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
  private messagesUpdated = new Subject<string>();

  private agenciesRecomendadas: Agency[] = [];
  private agenciesRecomendadasUpdated = new Subject<Agency[]>();
  private messages: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getAgencys() {
      this.http
      .get("http://localhost:3000/api/agencies/MLA?payment_method=rapipago&latitud=-31.412971&longitud=-64.18758&radio=500&limit=500&order_criteria=address_line&order_criteria_sort=")
      .subscribe((transformedAgencys: any[]) => {
        this.agencies = transformedAgencys;
        this.agenciesUpdated.next([...this.agencies]);
      });
      
  }
//   .get("http://localhost:3000/api/agencies/"+ siteId+"?payment_method=" + paymentMethodId + "&latitud=-31.412971&longitud=-64.18758&radio=500&limit=500&order_criteria=address_line&order_criteria_sort=")
  getAgencies(siteId: string, paymentMethodId: string, latitud: number, longitud: number, radio: number, limit: number, orderCriteria: string, orderCriteriaSort: string) {
    this.http
    .get("http://localhost:3000/api/agencies/"+ siteId+"?payment_method=" + paymentMethodId + "&latitud=-" + latitud +"&longitud=" + longitud+ "&radio=" + radio + "&limit=" + limit + "&order_criteria=" + orderCriteria + "&order_criteria_sort=" + orderCriteriaSort)
    .subscribe((transformedAgencys: any[]) => {
      this.agencies = transformedAgencys;
      
      this.agenciesUpdated.next([...this.agencies]);
      
    });
    
}

  getAgenciesRecomendadas() {
    this.http
    .get("http://localhost:3000/api/agencies/sites/agencias-recomendadas")
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

  getMessageUpdateListener() {
    return this.messagesUpdated.asObservable();
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
      .subscribe((res: string) => {
        console.log(res)
        this.messagesUpdated.next(res);
      });
  }

  unlikeAgency(agencyId: string, siteId: string) {
    this.http
      .get("http://localhost:3000/api/agencies/" + siteId + "/" + agencyId +"/unlike")
      .subscribe((res: string) => {
        console.log(res)
        this.messagesUpdated.next(res);
        
      });
  }
}
