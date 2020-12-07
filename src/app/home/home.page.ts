import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaFilmes = [];
  public pagina = 1;
  // public pagina = 498; //Para testar o toast na ultima pagina
  public totalPages: number;
  public genres = {};

  constructor(public filmeService: FilmeService, public toastController: ToastController, public loadingController: LoadingController) {
    this.carregarFilmes();
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      translucent: true,
      showBackdrop: false,
    });

    loading.present();
    return loading;
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1000
    });

    toast.present();
  }

  proximo() {
    if (this.pagina != this.totalPages) {
      this.pagina++;
      this.carregarFilmes();
    } else {
      this.mostrarToast('Ultima página!');
    }
  }

  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.carregarFilmes();
    } else {
      this.mostrarToast('Primeira página!');
    }
  }

  carregarFilmes() {
    /* 
    * Tinha usado um negócio para mostrar que a página está carregando, no entanto
    * no entanto por carregar rápido ficou bem estranho
    */
    this.loading().then((loading) => {
      this.filmeService.getMovies(this.pagina).subscribe((sucess: any) => {
        console.log(sucess);
        this.listaFilmes = sucess.results.map(rs => {
          rs.release_date = new Date(rs.release_date).toLocaleDateString('pt-BR')
          return rs;
        });
        this.totalPages = sucess.total_pages;
        loading.dismiss();
        document.querySelector('ion-content').scrollToTop(0);
      }, error => {
        console.log(error);
        loading.dismiss();
      });
      })
    }

  formatFilmUrl(backdrop_path) {
      return `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
    }

}
