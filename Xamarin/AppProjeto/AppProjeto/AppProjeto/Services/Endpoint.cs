using AppProjeto.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AppProjeto.Services
{
    public class Endpoint
    {
        private const string uri = "http://192.168.92.1:8080/projeto/";
        private HttpClient _client;

        public Endpoint()
        {
            _client = new HttpClient();
        }

        public async Task<List<Usuario>> GetUsuariosDataAsync()
        {
            List<Usuario> usuariosData = null;
            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri + "usuario");
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    usuariosData = JsonConvert.DeserializeObject<List<Usuario>>(content);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }

            return usuariosData;
        }

        public async Task<Usuario> GetUsuarioByIdAsync(string id)
        {
            Usuario usuario = null;
            try
            {
                HttpResponseMessage response = await _client.GetAsync(uri + "usuario" + "/" + id);
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    usuario = JsonConvert.DeserializeObject<Usuario>(content);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }

            return usuario;
        }

        public async Task<bool> PostUsuarioAsync(Usuario usuario)
        {
            try
            {
                var json = JsonConvert.SerializeObject(usuario);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _client.PostAsync(uri + "usuario", content);
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
            }
            catch (WebException ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }

            return false;
        }

        public async Task<bool> PutUsuarioAsync(string id, Usuario usuario)
        {
            try
            {
                var json = JsonConvert.SerializeObject(usuario);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _client.PutAsync(uri + "usuario" + "/" + id, content);
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
            }
            catch (WebException ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
            }


            return false;
        }
    }
}
