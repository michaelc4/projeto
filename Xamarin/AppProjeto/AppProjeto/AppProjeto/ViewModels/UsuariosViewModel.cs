using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using Xamarin.Forms;
using AppProjeto.Models;
using AppProjeto.Views;
using System.Globalization;

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

            MessagingCenter.Subscribe<UsuarioPage, UsuarioViewModel>(this, "AddItem", async (obj, item) =>
            {
                string data = null;
                if (item.Data != null && item.Data.Trim() != "")
                {
                    var d = DateTime.ParseExact(item.Data, "dd/MM/yyyy", CultureInfo.CreateSpecificCulture("pt-BR"));
                    data = d.ToString("yyyy-MM-dd");
                }
                var usuario = new Usuario()
                {
                    Codigo = item.Codigo.Trim() != "" ? int.Parse(item.Codigo) : 0,
                    Nome = item.Nome,
                    Data = data,
                    Foto = item.Foto != null && item.Foto.Trim() != "" ? item.Foto : null
                };

                SalvaUsuario(usuario).GetAwaiter();
            });
        }

        async Task SalvaUsuario(Usuario usuario)
        {
            if (usuario.Codigo == 0)
            {
                await api.PostUsuarioAsync(usuario);
            }
            else
            {
                await api.PutUsuarioAsync(usuario.Codigo.ToString(), usuario);
            }
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