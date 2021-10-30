// trae la informacion desde la bbdd  
function traerinformacion() {

  $.ajax({
    url: "http://129.151.117.48:8080/api/Reservation/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);

      if (respuesta == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio por parametro  la funcion 
        pintarRespuesta(respuesta);
      }
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar Habitaciones paty y jostin), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuesta(items) {

  //desactivo el boton de actulizar registro
  $("#btnActualizar").hide();
  $("#btnConsultar").hide();

  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  // myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Fecha de inicio " + "</th>";
  myTable += "<th>" + " Fecha de devolución " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    // myTable += "<td> <button   class='btn btn-info'  onclick='editarInformacionForId(" + items[i].id + ")'> Actualizar </button> </td>";
    myTable += "<td>" + items[i].idReservation + "</td>";
    myTable += "<td>" + items[i].startDate + "</td>";
    myTable += "<td>" + items[i].devolutionDate + "</td>";
    // myTable += "<td>" + items[i].category + "</td>";
    // myTable += "<td>" + items[i].hotel + "</td>";
    // myTable += "<td>" + items[i].description + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarHabitacion(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}

function guardarinformacion() {

  let myData = {
    idReservation: $("#idReservation").val(),
    startDate: $("#startDate").val(),
    devolutionDate: $("#devolutionDate").val(),
  };

  if ($("#startDate").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {
    $.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      data: JSON.stringify(myData),
      url: "http://129.151.117.48:8080/api/Reservation/save",
      success: function (response) {

        console.log("Se guardo correctamente la reservacion " + response);
        //mostramos que se hizo efectivo 
        alert('SE HA iNGRESO CORRECTAMENTE LA RESERVACION.');

        // limpiamos los campos s
        $("#resultado").empty();
        $("#idReservation").val("");
        $("#startDate").val("");
        $("#devolutionDate").val("");

        //actualizamos la tabla 
        traerinformacion();
      },

      error: function (xhr, jqXHR, textStatus, errorThrown) {
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      }
    });
  }
}


/* 
//reto4
//url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + item,

function editarInformacionForId(id) {
  
  alert("registro a actualizar #: " + id);
  
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (habitacion) { //Obtengo en un array los datos de la habitacion

      // Comentare esta parte porque no me trar la informacion que necesito 
      let item = habitacion.items[0]; //Guardo en una variable el array 
      console.log("este es id: " + id);
      // inhabilitamos el boton guardar datos  para ingresar
      $("#btnGuardar").prop('disabled', true);
      $("#btnGuardar").hide();

      //Habilito el boton actualizar
      $("#btnActualizar").prop('disabled', false);
      $("#btnActualizar").show();

      console.log("Traemos informacion de la habitacion " + item.id);
      //Obtengo cada item del array en su campo
      $("#id").val(id);
      $("#id").prop('readonly', true); // descativamos la propiedad de modificar el Id 
      //$("#room").val(item.room);
      //$("#stars").val(item.stars);
      //$("#category_id").val(item.category_id);
      //$("#description").val(item.description);
      //$("#description").val(" ");
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id Habitacion), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacion() {

  //Obtengo el valor de los campos 
  let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
  };

  if ($("#room").val() == "" || $("#stars").val() == "" || $("#category_id").val() == "" || $("#description").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#room").val("");
        $("#stars").val("");
        $("#category_id").val("");
        $("#description").val("")
      },
      complete: function (xhr, status) {

        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardar").prop('disabled', false);
        $("#btnGuardar").show();

        //actualizamos la tabla 
        traerinformacion();

        //mostramos que se hizo efectivo 
        alert('Se Actalizo La Habitacion Correctamente.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }

}


//Elimna un elemento de la tabla 
function EliminarHabitacion(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      console.log('Se elimino Correctamente')
    },
    error: function (xhr, status) {
      alert('Ups! Ocurrio un gran error ' + xhr.status);
    },
    complete: function (xhr, status) {

      $("#resultado").empty();
      traerinformacion();
      alert("Se elimino sastifactorimente");
    }
  })
} */

function cancelar() {
  location.reload();
}
