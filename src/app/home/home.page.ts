import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonLabel, IonRow, IonCol, IonItem } from '@ionic/angular/standalone'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

import { SmsService } from '../../services/sms.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonCol, IonRow, IonLabel, FormsModule, IonButton, IonTextarea, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  providers: [HttpClient]
})
export class HomePage {

  recipients: string = ''
  text: string = ''
  results: string[] = []

  constructor(private smsService: SmsService) {}

  async sendSms() {
    this.results = ['Enviando SMS...']
    const recipientList = this.recipients.split(',').map(recipient => recipient.trim())
    try {
      this.results = await this.smsService.sendSms(recipientList, this.text)
    } catch {
      this.results = [`Erro ao enviar SMS`]
    }
  }
}
