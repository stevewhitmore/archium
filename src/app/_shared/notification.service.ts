import { Injectable } from '@angular/core';
import {ToastaService, ToastOptions} from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastaService: ToastaService) {
  }

  notify(notificationType: string, message: string) {

    const toastOptions: ToastOptions = {
      title: '',
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'default'
    };

    if (notificationType === 'success') {
      this.toastaService.success(toastOptions);
    } else {
      this.toastaService.error(toastOptions);
    }
  }

}
