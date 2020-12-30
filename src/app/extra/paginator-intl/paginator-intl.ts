import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
  public constructor(private translateService: TranslateService) {
    super();
    this.translate();
    this.translateService.onLangChange.subscribe(() => {
      this.translate();
      this.changes.next();
    });
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.translateService.instant('LIST.OF_LABEL')} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex: number = page * pageSize;
    const endIndex: number = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.translateService.instant('LIST.OF_LABEL')} ${length}`;
  }

  translate() {
    this.itemsPerPageLabel = this.translateService.instant('LIST.ITEMS_LABEL');
    this.previousPageLabel = this.translateService.instant('LIST.PREVIOUS_PAGE_LABEL');
    this.nextPageLabel = this.translateService.instant('LIST.NEXT_PAGE_LABEL');
  }
}
