import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta-service.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  contactForm: FormGroup;
  confirmationMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: CuentaService
  ) {
    this.contactForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      this.contactFormService.sendContactMessage(this.contactForm.value)
        .subscribe(
          () => {
            this.confirmationMessage = `¡${this.contactForm.value.nombre} has quedado registrado! Recibirás la confirmación al correo ${this.contactForm.value.correo}.`;
            this.isSubmitting = false;
            this.contactForm.reset();
          },
          () => {
            this.confirmationMessage = 'Ha ocurrido un error. Por favor, intenta nuevamente más tarde.';
            this.isSubmitting = false;
          }
        );
    }
  }
}
