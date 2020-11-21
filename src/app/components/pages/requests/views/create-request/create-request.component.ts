import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../extra/use-case-enum/use-case-enum';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  useCase: UseCaseEnum;
  constructor() {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.Create;
  }

}
