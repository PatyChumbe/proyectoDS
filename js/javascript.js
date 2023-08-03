// Iniciamos todo el javascript:
window.onload = function(){
    // Se inicia el canvas:
    var ctx = iniciaCanvas("#canvas"); 
    //comprobamos el contexto
    if (ctx) { 
        //empezamos a dibujar:
        dibujaCanvas(ctx) ;
    }
    //
    // Se inicia el SliderShow: (Banner)
    // Variable para controlar las posiciones de manera manual
    var slideIndex = 0;
    showDivs(slideIndex);
    // Variable para controlar las posiciones de manera automĂ¡tica 
    var myIndex = 0;
    carousel();
}



//******************************************************************************************* Canvas */
function iniciaCanvas(idCanvas) {
    var elemento = document.querySelector(idCanvas);
    if (elemento && elemento.getContext) {
        var contexto = elemento.getContext('2d');
        if (contexto) {
            return contexto;
        }
    }
    return false;
}

// ***********************   Función para dibujar el Canvas:
function dibujaCanvas(ctx) {
    // Variables para la animación:
    var var_logo = false;
    var var_disp = false;
    var var_ofer = false;
    var var_comp = false;
    var texto = "Pincha en los botones";
    // Fin de las variables para la animación.

    // Sacar un svg:
    var img_tablet = new Image();
    img_tablet.src = "./imagenes/canvas/tablet01.svg";
    // Botones:
    var img_btn = new Image();
    img_btn.src = "./imagenes/canvas/botones.jpg";
    // Crear un fondo animado:
    var img_screen = [3];
    for (var i = 0; i < 3; i++) {
        img_screen[i] = new Image();
        img_screen[i].src = "./imagenes/canvas/screen0" + (i + 1) + ".jpg";
    }

    // Se cargan las imágenes:
    img_tablet.addEventListener("load", tablet, false);
    // Imagen del logotipo:
    var logo = document.images.logo;
    // Imagen de Dispositivos:
    var disp = new Image();
    disp.src = "./imagenes/inicio/dispositivos_360x360.jpg";
    var ofer = new Image();
    ofer.src = "./imagenes/inicio/ofertas_360x360.jpg";
    var comp = new Image();
    comp.src = "./imagenes/inicio/complementos_360x360.jpg";
    
    //console.log("logo",logo);

    // Funciones para las dibujar las imágenes:
    // Dibuja la tablet:
    function tablet() {
        // Carga la imagen SVG de la tablet:
        ctx.drawImage(img_tablet, 125, 10);
        // Estilo para los botones:
        ctx.fillStyle = "rgb(125,125,125)";
        // Dibuja los botones:
        ctx.rect(435, 450, 33, 32);
        ctx.rect(470, 450, 33, 32);
        ctx.rect(505, 450, 33, 32);
        ctx.fill();
        // Pone una imagen a cada botón:
        ctx.drawImage(img_btn, 11, -2, 64, 62, 437, 451, 29, 29);
        ctx.drawImage(img_btn, 79, -2, 64, 62, 472, 451, 29, 29);
        ctx.drawImage(img_btn, 135, -2, 64, 62, 507, 451, 29, 29);
        // Estilos del texto:
        ctx.textAlign="center";
        ctx.font="bold 34px arial";
        ctx.fillStyle="#edae49";
    }

    // Función para el fondo animado:
    function mostrar_imagen_screen(i) {
        ctx.drawImage(img_screen[i], 154, 41);
    }

    
    // ========================================
    // Código para poder pinchar en los botones:
    var btnPlay = new Button(437, 466, 451, 480);
    var btnMedio = new Button(472, 501, 451, 480);
    var btnDerecha = new Button(507, 536, 451, 480);
    //
    function Button(xL, xR, yT, yB) {
        this.xLeft = xL;
        this.xRight = xR;
        this.yTop = yT;
        this.yBottom = yB;
    }
    Button.prototype.checkCliked = function () {
        if (this.xLeft <= mouseX
            && mouseX <= this.xRight
            && this.yTop <= mouseY
            && mouseY <= this.yBottom) return true;
    };
    //
    var mouseX = 0;
    var mouseY = 0;
    canvas.addEventListener("click", mouseClicked, false);

    function mouseClicked(e) {
        //mouseX = e.pageX - canvas.offsetLeft;
        //mouseY = e.pageY - canvas.offsetTop;
        if (!e) e = window.event;
        mouseX = e.offsetX == undefined ? e.layerX : e.offsetX;
        mouseY = e.offsetY == undefined ? e.layerY : e.offsetY;
        if (btnPlay.checkCliked()){
            //alert("Has pulsado Play");
            // Se resetea la variable de la animación de texto:
            y_text = 74;
            if (var_logo) {
                var_logo = false;
                var_disp = false;
            } else {
                var_disp = false;
                var_ofer = false;
                var_comp = false;
                var_logo = true;
            }
        } 
        if (btnMedio.checkCliked()){
            //alert("Has pulsado Medio");
            // Se resetea la variable de la animación de texto:
            y_text = 74;
            if (var_disp) {
                var_logo = false;
                var_disp = false;
            } else {
                var_logo = false;
                var_ofer = false;
                var_comp = false;
                var_disp = true;
            }
        } 
        if (btnDerecha.checkCliked()){
            // alert("Has pulsado Derecha");
            // Se resetea la variable de la animación de texto:
            y_text = 74;
            if(var_disp){
                var_disp = false;
                var_ofer = true;
            } else if(var_ofer) {
                var_ofer = false;
                var_comp = true;
            } else if (var_comp) {
                var_comp = false;
                var_disp = true;
            } else {
                var_logo = false;
                var_disp = true;
            }
        } 
    }
    // Fin del Código para poder pinchar en los botones.
    //=================================


    //**********************
    // Funciónes de limpieza:
    /*var areaW = canvas.width;
    var areaH = canvas.height;
    function clear() {
        ctx.clearRect(0,0,areaW,areaH);
    }*/
    function clear_pantalla() {
        ctx.clearRect(154, 41, 650, 399);
    }

    //***********************
    // Función de Animación:
    var i = 0;
    var y_text = 74;
    var x_text = 478;
    function frame() {
        // Animación del fondo:
        setTimeout(function () { // Relentizo la animación:
            clear_pantalla();
            // Fondo de pantalla:
            mostrar_imagen_screen(i);
            i++;
            if (i >= 3) {
                i = 0;
            }
            // Fin de Fondo de pantalla.
            // Los demás elementos:
            // Imágenes:
            if(var_logo){
                texto = "Grandes promociones en dispositivos";
                ctx.drawImage(logo, 174, 48,608,382); 
            } 
            else if(var_disp){
                texto = "Dispositivos";
                ctx.drawImage(disp, 174, 48,608,382);
            }  
            else if(var_ofer){
                texto = "Ofertas";
                ctx.drawImage(ofer, 174, 48,608,382);
            }  
            else if(var_comp){
                texto = "Complementos";
                ctx.drawImage(comp, 174, 48,608,382);
            }  
            else texto = "Pincha en los botones";
            // Texto:
            ctx.fillText(texto,x_text,y_text);
            ctx.strokeText(texto,x_text,y_text);
            if(y_text<425) y_text+=1;
            // Se auto ejecuta esta función lo que genera una animación:
            requestAnimationFrame(frame);
        }, 1000 / 6); // Fin de Relentizo la animación.
        //
    }

    frame();
}  // ***********************   Fin de la Función para dibujar el Canvas.

//******************************************************************************************* Fin de Canvas */

//******************************************************************************************** Slider */

// Función para el cambio por tiempo:
function carousel() {
    var i;
    var x = document.getElementsByClassName("slider_fotos");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 9000); // Cambia la imagen cada 9 segundos
    //
    showDivs(myIndex);
    currentDiv(myIndex);
  }

  //

  // Funciones para el cambio de manera manual:
  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function currentDiv(n) {
    showDivs(slideIndex = n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slider_fotos");
    var dots = document.getElementsByClassName("slider_foco");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slider_puntero", "");
    }
    // Igualamos las vaiables:
    myIndex=slideIndex+1;
    //
    x[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " slider_puntero";
    
  }

  //******************************************************************************************** Fin del Slider */

  
// Sacar información:
//console.log("ctx",ctx);
//document.write("ctx",ctx);