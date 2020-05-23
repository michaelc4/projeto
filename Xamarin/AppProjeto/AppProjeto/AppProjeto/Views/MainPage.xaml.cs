using System.ComponentModel;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace AppProjeto.Views
{
    [DesignTimeVisible(false)]
    public partial class MainPage : MasterDetailPage
    {
        public MainPage()
        {
            InitializeComponent();
            MasterBehavior = MasterBehavior.Popover;

            StartPage().GetAwaiter();
        }

        private async Task StartPage()
        {
            var newPage = new NavigationPage(new UsuariosPage());
            if (newPage != null && Detail != newPage)
            {
                Detail = newPage;

                if (Device.RuntimePlatform == Device.Android)
                    await Task.Delay(100);

                IsPresented = false;
            }
        }
    }
}