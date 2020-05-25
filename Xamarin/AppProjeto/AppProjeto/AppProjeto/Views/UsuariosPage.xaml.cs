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
            var usuario1 = args.SelectedItem as UsuarioViewModel;
            if (usuario1 == null)
                return;
            var usuario2 = usuario1.Clone() as UsuarioViewModel;
            if (usuario2 == null)
                return;

            usuario2.CodigoVisible = true;
            await Navigation.PushAsync(new UsuarioPage(usuario2));

            // Manually deselect item.
            ItemsListView.SelectedItem = null;
        }

        async void AddItem_Clicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new UsuarioPage());
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (viewModel.Usuarios.Count == 0)
                viewModel.LoadItemsCommand.Execute(null);
        }
    }
}