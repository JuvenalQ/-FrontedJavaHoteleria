// trae la informacion desde la bbdd  
function traerCategorias() {

  $.ajax({
    url: "http://129.151.117.48:8080/api/Category/all",
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
      console.log('Petición realizada(Consultar categorias), ' + xhr.status);
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
  myTable += "<th>" + " Nombre " + "</th>";
  myTable += "<th>" + " Descripción " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    // myTable += "<td> <button   class='btn btn-info'  onclick='editarInformacionForId(" + items[i].id + ")'> Actualizar </button> </td>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].name + "</td>";
    myTable += "<td>" + items[i].description + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarCategoria(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);

}

function guardarinformacion() {

  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    description: $("#description").val()
  };

  if ($("#name").val() == "" || $("#description").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {

    $.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      data: JSON.stringify(myData),
      url: "http://129.151.117.48:8080/api/Category/save",
      success: function (response) {
        console.log(response);
        console.log("Se guardo correctamente la categoria");
        //mostramos que se hizo efectivo 
        alert('SE HA iNGRESO CORRECTAMENTE.');

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#name").val("")
        $("#description").val("");

      },
      error: function (xhr, jqXHR, textStatus, errorThrown) {
        //window.location.reload()
        alert('Ups! Ocurrio un gran error, estado:  ' + xhr.status);
      },
      complete: function (xhr, status) {
        console.log('resultado de la peticion ' + xhr.status);
        //actualizamos la tabla 
        traerCategorias();
      }
    })
  };
}


//////////////////////////////////////
////// Reto 4 ////////////////////////
//////////////////////////////////////

//url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + item,
// esta es  url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + id,
/* 
function editarInformacionForId(id) {

  alert("registro a actualizar #: " + id);

  $.ajax({
    url: "" + id,
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
    name: $("#name").val(),
    description: $("#description").val(),
  };

  if ($("#name").val() == "" || $("#description").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, url: "",
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

        console.log('Petición realizada(Actualizar Categoria ), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardar").prop('disabled', false);
        $("#btnGuardar").show();

        //actualizamos la tabla 
        traerCategorias();

        //mostramos que se hizo efectivo 
        alert('Se Actalizo La Habitacion Correctamente.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }

}
 */


//Elimna un elemento de la tabla 
/* function EliminarCategoria(idElemento) {


  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  console.log(myData + " eliminar")
  $.ajax({
s
    url: "http://localhost:8080/api/Client/5",
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
      traerCategorias();
    }
  })
} */

function cancelar() {
  location.reload();
}