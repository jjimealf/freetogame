import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(
    private readonly alertController: AlertController,
    private readonly loadingController: LoadingController,
    private readonly toastController: ToastController
  ) {}

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async showToast(message: string, color: 'primary' | 'success' | 'warning' | 'danger' = 'primary'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 3000,
      position: 'top'
    });

    await toast.present();
  }

  async withLoading<T>(message: string, task: () => Promise<T>): Promise<T> {
    const loading = await this.loadingController.create({ message });
    await loading.present();

    try {
      return await task();
    } finally {
      await loading.dismiss();
    }
  }
}
