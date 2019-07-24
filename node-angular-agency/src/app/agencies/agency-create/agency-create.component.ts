import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AgencysService } from "../agencies.service";
import { SearchAgency } from "../search-agency";
import { Router } from "@angular/router";
import { ComboValue } from "../models/ComboValue"

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

  criteriosOrdenSort: ComboValue[] = [
    {value: 'ASC', viewValue: 'Ascendente'},
    {value: 'DESC', viewValue: 'Descendente'}
  ];

  criteriosOrden: ComboValue[] = [
    {value: 'address_line', viewValue: 'Dirección'},
    {value: 'agency_code', viewValue: 'Codigo Agencia'},
    {value: 'distance', viewValue: 'Distancia'}
  ];

  constructor(
    public agenciesService: AgencysService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  

  ngOnInit() {
    this.searchAgency.latitud = "31.4158499";
    this.searchAgency.longitud = "-64.1870048"
    //this.searchAgency = null
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

    this.agenciesService.getAgencies(form.value.site_id, form.value.payment_method_id, form.value.latitud,
      form.value.longitud, form.value.radio, limit, this.selectedCriterioOrdenamiento, this.selectedCriterioOrdenamientoSort)

    form.resetForm();
    this.router.navigate(["/"]);
  }
}
