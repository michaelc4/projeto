package com.example.appprojeto.util

import android.os.Build
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class Util {
    companion object {
        @RequiresApi(Build.VERSION_CODES.O)
        fun converteDataJsonToDataBr(dataJson: String): String {
            return if (dataJson != null && dataJson != "") {
                val date = LocalDate.parse(dataJson, DateTimeFormatter.ISO_DATE)
                val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                date.format(formatter)
            } else {
                ""
            }
        }

        @RequiresApi(Build.VERSION_CODES.O)
        fun converteDataBrToDataJson(dataBr: String): String? {
            return if (dataBr != null && dataBr != "") {
                val formatterBr = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                val date = LocalDate.parse(dataBr, formatterBr)
                val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
                date.format(formatter)
            } else {
                null
            }
        }
    }
}