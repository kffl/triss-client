import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {RequestDataService} from '../../../../../../services/request-data.service';
import {first} from 'rxjs/operators';
import {StatusEnum} from '../../../../../../extra/status-enum/status-enum';

@Component({
  selector: 'app-reqeust-wilda',
  templateUrl: './reqeust-wilda.component.html',
  styleUrls: ['./reqeust-wilda.component.scss']
})
export class ReqeustWildaComponent implements OnInit {

  useCase: UseCaseEnum;
  form: FormData;
  status: number;

  constructor(
    private requestDataService: RequestDataService
  ) {
  }

  ngOnInit(): void {
    this.requestDataService.form.pipe(first()).subscribe( formWithStatus => {
      this.form = formWithStatus.form;
      this.status = formWithStatus.status;
      if (formWithStatus.status === StatusEnum.ApprovedByDirector) {
        this.useCase = UseCaseEnum.WildaApprove;
      } else {
        this.useCase = UseCaseEnum.WildaAfterRector;
      }
    });
  }

}
