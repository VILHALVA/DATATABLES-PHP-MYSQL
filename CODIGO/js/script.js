$(document).on("ready", function(){
    listar();
    guardar();
    eliminar();
});

$("#btn_listar").on("click", function(){
    listar();
});

var guardar = function(){
    $("form").on("submit", function(e){
        e.preventDefault();
        var frm = $(this).serialize();
        $.ajax({
            method: "POST",
            url: "guardar.php",
            data: frm
        }).done( function( info ){
            console.log( info );
            var json_info = JSON.parse( info );
            mostrar_mensaje( json_info );
            limpiar_datos();
            listar();
        });
    });
}

var eliminar = function(){
    $("#eliminar-usuario").on("click", function(){
        var idusuario = $("#frmEliminarUsuario #idusuario").val(),
            opcion = $("#frmEliminarUsuario #opcion").val();
        $.ajax({
            method:"POST",
            url: "guardar.php",
            data: {"idusuario": idusuario, "opcion": opcion}
        }).done( function( info ){
            var json_info = JSON.parse( info );
            mostrar_mensaje( json_info );
            limpiar_datos();
            listar();
        });
    });
}

var mostrar_mensaje = function( informacion ){
    var texto = "", color = "";
    if (informacion.respuesta == "BIEN" ){
        texto = "<strong>Sucesso!</strong> As alterações foram salvas corretamente.";
        color = "#379911";
    } 
    else if (informacion.respuesta == "ERROR"){
        texto = "<strong>Erro!</strong> Não foi possível executar a consulta.";
        color = "#C9302C";
    }
    else if (informacion.respuesta == "EXISTE" ){
        texto = "<strong>Informação!</strong> O usuário já existe.";
        color = "#5b94c5";
    }
    else if (informacion.respuesta == "VACIO" ){
        texto = "<strong>Aviso!</strong> Você deve preencher todos os campos solicitados.";
        color = "#ddb11d";
    } 
    else if (informacion.respuesta == "OPCION_VACIA" ){
        texto = "<strong>Aviso!</strong> A opção não existe ou está vazia. Recarregue a página.";
        color = "#ddb11d";
    }    

    $(".mensaje").html( texto ).css({"color": color });
    $(".mensaje").fadeOut(5000, function(){
        $(this).html("");
        $(this).fadeIn(3000);
    });			
}

var limpiar_datos = function(){
    $("#opcion").val("registrar");
    $("#idusuario").val("");
    $("#nombre").val("").focus();
    $("#apellidos").val("");
    $("#dni").val("");
}

var listar = function(){
        $("#cuadro2").slideUp("slow");
        $("#cuadro1").slideDown("slow");
    var table = $("#dt_cliente").DataTable({
        "destroy":true,
        "ajax":{
            "method":"POST",
            "url": "listar.php"
        },
        "columns":[
            {"data":"nombre"},
            {"data":"apellidos"},
            {"data":"dni"},
            {"defaultContent": "<button type='button' class='editar btn btn-primary'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}	
        ],
        "language": idioma_espanol,
        "dom": "<'row'<'form-inline' <'col-sm-offset-5'B>>>"
             +"<'row' <'form-inline' <'col-sm-1'f>>>"
             +"<rt>"
             +"<'row'<'form-inline'"
             +" <'col-sm-6 col-md-6 col-lg-6'l>"
             +"<'col-sm-6 col-md-6 col-lg-6'p>>>",
        "buttons":[
            {
                "text": "<i class='fa fa-user-plus'></i>",
                "titleAttr": "Agregar Usuario",
                "className": "btn btn-success",
                "action": function(){
                    agregar_nuevo_usuario();
                }
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel'
         },
         {
             extend: 'csvHtml5',
             text: '<i class="fa fa-file-text-o"></i>',
             titleAttr: 'CSV'
         },
         {
            extend:    'pdfHtml5',
            text:      '<i class="fa fa-file-pdf-o"></i>',
            titleAttr: 'PDF'
         }
        ]
    });

    obtener_data_editar("#dt_cliente tbody", table);
    obtener_id_eliminar("#dt_cliente tbody", table);
}

var agregar_nuevo_usuario = function(){
    limpiar_datos();
    $("#cuadro2").slideDown("slow");
    $("#cuadro1").slideUp("slow");
}

var obtener_data_editar = function(tbody, table){
    $(tbody).on("click", "button.editar", function(){
        var data = table.row( $(this).parents("tr") ).data();
        var idusuario = $("#idusuario").val( data.idusuario ),
        nombre = $("#nombre").val( data.nombre ),
        apellidos = $("#apellidos").val( data.apellidos ),
        dni = $("#dni").val( data.dni ),
        opcion = $("#opcion").val("modificar");
        $("#cuadro2").slideDown("slow");
        $("#cuadro1").slideUp("slow");
    });
}

var obtener_id_eliminar = function(tbody, table){
    $(tbody).on("click", "button.eliminar", function(){
        var data = table.row( $(this).parents("tr") ).data();
        var idusuario = $("#frmEliminarUsuario #idusuario").val( data.idusuario );
    });
}

var idioma_espanol = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}
