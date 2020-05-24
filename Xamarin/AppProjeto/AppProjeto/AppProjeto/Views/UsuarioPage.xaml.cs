using System;
using System.ComponentModel;
using Xamarin.Forms;
using AppProjeto.ViewModels;
using System.IO;
using Plugin.Media;
using Plugin.Media.Abstractions;

namespace AppProjeto.Views
{
    [DesignTimeVisible(false)]
    public partial class UsuarioPage : ContentPage
    {
        public UsuarioViewModel ViewModel { get; set; }

        public UsuarioPage(UsuarioViewModel viewModel)
        {
            InitializeComponent();

            this.ViewModel = viewModel;

            BindingContext = this;
        }

        public UsuarioPage()
        {
            InitializeComponent();

            ViewModel = new UsuarioViewModel
            {
                Codigo = "",
                Nome = "",
                Data = "",
                Foto = ""
            };

            BindingContext = this;
        }

        async void Save_Clicked(object sender, EventArgs e)
        {
            MessagingCenter.Send(this, "AddItem", ViewModel);
            await Navigation.PopModalAsync();
        }

        async void Cancel_Clicked(object sender, EventArgs e)
        {
            await Navigation.PopModalAsync();
        }

        async void Image_Clicked(object sender, EventArgs e)
        {
            if (!CrossMedia.Current.IsPickPhotoSupported)
            {
                await DisplayAlert("Alerta", "Galeria não suportada", "ok");
                return;
            }

            var mediaOptions = new PickMediaOptions()
            {
                PhotoSize = PhotoSize.Medium
            };
            var selectedImageFile = await CrossMedia.Current.PickPhotoAsync(mediaOptions);
            var photo = selectedImageFile != null ? selectedImageFile.GetStream() : null;
            if (photo != null)
            {
                byte[] bytes;
                using (var memoryStream = new MemoryStream())
                {
                    photo.CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }

                ViewModel.Foto = Convert.ToBase64String(bytes);
            }

            BindingContext = this;
        }

        async void Calendar_Clicked(object sender, EventArgs e)
        {

        }
    }
}