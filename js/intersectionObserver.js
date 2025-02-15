// jQuery para scroll suave - requer o plugin jQuery Easing
$(function () {
    $('a[href*="#"]:not([href="#"])').on('click', function (e) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - 85, // Ajuste para o header fixo
                    },
                    1200,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
});