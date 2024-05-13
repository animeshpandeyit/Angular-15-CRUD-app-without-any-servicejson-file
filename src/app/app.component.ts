import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular-15-CRUD-app-using-material-UI';

  form: FormGroup;

  formDataStored: any = [];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      id: [''],
      name: [''],
      lastname: [''],
      email: [''],
    });

    const storedData = localStorage.getItem('formData');

    if (storedData) {
      this.formDataStored = JSON.parse(storedData);
    }
  }

  ngOnInit(): void {}

  submit() {
    const currentValue = this.form.value;
    currentValue.id = this.formDataStored.length + 1;
    this.formDataStored.push(currentValue);
    localStorage.setItem('formData', JSON.stringify(this.formDataStored));
    // console.log('this.formDataStored::', this.formDataStored);
  }

  editData(id: number) {
    // this.form.patchValue(this.formDataStored[id - 1]);
    alert('Now in edit mode');
    const index = id - 1;
    const dataToEdit = this.formDataStored[index];
    this.form.patchValue(dataToEdit);
  }

  deleteData() {
    alert('are you sure you want to delete??');
  }

  updateName() {
    const updatedData = this.form.value;

    const index = this.formDataStored.findIndex(
      (data: any) => data.id === updatedData.id
    );
    if (index !== -1) {
      // Update the data at the found index
      this.formDataStored[index] = updatedData;

      // Update localStorage
      localStorage.setItem('formData', JSON.stringify(this.formDataStored));

      // Clear the form
      this.form.reset();
    }
  }
}
