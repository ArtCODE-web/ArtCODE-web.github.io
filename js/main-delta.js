
var $ = jQuery.noConflict();

const ACTIVE_TAB_CLASSNAME = "active-tab";

function updateActiveClass($el, activeClassName) {
    if($el.attr("href")){
        $el.addClass(activeClassName);
        let parent = $el.parent();
        let siblings = parent.siblings();
        let siblings_tabs = siblings.find("> *");
        siblings_tabs.removeClass(activeClassName);
    }else{
        $el.addClass(activeClassName)
        .siblings().removeClass(activeClassName);
    }
}

$(document).ready(function () {
    const hash = window.location.hash;
    if (hash) {
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);
        const href = hash.split("#")[1]
        const headerHeight = rs.getPropertyValue('--header-height').split("px")[0]
        
        const $tabs = $(".tabs");
       
        const $targetTab = $tabs.find(`[data-id="${href}"]`);
        const $targetTabLink = $tabs.find(`[data-tab-link][href="#${href}"]`);
        const $targetOptionalTabItem = $tabs.find(`[data-option-id="${href}"]`);

        if ($targetTab.length && $targetTabLink.length) {
            $targetOptionalTabItem.removeClass(ACTIVE_TAB_CLASSNAME)
            updateActiveClass($targetTab, ACTIVE_TAB_CLASSNAME)
            updateActiveClass($targetTabLink, ACTIVE_TAB_CLASSNAME)
            updateActiveClass($targetOptionalTabItem, ACTIVE_TAB_CLASSNAME)

            $("html,body").animate({ scrollTop: $targetTab.offset().top - headerHeight })
        }
    }

    $("[data-tab-link]").on("click", function (e) {
        e.preventDefault();
        const $link = $(this);

        const $tabs = $link.closest(".tabs");
        const href = $link.attr("href").split("#")[1];

        const $targetTab = $tabs.find(`[data-id="${href}"]`);
        const $targetOptionalTabItem = $tabs.find(`[data-option-id="${href}"]`);
        const $optionalItems = $tabs.find("[data-option-id]")

        $optionalItems.removeClass(ACTIVE_TAB_CLASSNAME)
        updateActiveClass($link, ACTIVE_TAB_CLASSNAME)

        updateActiveClass($targetTab, ACTIVE_TAB_CLASSNAME)
        updateActiveClass($targetOptionalTabItem, ACTIVE_TAB_CLASSNAME)

    });

});

