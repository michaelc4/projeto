package com.example.appprojeto

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.appprojeto.apiClient.ApiClient
import com.example.appprojeto.apiInterface.UsuarioEndPoint
import com.example.appprojeto.models.Usuario
import com.example.appprojeto.recycler.UsuariosAdapter
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    lateinit var con: Context
    lateinit var reUsuarios: RecyclerView
    lateinit var tEmptyView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        con = this
        reUsuarios = findViewById(R.id.reUsuarios)
        reUsuarios.layoutManager = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        reUsuarios.visibility = View.GONE
        tEmptyView = findViewById(R.id.empty_view)
        tEmptyView.visibility = View.VISIBLE

        carregaUsuarios()
    }

    private fun carregaUsuarios() {
        val retrofitClient = ApiClient.getRetrofitInstance()
        val endpoint = retrofitClient.create(UsuarioEndPoint::class.java)
        val callback = endpoint.getUsuarios()

        callback.enqueue(object : Callback<List<Usuario>> {
            override fun onFailure(call: Call<List<Usuario>>, t: Throwable) {
                Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
            }

            override fun onResponse(call: Call<List<Usuario>>, response: Response<List<Usuario>>) {
                val listaUsuarios = response.body()
                if (response.isSuccessful && listaUsuarios != null && listaUsuarios.isNotEmpty()) {
                    reUsuarios.visibility = View.VISIBLE
                    tEmptyView.visibility = View.GONE
                    reUsuarios.adapter = UsuariosAdapter(listaUsuarios, con)
                }
            }
        })
    }

    fun addClick(view: View) {
        val intent = Intent(this, UsuarioActivity::class.java)
        intent.putExtra("codigo", "")
        startActivity(intent)
    }
}
