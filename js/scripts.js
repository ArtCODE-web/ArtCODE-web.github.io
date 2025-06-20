function CountBox(node) {
    
    function shareButton(){
        const shareData = {
            title: "12 РОКІВ ОБМАНУ: ЛІКАРІ НАЖИВАЛИСЯ НА “ПУСТИШКАХ” ЗАМІСТЬ РЕАЛЬНОГО ЛІКУВАННЯ ВАРИКОЗУ!",
            text: "МАЄТЕ ВАРИКОЗ? НИЖЧЕ — ПОРАДИ ДОСВІДЧЕНОГО ЛІКАРЯ, ЯК ПОЗБУТИСЯ ЙОГО АБСОЛЮТНО БЕЗКОШТОВНО!",
            url: window.location.href
        };
        const btn = document.querySelector("#share-btn");
        if(btn){
            btn.addEventListener("click", async (ev) => {
                ev.preventDefault();
                try {
                    await navigator.share(shareData);
                } catch (error) { console.log(error); }
            })
        }
    }
    shareButton();

    function saleForm(saleValue){
        var form = document.querySelector(".form");
        if(form){
            var saleInput = form.querySelector('[name="saleSet"]');
            if(saleInput) { saleInput.setAttribute("value", `${saleValue}%`); }
        }
    }

    var inputSale = document.querySelectorAll('[name="sale"]');
    if(inputSale.length > 0){
        const sales = [100, 75, 50, 25];
        inputSale.forEach(function(item, idx){
            let index = localStorage.getItem('index');
            var randomSaleIndex = localStorage.getItem('randomSaleIndex');
            if(index === null || randomSaleIndex === null) {
                item.addEventListener("change", (ev) => {
                    ev.preventDefault();
                    var randomSaleIndex = Math.floor(Math.random() * inputSale.length);
                    var randomSale = sales[randomSaleIndex];
                    item.classList.add("active");
                    localStorage.setItem('index', idx);
                    localStorage.setItem('randomSaleIndex', randomSaleIndex);
                    saleForm(randomSale);
                    item.parentNode.setAttribute("data-prc-sale", randomSale);
                    let disabledSales = document.querySelectorAll('[name="sale"]:not(:checked)');
                    disabledSales.forEach(function(item, idx){item.setAttribute("disabled", true); })
                })
            } else {
                saleForm(sales[randomSaleIndex]);
                inputSale[index].parentNode.setAttribute("data-prc-sale", sales[randomSaleIndex]);
                inputSale[index].classList.add("active");
                let disabledSales2 = document.querySelectorAll('[name="sale"]:not(.active)');
                disabledSales2.forEach(function(item, idx){item.setAttribute("disabled", true); })
            }
        })
    }
    function calculateDate(d) {
        return [
            {nmb: Math.floor(d / (1000 * 60 * 60 * 24)), txt: "Днів"},
            {nmb: Math.floor((d % (1000 * 60 * 60 * 24)) 
            / (1000 * 60 * 60)), txt: "Годин"},
            {nmb: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)), txt: "Хвилин"},
            {nmb: Math.floor((d % (1000 * 60)) / 1000), txt: "Секунд"}
        ]
    }
    
    function getNeverEndingDate() {
        let tom = new Date(); 
        tom.setDate(tom.getDate() + 1); return tom.setHours(0, 0, 0, 0);
    }

    var countDownDate = getNeverEndingDate();
    setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var objGenerateDate = calculateDate(distance);
        document.getElementById(node).innerHTML = `
            ${objGenerateDate.map((item, idx) => {
                let nmb = item.nmb; let txt = item.txt;
                if(nmb <= 9) { nmb = "0" + nmb; }
                return `<div class="countdown-item">
                    <p class="countdown-item-nmb">${nmb}</p> 
                    <p class="countdown-item-txt">${txt}</p>
                </div>`
            }).join("") }`
        if (distance < 0) { countDownDate = getNeverEndingDate(); }

    }, 100);
}

window.onload = function(){

    
    var mask_input = document.querySelectorAll("[data-mask]");
    if(mask_input.length > 0){
        mask_input.forEach(function(item, idx){
            var mask_attribute = item.dataset.mask;
            var maskOptions = {mask: mask_attribute, lazy: false} 
            var mask = new IMask(item, maskOptions);
        })
    }

    moment.locale('uk');
    var now = moment().format("DD MMMM YYYY");
    let targetDate = document.getElementById("targetDate");
    if(targetDate) { targetDate.textContent = now; } CountBox("countbox");
    $('.scroll_to').on('click', function(event) {
        event.preventDefault();
        var target = $($(this).attr('href'));
        if(target.length) {
            $('html, body').animate({scrollTop: target.offset().top - 200}, 500);
        }
    });
}