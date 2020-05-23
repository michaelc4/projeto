using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using Xamarin.Forms;
using AppProjeto.Models;

namespace AppProjeto.ViewModels
{
    public class UsuariosViewModel : BaseViewModel
    {
        public ObservableCollection<UsuarioViewModel> Usuarios { get; set; }
        public Command LoadItemsCommand { get; set; }

        public UsuariosViewModel()
        {
            Title = "Usuários";
            Usuarios = new ObservableCollection<UsuarioViewModel>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());
        }

        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;

            IsBusy = true;

            try
            {
                Usuarios.Clear();
                var bs = await api.GetUsuariosDataAsync();
                foreach (var usuario in bs)
                {
                    Usuarios.Add(new UsuarioViewModel(usuario));
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}