import {Component} from '@angular/core';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
 
@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ngx-toasta></ngx-toasta>
    `
})
export class AppComponent {
    
    constructor(private toastaService:ToastaService, private toastaConfig: ToastaConfig) { 
        // Assign the selected theme name to the `theme` property of the instance of ToastaConfig. 
        // Possible values: default, bootstrap, material
        this.toastaConfig.theme = 'material';
    }
    
    addToast() {
        // Just add default Toast with title only
        this.toastaService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastaService.info(toastOptions);
        this.toastaService.success(toastOptions);
        this.toastaService.wait(toastOptions);
        this.toastaService.error(toastOptions);
        this.toastaService.warning(toastOptions);
    }
}