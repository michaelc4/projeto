using System;
using System.ComponentModel;
using Xamarin.Forms;
using AppProjeto.ViewModels;

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
            //MessagingCenter.Send(this, "AddItem", UsuarioViewModel);
            await Navigation.PopModalAsync();
        }

        async void Cancel_Clicked(object sender, EventArgs e)
        {
            await Navigation.PopModalAsync();
        }
    }
}