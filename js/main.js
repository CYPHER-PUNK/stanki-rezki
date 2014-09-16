function tintImage(imgElement,tintColor) {
    // create hidden canvas (using image dimensions)
    var canvas = document.createElement("canvas");
    canvas.width = imgElement.offsetWidth;
    canvas.height = imgElement.offsetHeight;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement,0,0);

    var map = ctx.getImageData(0,0,320,240);
    var imdata = map.data;

    // convert image to grayscale
    var r,g,b,avg;
    for(var p = 0, len = imdata.length; p < len; p+=4) {
        r = imdata[p]
        g = imdata[p+1];
        b = imdata[p+2];

        avg = Math.floor((r+g+b)/3);

        imdata[p] = imdata[p+1] = imdata[p+2] = avg;
    }

    ctx.putImageData(map,0,0);

    // overlay filled rectangle using lighter composition
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.5;
    ctx.fillStyle=tintColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // replace image source with canvas data
    imgElement.src = canvas.toDataURL();
    imgElement.style = 'test';
}

$("table.now tr").each(function() {
    $(this).css('height', $(this).height() + 5);
});
$("table.now td").each(function() {
    //$(this).css('width', $(this).width() + 20);
});
nowImgEvents = function() {console.log(1);
    $("table.now img").each(function() {
        var originalWidth = $(this).width();
        var width = originalWidth-20;
        var originalImage = $(this).clone();
        $(this).animate({width: width});
        $(this).mouseover(function() {
            this.removeAttribute('style');
            tintImage(this, "#550000");
        });
        $(this).mouseout(function() {
            $(this).attr("src", originalImage.attr('src'));
            //$(this).animate({src: originalImage.attr('src')});
            $(this).animate({width: width}, 300);
        });
    });
};
nowImgEvents();