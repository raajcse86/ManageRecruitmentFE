import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  currentSelectedFile: string ="Choose candidates excel";
  progress: { percentage: number } = { percentage: 0 };
  constructor(private uploadService: UploadFileService,private router: Router,) {
    
   }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if(event.target.files.length>0){
      const fileObject = event.target.files[0];
      this.currentSelectedFile = fileObject.name;
     
    }
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        console.log('File is getting loaded');
        console.log(this.progress.percentage);
       } else if (event instanceof HttpResponse) {
         console.log('File is completely uploaded!');
         this.router.navigate(['/home']);
       }
    },error =>{
      console.log('Error in the Upload File.');
      this.router.navigate(['/home']);
    });
    this.selectedFiles = undefined;
 
    
  }

}
