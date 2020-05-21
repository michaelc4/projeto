package com.example.appprojeto.apiInterface

import com.example.appprojeto.models.Usuario
import retrofit2.Call
import retrofit2.http.*

interface UsuarioEndPoint {

    @GET("usuario")
    fun getUsuarios(): Call<List<Usuario>>

    @GET("usuario/{id}")
    fun getUsuario(@Path("id") id: Int): Call<Usuario>

    @POST("usuario")
    fun postUsuario(@Body usuario: Usuario): Call<Usuario>

    @PUT("usuario/{id}")
    fun putUsuario(@Path("id") id: Int, @Body usuario: Usuario): Call<Usuario>
}