var $ = jQuery.noConflict();

$(document).ready(function () {
    var uaTwo = window.navigator.userAgent;
    var isIETwo = /MSIE|Trident/.test(uaTwo);

    if (isIETwo) {
        document.documentElement.classList.add('ie');
    }

    if (navigator.userAgent.indexOf('Safari') !== -1 &&
        navigator.userAgent.indexOf('Chrome') === -1) {
        $("body").addClass("safari");
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.scroll_to_top').addClass('active');
        } else {
            $('.scroll_to_top').removeClass('active');
        }
    });

    $('.scroll_to_top').click(function () {
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
    });

    // Centered-Container Swiper FN

    /*
    centerSlideFunction();
    function centerSlideFunction(){
        let style_fix_offset_x = document.createElement("style");
        function dynamic_spacer_swiper(swiper){
            let swiper_el_section = swiper.el.closest(".section-custom");
            let swiper_el_container = swiper_el_section.querySelector(".container");
            let size_window = window.innerWidth;
            if(swiper_el_section && swiper_el_container){
                let swiper_wrapper = swiper.el.querySelector(".swiper-wrapper");
                let container_width = Math.round(swiper_el_container.getBoundingClientRect().width);
                let swiper_width = Math.round(swiper_wrapper.getBoundingClientRect().width);
                let px_swiper_container = ((size_window - container_width) / 2);
                let offset_x = Math.round((size_window - swiper_width) / 2);
                if(offset_x <= 0){offset_x = 0;
                    style_fix_offset_x.innerHTML = `:root{--px-slide: ${px_swiper_container}px;}`;
                }else{style_fix_offset_x.innerHTML = `:root{--px-slide: ${offset_x}px;}`;} swiper.update();
            }
        }
        new Swiper('.swiper-class', 
        {
            speed: 400,  observer: true, spaceBetween: 0, 
            observeParents: true, slidesPerView: "auto",
            on: {
                init: (swiper) => {
                    swiper.el.appendChild(style_fix_offset_x);
                    dynamic_spacer_swiper(swiper);
                    window.addEventListener("resize", function(){dynamic_spacer_swiper(swiper);})
                }
            }
        });
    }
    
    */


    // Advance Radio
    // require args for html
    // * type
    // * group similar name (for example: name="radio")
    // * group different id

    // example html 
    /*
    <fieldset class="group-radio">
        <input type="radio" name="radio" id="1" checked>
        <input type="radio" name="radio" id="2">
        <input type="radio" name="radio" id="3">
    </fieldset>
    */
    /*
    let group_radio = document.querySelectorAll(".group-radio");
    if(group_radio.length > 0){
        init_radio(group_radio);
    }
    
    function init_radio(node_find_input)
    {
        let node = node_find_input;
        for(let j = 0; j < node.length; j++){
            let check_radio = node[j].querySelectorAll("input[type='radio']");
            if(check_radio.length > 0) logic_radio(check_radio);
        }
    }
    function logic_radio(array_radio){
        var target = undefined;
        function logic_checked(
        bool_target, input_node, groupe
        ){
            target = bool_target;
            input_node.checked = target;
            groupe = target;
        }
        function check_action(element, index){
            let target_input = element;
            let target_available = target_input.checked;
            if(target === true && marker_group[index] === true){
                logic_checked(
                    false, target_input, marker_group[index]
                );
            }else{
                logic_checked(
                    target_available, target_input, marker_group[index]
                );
            }
        }
        let marker_group = [];
        array_radio.forEach(function(item, idx){

            item.addEventListener("click", function(event){
                check_action(this, idx);
            })
            // if radio checked is --> true
            item.addEventListener("click", function(event){
                check_action(this, idx);
            }, {once:true})
            // if radio checked is --> true
            marker_group
            .push(item.checked);
            
            item.addEventListener("change", 
            (event) => {
                event.stopPropagation();
                event.preventDefault();
                for(
                    let i = 0; i < array_radio.length; i++
                ){
                    if(i == idx){
                        marker_group[i] = true;
                    }else{
                        marker_group[i] = false;
                    }
                }
            })
        })
    }*/


});
