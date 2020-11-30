import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {RequestDataService} from '../../../../../../services/request-data.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reqeust-wilda',
  templateUrl: './reqeust-wilda.component.html',
  styleUrls: ['./reqeust-wilda.component.scss']
})
export class ReqeustWildaComponent implements OnInit {

  useCase: UseCaseEnum;
  form: FormData;
  status: string;

  constructor(
    private requestDataService: RequestDataService
  ) {
  }

  ngOnInit(): void {
    this.requestDataService.form.pipe(first()).subscribe( formWithStatus => {
      this.form = formWithStatus.form;
      this.status = formWithStatus.status;
      if (formWithStatus.status === 'WaitingForWilda') { // TODO change WaitingForWilda
        this.useCase = UseCaseEnum.WildaApprove;
      } else {
        this.useCase = UseCaseEnum.WildaAfterRector;
      }
    });
  }

}
