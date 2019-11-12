import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})

export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService, private modal: AlertModalService) { }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value)
    let msgSuccess = 'Curso criado com sucesso!';
    let msgError = 'Erro ao criar curso, tente novamente!';
    if (this.form.valid) {
      console.log('SUBMIT')
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess)
          this.form.reset();
        },
        error => this.modal.showAlertDanger(msgError),
        () => console.log('request OK')
      );
    }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel')
  }

}
