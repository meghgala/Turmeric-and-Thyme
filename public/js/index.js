function myFunction() {
    let url = "./login.html";
    let height = 400;
    let width = 350;
    var left = ( screen.width - width ) / 2;
    var top = ( screen.height - height ) / 2;
    var newWindow = window.open( url, "center window", 'resizable = yes, width=' + width + ', height=' + height + ', top='+ top + ', left=' + left);
  }