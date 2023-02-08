$(function(){
    var body = $('body');
    var winH = $(window).height();
    var siteMenuCaller = $('.siteMenuCaller');
    var mainMenu = $('.mainMenu');
    var pager = $('.pager');
    var book_block = $('.book');
    var navFol_winH = $(window).scrollTop() + winH;
    var siteMenu_count = 0;
    var scrolledTop = $(window).scrollTop();
    var data_aliases = [];
    //
    var that;
    
    if(
        navigator.userAgent.match(/MSIE 9/i)
        || navigator.userAgent.match(/MSIE 10/i)
        || navigator.userAgent.match(/Trident\/7\./)
        || navigator.userAgent.match(/Edge\/\d./)
    ){
        $('body').on("mousewheel", function () {
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }
        
    //Навигатор следующий за центром
    function navFolower(){
        navFol_winH = $(window).scrollTop() + winH;
        
        //Определяю блок в области окна. Назначаю его текущим.
        book_block.each(function(){
            //Для сокращения кода. Отобрал отступ у элементов.
            //Отступ от верха в текущего блока.
            var objOffTop = $(this).offset().top;
            //Когда блок вошёл в видимость браузера.
            var objH = ( $(this).offset().top-scrolledTop+$(this).height() );
            
            //Отступ от верха в текущем блоке.
            var curOfTop = scrolledTop-$(this).offset().top+(winH/2);
            //Высота текущего блока
            var curFullH = scrolledTop-$(this).offset().top;
            var curH = $(this).height();
            
            var inside = scrolledTop-$(this).offset().top;
            
            if( objOffTop<navFol_winH && objH>0 ){
                $(this).addClass('current');
                $(this)
                    .find('.pager')
                    .addClass('folower');
                
                //После определения текущих блоков. Работаю с текущими пейджерами
            
                var folower = $(this).find('.folower');
                var folower_top = folower.position().top;
                
                if( curOfTop>100 && curOfTop<curH-200 ){
                    folower.css('top', curOfTop)
                }
            }
            else {
                $(this).removeClass('current');
                $(this)
                    .find('.pager')
                    .removeClass('folower');
                
                $(this)
                    .find('.folower')
                    .attr('style','');
            }
        });
    }
    //Навигатор следующий за центром
    
    function openMainMenu(){
        siteMenu_count = 0;
        mainMenu.addClass('active');
        that.addClass('active');

        //Показать жалюзи
        var int = setInterval(function(){
            $('.mainMenu .bg').eq(siteMenu_count).addClass('show');

            siteMenu_count<5
                ? ++siteMenu_count
                : (
                    clearInterval(int),
                    siteMenu_count=0,
                    $('.mainMenu .menu, .mainMenu .soc').addClass('active')
                  );
        },120);
        
        body.addClass('active');
    }
    
    function closeMainMenu(){
        siteMenu_count = 5;
        $('.mainMenu .menu, .mainMenu .soc').removeClass('active')
        //Убрать жалюзи
        var int = setInterval(function(){
            $('.mainMenu .bg').eq(siteMenu_count).removeClass('show');

            siteMenu_count>0
                ? --siteMenu_count
                : (
                    clearInterval(int),
                    siteMenu_count=5,
                    mainMenu.removeClass('active'),
                    that.removeClass('active')
                  );
        },120);
        body.removeClass('active');
    }
    
    function clickMainMenu(){
        that = $(this);
        //open
        if( !mainMenu.hasClass('active') ){
            openMainMenu();
        }
        //close
        else{
            closeMainMenu();
        }
    }//clickMainMenu
    
    siteMenuCaller.on('click', clickMainMenu);
    navFolower();//Навигатор следующий за центром
    
    //Клики по алиасам
    //Собираю алиасы
    for(i=0;i<$('[data-alias]').length;i++){
        data_aliases.push( $('[data-alias]').eq(i).attr('data-alias') );
    }//Собираю алиасы
    
    $(window).on('click',function(e){
        //var it = $(this).attr('data-alias');
        var check = $(e.target);
        var it = null;
        var offTop = null;
        //Не нажимать на себя.
        
        if( check.is('li') ){
            it = $(e.target).attr('data-alias');
            offTop = $('.book[data-alias='+it+']').offset().top;
            $('html,body').animate({scrollTop:offTop},600);
        }        
        if( check.is('.arrFlat_down') ){
            it = $(e.target).attr('data-alias');
            var elemScroll = $('div[data-alias*='+it+']').offset().top;
            $('html,body').animate({scrollTop:elemScroll},1000);
        }        
        if( check.is('ul a') ){
            it = $(e.target).attr('data-alias');
            offTop = $('.quote[data-alias='+it+']').offset().top;
            $('html,body').animate({scrollTop:offTop},0);
        }
    });
    //Клики по алиасам
    
    $('ul.menu a').on('click', closeMainMenu);
    
    $(window).on('scroll',function(){
        scrolledTop = $(window).scrollTop();
        
        (scrolledTop>500) ? $('.bottomLogo').addClass('active') : $('.bottomLogo').removeClass('active');
        
        navFolower();
    });
});