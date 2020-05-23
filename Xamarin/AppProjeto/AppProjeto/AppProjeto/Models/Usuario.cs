using Newtonsoft.Json;

namespace AppProjeto.Models
{
    public class Usuario
    {
        [JsonProperty("codigo")]
        public int Codigo { get; set; }

        [JsonProperty("nome")]
        public string Nome { get; set; }

        [JsonProperty("data")]
        public string Data { get; set; }

        [JsonProperty("foto")]
        public string Foto { get; set; }
    }
}
