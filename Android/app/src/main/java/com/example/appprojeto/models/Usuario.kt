package com.example.appprojeto.models

import com.google.gson.annotations.SerializedName

class Usuario {
    @SerializedName("codigo")
    var codigo: Int = 0

    @SerializedName("nome")
    var nome: String = ""

    @SerializedName("data")
    var nascimento: String? = ""

    @SerializedName("foto")
    var foto: String? = ""
}