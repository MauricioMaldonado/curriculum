(function() {
    "use strict";

    document.addEventListener('DOMContentLoaded',function(){

        var page = document.URL;
        console.log(page);

        
        $(window).on('scroll', function(){
            if($(window).scrollTop()){
                $('nav').addClass('black');
            }
            else{
                $('nav').removeClass('black');
            }
        })

        if ( page.indexOf('registro') == -1) {
            var map = L.map('mapa').setView([-33.4390711,-70.6641411], 11);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            L.marker([-33.4390711,-70.6641411]).addTo(map)
                .bindPopup('SANTIAGO DE CHILE')
                .openPopup()
                .bindTooltip()
                .openTooltip();
        }
        
        if(page.indexOf('registro') > -1){
            var regalo = document.getElementById('regalo');

            //campos datos usuario
            var nombre = document.getElementById('nombre');
            var apellido = document.getElementById('apellido');
            var email = document.getElementById('email');
    
            //campos datos pases de dia
            var pase_dia = document.getElementById('pase_dia');
            var pase_dosdias = document.getElementById('pase_dosdias');
            var pase_completo = document.getElementById('pase_completo');
    
            //botones y divs
            var calcular = document.getElementById('calcular');
            var error_div = document.getElementById('error');
            var botonregistro = document.getElementById('btnRegistro');
            var lista_productos = document.getElementById('lista-productos');
            var suma_total = document.getElementById('suma-total');
    
            //Extras
            var camisas = document.getElementById('camisa_evento');
            var etiquetas = document.getElementById('etiquetas');
    
            calcular.addEventListener('click', calcularMontos);
    
            pase_dia.addEventListener('blur',mostrarDias);
            pase_dosdias.addEventListener('blur',mostrarDias);
            pase_completo.addEventListener('blur',mostrarDias);
    
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarEmail);
            apellido.addEventListener('blur', validarCampos);
            nombre.addEventListener('blur', validarCampos);
    
    
            function validarCampos(){
                if(this.value == ''){
                    error_div.style.display = 'block';
                    error_div.innerHTML = 'Este campo es obligatorio';
                    this.style.border = '1px solid red';
                } else {
                    error_div.style.display = 'none';
                    error_div.innerHTML = '';
                    this.style.border = '1px solid gray';
                }
            };
    
            function validarEmail(){
                if(this.value.indexOf("@") > -1){
                    error_div.style.display = 'none';
                    error_div.innerHTML = '';
                    this.style.border = '1px solid gray';
                } else {
                    error_div.style.display = 'block';
                    error_div.innerHTML = 'Debe tener al menos un @';
                    this.style.border = '1px solid red';
                    
                }
            }
    
            function calcularMontos(event){
                event.preventDefault();
                if(regalo.value === ''){
                    alert("Debes elegir un regalo");
                    regalo.focus();
                } else {
                    var boletosDia = parseInt(pase_dia.value,10) || 0, 
                        boletos2Dias = parseInt(pase_dosdias.value,10) || 0, 
                        boletosCompleto = parseInt(pase_completo.value,10) || 0,
                        cantCamisas = parseInt(camisas.value,10) || 0, 
                        cantEtiquetas = parseInt(cantEtiquetas = etiquetas.value,10) || 0;
    
                    var totalPagar = (boletosDia* 30) + (boletos2Dias * 45) + (boletosCompleto * 50) + (.93*(cantCamisas*10) + (cantEtiquetas*2));
    
                    var listado_productos = [];
    
                    if(boletosDia > 0){
                        listado_productos.push(boletosDia + ' Pases por dia');
                    }
                    if(boletos2Dias > 0){
                        listado_productos.push(boletos2Dias + ' Pases por 2 dias');
                    }
                    if(boletosCompleto > 0){
                        listado_productos.push(boletosCompleto + ' Pases Completos');
                    }
                    if(cantCamisas > 0){
                        listado_productos.push(cantCamisas + ' Camisas');
                    }
                    if(cantEtiquetas > 0){
                        listado_productos.push(cantEtiquetas + ' Etiquetas');
                    }
                    if(lista_productos.length > 0){
                        lista_productos.style.display = 'block';
                    }
    
                    lista_productos.innerHTML = '';
    
                    for(var i = 0 ; i < listado_productos.length; i++){
                        lista_productos.innerHTML += listado_productos[i] + '<br/>';
                    }
    
                    suma_total.innerHTML = '$' + totalPagar.toFixed(0);
    
                    
                }
            }
    
            function mostrarDias(){
                var boletosDia = parseInt(pase_dia.value,10) || 0, 
                boletos2Dias = parseInt(pase_dosdias.value,10) || 0, 
                boletosCompleto = parseInt(pase_completo.value,10) || 0;
    
                var diasElegidos = [];
    
                if(boletosDia > 0){
                    diasElegidos.push('viernes');
                } else {
                    document.getElementById('viernes').style.display = 'none';
                }
                if(boletos2Dias > 0){
                    diasElegidos.push('viernes','sabado');
                } else {
                    document.getElementById('sabado').style.display = 'none';
                }
                if(boletosCompleto > 0){
                    diasElegidos.push('viernes','sabado','domingo');
                } else{
                    document.getElementById('domingo').style.display = 'none';
                }
    
                console.log(diasElegidos);
    
                for(var j= 0; j < diasElegidos.length ;j++){
                    document.getElementById(diasElegidos[j]).style.display = 'grid';
                }
            }
    
    
        }
        

    }); //DOM CONTENT LOADED
})();