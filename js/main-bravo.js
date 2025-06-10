var $ = jQuery.noConflict();

$(document).ready(function () {
    $('.header__burger').click(function () {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    tippy('.popover', {
        allowHTML: true,
        maxWidth: 600
    });
    let currentSelectValue
    // const element = document.querySelectorAll('.select-default');
    // element.forEach(item => {
    //     const example = new Choices(item, {}); 
    // })
    $('.select-default').select2();
    let drops = document.querySelectorAll('.dropdown')
    drops.forEach(item => {
        var dropdown = new dropdownInit(item, {})
    })    
});  