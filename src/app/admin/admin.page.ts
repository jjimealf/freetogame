import { Component, ViewChild } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserProfile } from '../core/models/user-profile.model';
import { FeedbackService } from '../core/ui/feedback.service';
import { UsersService } from '../core/users/users.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
    standalone: false
    
})
export class AdminPage  {
  usuarios$: Observable<UserProfile[]> = this.usersService.listUsers();

  @ViewChild('lista') lista?: IonList;

  constructor(
    private readonly usersService: UsersService,
    private readonly alertController: AlertController,
    private readonly feedback: FeedbackService
  ) {}

  

  statusLabel(usuario: UserProfile): string {
    if (usuario.active) {
      return 'Activo';
    }

    return this.wasUpdated(usuario) ? 'Desactivado' : 'Pendiente';
  }

  statusColor(usuario: UserProfile): 'success' | 'warning' | 'medium' {
    if (usuario.active) {
      return 'success';
    }

    return this.wasUpdated(usuario) ? 'medium' : 'warning';
  }

  async activar(uid: string): Promise<void> {
    await this.usersService.setActive(uid, true);
    await this.lista?.closeSlidingItems();
    await this.feedback.showToast('Usuario activado.', 'success');
  }

  async desactivar(uid: string): Promise<void> {
    await this.usersService.setActive(uid, false);
    await this.lista?.closeSlidingItems();
    await this.feedback.showToast('Usuario desactivado.', 'warning');
  }

  async eliminar(usuario: UserProfile): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      message: `Se ocultara la cuenta de ${usuario.displayName || usuario.email}.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.usersService.softDelete(usuario.uid);
            await this.feedback.showToast('Usuario eliminado.', 'danger');
          }
        }
      ]
    });

    await alert.present();
    await this.lista?.closeSlidingItems();
  }

  private wasUpdated(usuario: UserProfile): boolean {
    return typeof usuario.createdAt?.isEqual === 'function'
      ? !usuario.createdAt.isEqual(usuario.updatedAt)
      : false;
  }
}
