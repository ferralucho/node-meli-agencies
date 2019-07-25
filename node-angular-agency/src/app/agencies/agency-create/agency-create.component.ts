import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AgencysService } from "../agencies.service";
import { SearchAgency } from "../search-agency";
import { Router } from "@angular/router";
import { ComboValue } from "../models/ComboValue"
import { Subscription } from 'rxjs';

@Component({
  selector: "app-agency-create",
  templateUrl: "./agency-create.component.html",
  styleUrls: ["./agency-create.component.css"]
})
export class AgencyCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  searchAgency: SearchAgency = {
    site_id: "MLA",
    payment_method_id: "rapipago",
    latitud: "31.4158499",
    longitud: "-64.1870048",
    radio: "1000",
    limit: "20",
    order_criteria: "address_line",
    order_criteria_sort: "ASC"
  };
  isLoading = false;
  selectedCriterioOrdenamiento: string = "address_line"
  selectedCriterioOrdenamientoSort: string = "ASC"
  selectedSite: string = "MLA"
  selectedPaymentMethod: string
  private sitesSub: Subscription;
  private paymentMethodsSub: Subscription;

  private sites: any[] = []
  private payment_methods: any[] = []

  criteriosOrdenSort: ComboValue[] = [
    { value: 'ASC', viewValue: 'Ascendente' },
    { value: 'DESC', viewValue: 'Descendente' }
  ];

  criteriosOrden: ComboValue[] = [
    { value: 'address_line', viewValue: 'Dirección' },
    { value: 'agency_code', viewValue: 'Codigo Agencia' },
    { value: 'distance', viewValue: 'Distancia' }
  ];

  sitesCombo: ComboValue[] = []
  paymentMethodsCombo: ComboValue[] = []

  constructor(
    public agenciesService: AgencysService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchAgency.latitud = "31.4158499";
    this.searchAgency.longitud = "-64.1870048"
    this.sitesSub = this.agenciesService.getSiteUpdateListener()
      .subscribe((sites: any) => {
        //  this.isLoading = false;
        this.sites = sites
        this.agenciesService.getPaymentMethodForSite(this.selectedSite)
        this.sites.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })
        this.sitesCombo = this.sites.map(s => {
          return {
            value: s.id,
            viewValue: s.name
          }
        });
      });
    this.agenciesService.getSites();

    this.paymentMethodsSub = this.agenciesService.getPaymentMethodUpdateListener()
      .subscribe((payments: any) => {

        payments.sort(function (a, b) {
          return a.name.localeCompare(b.name)
        })
        this.payment_methods = payments
        this.paymentMethodsCombo = payments.map(s => {
          return {
            value: s.id,
            viewValue: s.name
          }
        });
      });
    console.log(this.payment_methods)
    //this.agenciesService.getPaymentMethodForSite(this.selectedSite)
    //this.selectedSite = "ALM"
  }

  onSaveAgency(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.isLoading = true;

    let limit = 20;
    if (form.value.limit) {
      limit = parseInt(form.value.limit)
    }

    this.agenciesService.getAgencies(this.selectedSite, this.selectedPaymentMethod, form.value.latitud,
      form.value.longitud, form.value.radio, limit, this.selectedCriterioOrdenamiento, this.selectedCriterioOrdenamientoSort)

    form.resetForm();
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.sitesSub.unsubscribe();
    this.paymentMethodsSub.unsubscribe();
  }
}
