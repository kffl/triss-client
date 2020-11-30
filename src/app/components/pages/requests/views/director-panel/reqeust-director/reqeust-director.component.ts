import { Component, OnInit } from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {RequestDataService} from '../../../../../../services/request-data.service';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reqeust-director',
  templateUrl: './reqeust-director.component.html',
  styleUrls: ['./reqeust-director.component.scss']
})
export class ReqeustDirectorComponent implements OnInit {

  useCase: UseCaseEnum;
  form: FormData;
  status: string;

  constructor(
    private requestDataService: RequestDataService
  ) {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.Director;
    this.requestDataService.form.pipe(first()).subscribe( formWithStatus => {
      this.form = formWithStatus.form;
      this.status = formWithStatus.status;
    });
  }

}
