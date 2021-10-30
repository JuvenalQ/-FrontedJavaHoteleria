// trae la informacion desde la bbdd  
function traerInformacionCliente() {
  $.ajax({
    url: "http://129.151.117.48:8080/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {

      if (respuesta == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio el parametro por la funcion
        pintarRespuestaCliente(respuesta);
      }
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar Cliente), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema con el Registro, ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaCliente(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr>";
  // myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Nombre " + "</th>";
  myTable += "<th>" + " Email " + "</th>";
  myTable += "<th>" + " Contraseña " + "</th>";
  myTable += "<th>" + " Edad " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    // myTable += "<td> <button   class='btn btn-info' onclick='editarInformacionForIdCliente(" + items[i].id + ")'> Actualizar </button> </td>";
    myTable += "<td>" + items[i].idClient + "</td>";
    myTable += "<td>" + items[i].name + "</td>";
    myTable += "<td>" + items[i].email + "</td>";
    myTable += "<td>" + items[i].password + "</td>";
    myTable += "<td>" + items[i].age + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarCliente(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}


//Guarda y envia la informacion a la BBDD
function guardarInformacionCliente() {

  let myData = {
    idClient: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    age: $("#age").val(),
  };

  if ($("#name").val() == "" || $("#email").val() == "" || $("#password").val() == "" || $("#age").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un cliente ");
  } else {
    $.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      data: JSON.stringify(myData),
      url: "http://129.151.117.48:8080/api/Client/save",
      success: function (response) {
        console.log("Se guardo correctamente el cliente" + response);

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#password").val("");
        $("#age").val("");

        //actualizamos la tabla cliente
        traerInformacionCliente();
        //mostramos que se hizo efectivo 
        alert('SE HA GUARDADO EL CLIENTE.');
      },
      error: function (xhr, jqXHR, textStatus, errorThrown) {
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      }
    });
  }
}

function cancelar() {
  location.reload();
}


/*
//Llena los campos del registro seleccionado
function editarInformacionForIdCliente(id) {

  alert("registro a actualizar #: " + id);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (cliente) { //Obtengo en un array los datos de la habitacion
      let item = cliente.items[0]; //Guardo en una variable el array

      console.log("mirar aca" + cliente);
      // inhabilitamos el boton guardar datos
      $("#btnGuardarCliente").prop('disabled', true);
      $("#btnGuardarCliente").hide();

      //Habilito el boton actualizar
      $("#IdActualizarCliente").prop('disabled', false);
      $("#IdActualizarCliente").show();

      //Obtengo cada item del array en su campo
      $("#id").val(id);
      $("#id").prop('readonly', true);
      //$("#name").val(item.name);
      //$("#email").val(item.email);
      //$("#age").val(item.age);
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id cliente), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacionCliente() {

  //obtengo los valors de los campos
  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  if ($("#name").val() == "" || $("#email").val() == "" || $("#age").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un cliente ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {

        // limpiamos los campos
        $("#resultado").empty();
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
      },
      complete: function (xhr, status) {
        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardarCliente").prop('disabled', false);
        $("#btnGuardarCliente").show();

        //actualizamos la tabla
        traerInformacionCliente();

        //mostramos que se hizo efectivo
        alert('El Cliente se ha actualizado.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }
}

//Elimna un elemento de la tabla
function EliminarCliente(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
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
      traerInformacionCliente();
      alert("Se elmino el cliente");
    }
  })
}
 */