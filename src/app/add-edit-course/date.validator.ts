import { FormControl } from '@angular/forms';

import * as moment from 'moment/moment';

export function DateValidator(c: FormControl) {
  return moment.utc(c.value, 'MM.DD.YYYY').isValid() ? null : {
    DateValidator: {
      valid: false
    }
  };
}