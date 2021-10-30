// trae la informacion desde la bbdd  
function traerInformacionMessage() {
  $.ajax({
    url: "http://129.151.117.48:8080/api/Message/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {

      if (respuesta == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio el parametro por la funcion
        pintarRespuestaMessage(respuesta);
      }

    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar mensajes), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema con el Registro ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaMessage(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  // myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Mensaje " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    // myTable += "<td> <button   class='btn btn-info' onclick='editarInformacionForIdMessage(" + items[i].id + ")'> Actualizar </button> </td>";
    myTable += "<td>" + items[i].idMessage + "</td>";
    myTable += "<td>" + items[i].messageText + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarMessage(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}


//Guarda y envia la informacion a la BBDD
function guardarInformacionMessage() {

  //guardo en una variable los datos a guardar
  let myData = {
    idMessage: $("#id").val(),
    messageText: $("#messageText").val(),
  };

  if ($("#messageText").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos. ");
  } else {
    $.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      data: JSON.stringify(myData),

      url: "http://129.151.117.48:8080/api/Message/save",


      success: function (response) {
        console.log("Se guardo correctamente" + response);

        //actualizamos la tabla 
        traerInformacionMessage();

        //mostramos que se hizo efectivo 
        alert('SE HA GUARDADO EL MENSAGE.');

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#messageText").val("");
      },
      error: function (xhr, jqXHR, textStatus, errorThrown) {
        window.location.reload()
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      }
    });
  }
}

function cancelar() {
  location.reload();
}


/*
function editarInformacionForIdMessage(id) {

  alert("registro a actualizar #: " + id);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (cliente) { //Obtengo en un array los datos de la habitacion
      let item = cliente.items[0]; //Guardo en una variable el array

      console.log("mirar aca" + cliente);
      // inhabilitamos el boton guardar datos
      $("#btnGuardarMessage").prop('disabled', true);
      $("#btnGuardarMessage").hide();

      //Habilito el boton actualizar
      $("#btnActualizarCliente").prop('disabled', false);
      $("#btnActualizarCliente").show();

      //Obtengo cada item del array en su campo
      $("#id").val(id);
      //$("#id").prop('readonly', true);
      //$("#messagetext").val(item.messagetext);
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id Message), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}


//Actuliza el registro seleccionado
function editarInformacionMessage() {

  //Capturo los datos a guardar
  let myData = {
    id: $("#id").val(),
    messagetext: $("#messagetext").val(),
  };

  //valido
  if ($("#id").val() == "" || $("#messagetext").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un mensaje ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        // limpiamos los campos
        $("#resultado").empty();
        $("#id").val("");
        $("#messagetext").val("");
      },
      complete: function (xhr, status) {
        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardarMessage").prop('disabled', false);
        $("#btnGuardarMessage").show();

        //actualizamos la tabla
        traerInformacionMessage();

        //mostramos que se hizo efectivo
        alert('Se actualizo el mensaje.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }
}

//Elimna un elemento de la tabla
function EliminarMessage(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();

    },
    error: function (xhr, status) {
      alert('Ups! Ocurrio un gran error ' + xhr.status);
    },
    complete: function (xhr, status) {
      $("#resultado").empty();
      traerInformacionMessage();
      alert("Se elimino el mensaje");
    }
  })
}
 */

/*
  GET
    https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=1&cosito='cosito'
  POST
    https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room
      headers
        data= {
          Id:1,
          cosito:'cosito',
        }
  PUT
*/