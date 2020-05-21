package com.example.appprojeto.apiClient

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ApiClient {
    companion object {

        fun getRetrofitInstance(): Retrofit {
            return Retrofit.Builder()
                .baseUrl("http://192.168.92.1:8080/projeto/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }
    }
}