import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FileUploadValidationService} from '../../services/file-upload-validation.service';
import {DataField} from '../../models/data-field';

@Component({
  selector: 'app-form-dynamic-gallery',
  templateUrl: './dynamic-gallery-field.component.html',
  styleUrls: ['./dynamic-gallery-field.component.scss']
})
export class DynamicGalleryFieldComponent implements OnInit {


  @Input() dataField: DataField;
  @Input() form: FormGroup;
  public galleryPreviews: Array<string | ArrayBuffer> = [];
  public errorMessage = '';
  public touched = false;

  constructor(private fb: FormBuilder, private fileUploadValidationService: FileUploadValidationService) {
  }

  ngOnInit(): void {
    this.form.setControl(
      this.dataField.formControlName,
      this.fb.array([], this.dataField.validator));
  }

  public handleFileInput(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.errorMessage = this.fileUploadValidationService.checkSizeAndFileFormat(event.target.files[0]);
      if (this.errorMessage.length === 0) {
        this.errorMessage = '';
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (fileReaderEvent) => {
          (this.form.get(this.dataField.formControlName) as FormArray).push(this.fb.control(event.target.files[0])); // NOSONAR
          this.galleryPreviews.push(fileReaderEvent.target.result);
        };
      }
    }
  }

  public deletePhotoFromGallery(index: number): void {
    (this.form.get(this.dataField.formControlName) as FormArray).removeAt(index); // NOSONAR
    this.galleryPreviews.splice(index, 1);
  }

}

