$(document).ready(function(){
    $('#jar').click(function(){
        var jar = $(this);
        if(jar.hasClass('on')){
            //jar.removeClass('on');
        } else {
            jar.addClass('on');
            startLamp();
        }  
    });
});

function startLamp(){
    $('<div class="startBubble" />').appendTo('#jar');
    var i = 0, k = 0, 
        sBub = $('.startBubble');

    function float(){
        $('.startBubble').css({
            bottom: Math.sin(i) * Math.sin(i * 2) * 20 + -100,
            background: "-webkit-radial-gradient(" + Math.sin(i) * 50 + "% " + Math.sin(i) * 50 + "%, ellipse cover, #de782d 0%, #e9ba2c 100%)"
        });
        i += 0.0065;
    }

    function rotate(){
        $('.startBubble').css({
            webkitTransform: "rotate(" + Math.sin(k) * 150 + "deg)"
        });
        k += 0.0065;
    }
    
    setInterval(rotate, 10); // Start rotating bubble

    sBub.animate({bottom: "+=150px"}, 6000, "easeInOutSine", function(){ // bubble heats up and rises
        setInterval(float, 10); // start floating bubble
        $('a.add').fadeIn().click(function(){
            var blob = new Blob();
            return false;
        });
    });

}


function Blob(){
    this.element = $('<div />');
    this.display().speed().newPoint().rise();
};

Blob.prototype.display = function(){
    this.size = rand(40,100);
    this.offset = ($('#cup').width() / 2) - (this.size / 2);
    $(this.element)
        .addClass('blob')
        .css({
            width:this.size,
            height:this.size + rand(2,7),
            left: this.offset
        });

    var stage = $("#jar");
    stage.append(this.element);


    return this;
};

Blob.prototype.speed = function(){
    this.duration = this.size * 200;

    return this;
};

Blob.prototype.newPoint = function(){
    this.topY = rand(400,410);
    this.bottomY = -100;

    return this;
};

Blob.prototype.rise = function(){
    var self = this;

    $(this.element).animate({
        bottom: this.topY
    }, this.duration, "easeInOutSine", function(){
        self.newPoint().speed().fall();
    });

    lightChange(this.element);
};

Blob.prototype.fall = function(){
    var self = this;

    $(this.element).delay(rand(3000,7000)).animate({
        bottom: this.bottomY
    }, this.duration, "easeInOutSine", function(){
        self.newPoint().speed().rise();
    });
};


function rand(min, max){
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}

function lightChange(el){
     var k = 40;
     var light = setInterval(function (){
        if(k < 250){
            $(el).css({
                background: "-webkit-radial-gradient(50% " + k + "%, ellipse cover, #e9ba2c 0%, #c32526 400%)"
            });
            k += 0.18;
        }
    }, 10);
}













