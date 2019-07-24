import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { AgencysService } from "../agencies.service";
import { Agency } from "../agency.model";

@Component({
  selector: "app-agency-create",
  templateUrl: "./agency-create.component.html",
  styleUrls: ["./agency-create.component.css"]
})
export class AgencyCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  agency: Agency;
  isLoading = false;
  private mode = "create";
  private agencyId: string;

  constructor(
    public agenciesService: AgencysService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("agencyId")) {
        this.mode = "edit";
        this.agencyId = paramMap.get("agencyId");
        this.isLoading = true;
        this.agenciesService.getAgency(this.agencyId).subscribe(postData => {
          this.isLoading = false;
          //this.agency = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = "create";
        this.agencyId = null;
      }
    });
  }

  onSaveAgency(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    /*
    if (this.mode === "create") {
      this.agenciesService.addAgency(form.value.title, form.value.content);
    } else {
      this.agenciesService.updateAgency(
        this.agencyId,
        form.value.title,
        form.value.content
      );
    }
    */
    form.resetForm();
  }
}
