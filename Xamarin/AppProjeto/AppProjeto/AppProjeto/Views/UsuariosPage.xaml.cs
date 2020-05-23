using System;
using System.ComponentModel;
using Xamarin.Forms;
using AppProjeto.ViewModels;

namespace AppProjeto.Views
{
    [DesignTimeVisible(false)]
    public partial class UsuariosPage : ContentPage
    {
        UsuariosViewModel viewModel;

        public UsuariosPage()
        {
            InitializeComponent();

            BindingContext = viewModel = new UsuariosViewModel();
        }

        async void OnItemSelected(object sender, SelectedItemChangedEventArgs args)
        {
            var usuario = args.SelectedItem as UsuarioViewModel;
            if (usuario == null)
                return;

            await Navigation.PushAsync(new UsuarioPage(usuario));

            // Manually deselect item.
            ItemsListView.SelectedItem = null;
        }

        async void AddItem_Clicked(object sender, EventArgs e)
        {
            await Navigation.PushModalAsync(new NavigationPage(new UsuarioPage()));
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (viewModel.Usuarios.Count == 0)
                viewModel.LoadItemsCommand.Execute(null);
        }
    }
}