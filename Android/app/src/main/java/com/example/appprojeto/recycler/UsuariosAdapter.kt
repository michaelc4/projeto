package com.example.appprojeto.recycler

import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.util.Base64
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.appprojeto.R
import com.example.appprojeto.UsuarioActivity
import com.example.appprojeto.models.Usuario
import kotlinx.android.synthetic.main.layout_usuario.view.*

class UsuariosAdapter(val usuarios: List<Usuario>, private val context: Context) :
    RecyclerView.Adapter<UsuariosAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.layout_usuario, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return usuarios.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val usuario = usuarios[position]
        holder.codigo.text = usuario.codigo.toString()
        holder.nome.text = usuario.nome

        if (usuario.foto != null && usuario.foto!!.trim() != "") {
            val imageBytes = Base64.decode(usuario.foto, Base64.DEFAULT)
            val decodedImage = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
            holder.foto.setImageBitmap(decodedImage)
        } else {
            holder.foto.setImageResource(R.drawable.noimageicon)
        }
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val foto: ImageView = itemView.usuario_foto
        val codigo: TextView = itemView.usuario_txtcodigo
        val nome: TextView = itemView.usuario_txtnome

        init {
            itemView.setOnClickListener {
                val usuario = usuarios[adapterPosition]
                val intent = Intent(context, UsuarioActivity::class.java)
                intent.putExtra("codigo", usuario.codigo.toString())
                context.startActivity(intent)
            }
        }
    }
}