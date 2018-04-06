$('.wrapper').each(function () {
    var $slider = $(this);
    var numberOfSlides = $slider.find('.panel').length;

    $slider.find('.panel:eq(0)').addClass('_active');
    $slider.find('.nav-dot:eq(0)').addClass('active');

    var $activeSlide = $slider.find('.panel._active');

    $('.nav-dot').on('click', function () {
        var slideToGo = $(this).data('slide');
        goToSlide(slideToGo);
    });


    $slider.on('slide.changed', function () {
        $('.nav-dot').removeClass('active');
        var $activeDot = $('.nav-dot[data-slide="' + $('.panel._active').data('slide') + '"]');
        $activeDot.addClass('active');
    });
    function nextSlide() {
        $activeSlide = $slider.find('.panel._active');
        var $nextSlide = $activeSlide.next('.panel');
        $activeSlide.removeClass('_active');
        $nextSlide.addClass('_active');

        //$activeSlide = $nextSlide;

        var slideIndex = $slider.find('.panel._active').index('.panel');


        if (slideIndex >= numberOfSlides || slideIndex <= -1) {
            firstSlide();
            $slider.trigger('slide.changed');

        } else {
            $slider.trigger('slide.changed');
        }

    }

    function prevSlide() {
        $activeSlide = $slider.find('.panel._active');

        var $prevSlide = $activeSlide.prev('.panel');
        $activeSlide.removeClass('_active');
        $prevSlide.addClass('_active');

        var slideIndex = $slider.find('.panel._active').index();



        if (typeof $prevSlide === 'undefined' || $prevSlide === null || $prevSlide.length == -1 || slideIndex <= -1) {
            lastSlide();
            $slider.trigger('slide.changed');
        } else {
            $slider.trigger('slide.changed');
        }

    }

    function firstSlide() {
        $('.panel._active').removeClass('_active');
        $slider.find('.panel:eq(0)').addClass('_active');
        $activeSlide = $slider.find('.panel:eq(0)');

    }

    function lastSlide() {
        $('.panel._active').removeClass('_active');
        $slider.find('.panel').eq(numberOfSlides - 1).addClass('_active');
    }

    function goToSlide(slideToGo) {
        $('.panel._active').removeClass('_active');
        $slider.find('.panel').eq(slideToGo - 1).addClass('_active');
        $activeSlide = $slider.find('.panel').eq(slideToGo - 1).addClass('_active');
        $slider.trigger('slide.changed');
    }
    var IsCanMove = true;
    $('.panel').on('mousewheel DOMMouseScroll', function (ev) {
        if (IsCanMove) {
            IsCanMove = false;
            if (ev.originalEvent.deltaY > 0) {
                //向下
                nextSlide();
            } else {
                //向上
                prevSlide();
            }
            setTimeout(function () { IsCanMove = true }, 500);
        }

    })
});
var ion = null;
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1300;//星星数量

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y, z) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / z;
    //星星移动范围，值越大范围越小，
}

var Star = function () {
    this.orbitRadius = random(maxOrbit(w, h, 2));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    //星星移动速度
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
    new Star();
}
function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.5; //尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };

    ion = window.requestAnimationFrame(animation);
}

animation();

$(".header").click(function () {
    var y = 2;
    var int = setInterval(function () {
        aaa(y);
        y = y + 1;
        if (y > 50) {
            $(".Myphoto").show();
            clearInterval(int);
            window.cancelAnimationFrame(ion);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.innerHeight;
            window.innerWidth
            $(".Myphoto").animate({
                top: "25%"
            });
            $(".title").fadeIn(2000);
            $(".content").fadeIn(2000);
            typing();
        }
    }, 50);
});
function aaa(y) {
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].orbitRadius = random(maxOrbit(w, h, y));
        stars[i].radius = random(60, stars[i].orbitRadius) / 8;
    };
}

var str = 'Hi,我是李浩海<br/>这个呢就是我的邮箱了<br/>1822674931@qq.com<br/>下翻就是我的一些详细介绍了';
var i = 0;
function typing() {
    var divTyping = $(".content")[0];
    if (i <= str.length) {
        if (str.slice(i - 1, i) == "<") {
            i++;
        }
        divTyping.innerHTML = str.slice(0, i++);
        setTimeout('typing()', 50);
    }
    else {
        divTyping.innerHTML = str;
    }
}

function ShowInfo(e) {
    if ($(".abstract").is(":hidden")) {
        $("#tagsList").animate({
            right: "26%",
            top: "20%",
        });
        $(".abstract").show();
    } else {
        $(".abstract .synopsis").html($(".abstract .synopsis").html() + "aaa");
    }
}

jQuery(document).ready(function (event) {
    var projectsContainer = $('.cd-projects-container'),
        navigation = $('.cd-primary-nav'),
        triggerNav = $('.cd-nav-trigger'),
        logo = $('.cd-logo');
    triggerNav.hide(0);
    triggerNav.on('click', function () {
        if (triggerNav.hasClass('project-open')) {
            triggerNav.hide(0);
            projectsContainer.removeClass('project-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $(this).children('.cd-project-info').scrollTop(0).removeClass('has-boxshadow');
            });
            triggerNav.add(logo).removeClass('project-open');
        }
    });

    projectsContainer.on('click', '.single-project', function () {
        var selectedProject = $(this);
        if (projectsContainer.hasClass('nav-open')) {
            triggerNav.add(projectsContainer).add(navigation).removeClass('nav-open');
        } else {
            selectedProject.addClass('selected');
            projectsContainer.add(triggerNav).add(logo).addClass('project-open');
            triggerNav.show(0);
        }
    });
});