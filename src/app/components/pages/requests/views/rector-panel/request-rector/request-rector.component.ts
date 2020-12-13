import { Component, OnInit } from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {RequestDataService} from '../../../../../../services/request-data.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reqeust-rector',
  templateUrl: './request-rector.component.html',
  styleUrls: ['./request-rector.component.scss']
})
export class RequestRectorComponent implements OnInit {

  useCase: UseCaseEnum;
  form: FormData;
  status: number;

  constructor(
    private requestDataService: RequestDataService
  ) {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.Rector;
    this.requestDataService.form.pipe(first()).subscribe( formWithStatus => {
      this.form = formWithStatus.form;
      this.status = formWithStatus.status;
    });
  }
}
