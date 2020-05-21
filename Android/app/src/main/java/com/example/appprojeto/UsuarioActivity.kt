package com.example.appprojeto

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import android.widget.TableRow
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.appprojeto.apiClient.ApiClient
import com.example.appprojeto.apiInterface.UsuarioEndPoint
import com.example.appprojeto.models.Usuario
import com.example.appprojeto.util.Util
import com.google.android.material.textfield.TextInputLayout
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.ByteArrayOutputStream
import java.lang.Integer.parseInt
import java.util.*

class UsuarioActivity : AppCompatActivity() {
    lateinit var con: Context
    private lateinit var rowCodigo: TableRow
    lateinit var txtCodigo: EditText
    private lateinit var txtNomeLayout: TextInputLayout
    lateinit var txtNome: EditText
    lateinit var txtNascimento: EditText
    private lateinit var imgFoto: ImageView
    private var idUsuario: String? = ""
    var user: Usuario = Usuario()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_usuario)
        setSupportActionBar(toolbar)

        con = this
        rowCodigo = findViewById(R.id.usuario_rowcodigo)
        txtCodigo = findViewById(R.id.usuario_txtcodigo)
        txtNomeLayout = findViewById(R.id.usuario_txtnome_layout)
        txtNome = findViewById(R.id.usuario_txtnome)
        txtNascimento = findViewById(R.id.usuario_txtnascimento)
        imgFoto = findViewById(R.id.usuario_imgfoto)

        rowCodigo.visibility = View.GONE

        idUsuario = intent.getStringExtra("codigo")
        if (idUsuario != null && idUsuario!!.trim() != "") {
            rowCodigo.visibility = View.VISIBLE
            carregaDadosUsuario()
        }

        if (Build.VERSION.SDK_INT >= 23) {
            checkSelfPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED
        }
    }

    private fun carregaDadosUsuario() {
        val retrofitClient = ApiClient.getRetrofitInstance()
        val endpoint = retrofitClient.create(UsuarioEndPoint::class.java)
        val callback = endpoint.getUsuario(parseInt(idUsuario.toString()))

        callback.enqueue(object : Callback<Usuario> {
            override fun onFailure(call: Call<Usuario>, t: Throwable) {
                Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
            }

            @SuppressLint("NewApi")
            override fun onResponse(call: Call<Usuario>, response: Response<Usuario>) {
                val usuario = response.body()
                if (response.isSuccessful && usuario != null) {
                    user = usuario
                    txtCodigo.setText(usuario.codigo.toString())
                    txtNome.setText(usuario.nome)
                    txtNascimento.setText(Util.converteDataJsonToDataBr(usuario.nascimento.toString()))
                    reloadFoto();
                }
            }
        })
    }

    private fun reloadFoto() {
        if (user.foto != null && user.foto!!.trim() != "") {
            val imageBytes = Base64.decode(user.foto, Base64.DEFAULT)
            val decodedImage = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
            imgFoto.setImageBitmap(decodedImage)
        } else {
            imgFoto.setImageResource(R.drawable.noimageicon)
        }
    }

    fun addFoto(view: View) {
        val gallery = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI)
        startActivityForResult(gallery, 200)
    }

    fun addData(view: View) {
        val c = Calendar.getInstance()
        val year = c.get(Calendar.YEAR)
        val month = c.get(Calendar.MONTH)
        val day = c.get(Calendar.DAY_OF_MONTH)

        val dpd = DatePickerDialog(
            this,
            DatePickerDialog.OnDateSetListener { view, year, monthOfYear, dayOfMonth ->
                var day = dayOfMonth.toString()
                var month = monthOfYear.toString()
                if (dayOfMonth < 10)
                    day = "0$dayOfMonth"
                if (monthOfYear < 10)
                    month = "0$monthOfYear"
                txtNascimento.setText("$day/$month/$year")
            },
            year,
            month,
            day
        )

        dpd.show()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun addSalvar(view: View) {
        var valido = true
        if (txtNome.text == null || txtNome.text.toString().trim() == "") {
            valido = false
            txtNomeLayout.error = getString(R.string.usuario_usuarioalertainformeonomestr);
        }

        if (valido) {
            user.nome = txtNome.text.toString()
            user.nascimento = Util.converteDataBrToDataJson(txtNascimento.text.toString())

            val retrofitClient = ApiClient.getRetrofitInstance()
            val endpoint = retrofitClient.create(UsuarioEndPoint::class.java)

            if (idUsuario != null && idUsuario!!.trim() != "") {
                val callback = endpoint.putUsuario(parseInt(idUsuario!!), user)
                callback.enqueue(object : Callback<Usuario> {
                    override fun onFailure(call: Call<Usuario>, t: Throwable) {
                        Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
                    }

                    @SuppressLint("NewApi")
                    override fun onResponse(call: Call<Usuario>, response: Response<Usuario>) {
                        if (response.isSuccessful) {
                            val intent = Intent(con, MainActivity::class.java)
                            startActivity(intent)
                        }
                    }
                })

            } else {
                val callback = endpoint.postUsuario(user)
                callback.enqueue(object : Callback<Usuario> {
                    override fun onFailure(call: Call<Usuario>, t: Throwable) {
                        Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
                    }

                    @SuppressLint("NewApi")
                    override fun onResponse(call: Call<Usuario>, response: Response<Usuario>) {
                        if (response.isSuccessful) {
                            val intent = Intent(con, MainActivity::class.java)
                            startActivity(intent)
                        }
                    }
                })
            }
        }
    }

    fun addVoltar(view: View) {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && requestCode == 200 && data != null) {
            val imageUri = data.data
            if (imageUri != null) {
                val inputStream = contentResolver.openInputStream(imageUri)
                val bitmap = BitmapFactory.decodeStream(inputStream)
                val byteArrayOutputStream = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
                val byteArray: ByteArray = byteArrayOutputStream.toByteArray()
                user.foto = Base64.encodeToString(byteArray, Base64.DEFAULT)
                reloadFoto();
            }
        }
    }
}
