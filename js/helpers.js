window.slideUp = (target, duration=500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
          target.style.display = 'none';
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          //alert("!");
    }, duration);
}

/* SLIDE DOWN */
window.slideDown = (target, duration=500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
}

/* TOOGLE */
window.slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
}

// clicker ======================
/*
let Widget_filter = toggleClicker(
    "[data-widget-open]", // Кликабельный элемент
    "active", // Название класса для active 
    "[data-widget]", // Родитель кликабельного элемента
    true, // Клик вне элемента true | false
    (element, event) => {

    }
);
*/
window.toggleClicker = (el_togglers, class_active, parent, outside_bool, fn, closed = true) => {
    var el_toggle = document.querySelectorAll(el_togglers);
    
    if(el_toggle.length > 0){
        
        for(let i = 0; i < el_toggle.length; i++){
            var target_el;
            
            el_toggle[i].addEventListener
            ("click", function(ev){
                
                ev.preventDefault();
                var parent_el = el_toggle[i].closest(parent);

                function template_code(elem2, elem3, fn){
                    target_el = elem2;
                    if(target_el === elem2 && elem2.classList.contains(class_active)){
                        target_el.classList.remove(class_active);
                    }else{
                        if(closed === true){
                            document.querySelectorAll(elem3).forEach(element => {
                                element.classList.remove(class_active); 
                            })
                        }
                        /*
                        document.querySelectorAll(elem3).forEach(element => {
                            element.classList.remove(class_active); 
                        })*/
                        target_el.classList.add(class_active);
                    }

                    if(fn) fn(target_el, ev);
                    
                }

                if(parent){
                    template_code(parent_el, parent, fn);
                }else{
                    template_code(el_toggle[i], el_togglers, fn);
                
                }

            })
        }
    }

    function bool_outside(){
        if(outside_bool === true){
            document.addEventListener('click', function(e) {
                const targer = e.target
                if(parent && !targer.closest(parent)){
                   let parents = document.querySelectorAll(parent);
                    for(item of parents) {
                        item.classList.remove(class_active);
                    }
                }else{
                    if(!targer.closest(el_togglers)){
                        let targets = document.querySelectorAll(el_togglers);
                        for(item of targets) {
                            item.classList.remove(class_active);
                        }
                    }
                }
                
            })
        }else{
            return false;
        }
        
    }
    bool_outside();
}

var $ = jQuery.noConflict();

$(document).ready(function () {
    function initPopup() {
        $(document).on('click', '.modal__content', function(e) {
            e.stopPropagation();
        });
        
        let data_modal = document.querySelectorAll("[data-modal]");
        
        if(data_modal.length > 0){
            for(let i = 0; i < data_modal.length; i++){
                var target;
                data_modal[i].addEventListener("click", (e) =>
                {
                    e.preventDefault();
                    if(target !== undefined){
                        target.classList.remove("modal--show");
                        $('body').removeClass('lock');
                    }
                    
                    target = document.querySelector(`.modal${data_modal[i].getAttribute("data-modal")}`);
                    target.classList.add("modal--show");
                    $('body').addClass('lock');
                })
            }
        }
    
        $(document).on('click', '[data-close-modal], .modal', function(e) {
            e.preventDefault();
            $('.modal').removeClass('modal--show');
            $('body').removeClass('lock');
        });
    }
    initPopup()


    
});
