import { Component } from '@angular/core';
import { DemandeService } from './demande.service';


@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddAskComponent {
  duration: number;
  startDate: string;
  userId: number;
  type: string;
  certificateFile: File;

  constructor(private askService: DemandeService ) { 
  
  }

  submitForm() {
    // Convert the file to a base64 string
    this.convertFileToBase64(this.certificateFile).then(base64String => {
        // Create the JSON payload including the base64 string of the file
        const requestBody = {
            duration: this.duration.toString(),
            startDate: this.startDate,
            user: this.userId.toString(),
            type: this.type,
            certificateFile: base64String // Include the base64 string of the file
        };

        // Send the JSON payload to the backend
        this.askService.addAsk(requestBody).subscribe(
            response => {
                console.log('Ask added successfully:', response);
                // Optionally, perform any additional actions after adding the ask
                this.resetForm();
            },
            error => {
                console.error('Error adding ask:', error);
            }
        );
    }).catch(error => {
        console.error('Error converting file to base64:', error);
    });
}

// Function to convert a file to a base64 string
convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result?.toString().split(',')[1]; // Extract base64 string
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
}


  resetForm() {
    this.duration = null;
    this.startDate = null;
    this.userId = null;
    this.type = null;
    this.certificateFile = null;
  }

  onFileSelected(event: any) {
    this.certificateFile = event.target.files[0];
  }
}
