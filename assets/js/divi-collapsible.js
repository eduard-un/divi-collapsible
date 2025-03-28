/**
 * Divi Collapsible Mobile Menu Script
 *
 * @package DiviCollapsible
 */

(function ($) {
    'use strict';

    $(document).ready(function () {
        // Wrap everything in a timeout to ensure elements are fully loaded
        setTimeout(function () {
            // Add animation speed to CSS
            $('<style>').text(
                "ul.et_mobile_menu .menu-item-has-children .sub-menu," +
                ".et-db #et-boc .et-l ul.et_mobile_menu .menu-item-has-children .sub-menu {" +
                "    transition: all 300ms ease-in-out;" +
                "}"
            ).appendTo('head');

            // Add toggle buttons to menu items with children
            $("body ul.et_mobile_menu li.menu-item-has-children, body ul.et_mobile_menu li.page_item_has_children").append(
                '<span class="mobile-toggle no-smooth-scroll" aria-label="toggle sub menu" tabindex="0" role="button">' +
                '<svg class="dt-icons dt-open-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>' +
                '<svg class="dt-icons dt-close-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" aria-hidden="true" focusable="false"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>' +
                '<span class="screen-reader-text">Toggle submenu</span>' +
                '</span>'
            );

            // Set initial ARIA states
            $(".mobile-toggle").attr({
                'aria-expanded': 'false',
                'aria-haspopup': 'true'
            });

            // Toggle sub-menu visibility when clicking the toggle button
            $("ul.et_mobile_menu li.menu-item-has-children .mobile-toggle, ul.et_mobile_menu li.page_item_has_children .mobile-toggle").on('click keypress', function (event) {
                // Only proceed for click or Enter/Space key
                if (event.type === 'click' || event.which === 13 || event.which === 32) {
                    event.preventDefault();
                    event.stopPropagation();

                    const $parent = $(this).parent("li");
                    const $subMenu = $parent.find("ul.children, ul.sub-menu").first();
                    const openClass = 'dt-open';
                    const visibleClass = 'visible';

                    // Toggle classes
                    $parent.toggleClass(openClass);
                    $subMenu.toggleClass(visibleClass);

                    // Update ARIA attributes
                    const isExpanded = $parent.hasClass(openClass);
                    $(this).attr('aria-expanded', isExpanded);

                    // Add animation for smoother transition
                    if (isExpanded) {
                        const subMenuHeight = $subMenu.prop('scrollHeight');
                        $subMenu.css('max-height', subMenuHeight + 'px');
                    } else {
                        $subMenu.css('max-height', '0');
                    }
                }
            });

            // Add hover effects
            $(".mobile-toggle")
                .on("mouseover focus", function () {
                    $(this).parent().addClass("is-hover");
                })
                .on("mouseout blur", function () {
                    $(this).parent().removeClass("is-hover");
                });

            // Close mobile menu when clicking outside
            $(document).on('click touchstart', function (e) {
                if (!$(e.target).closest('.et_mobile_menu, .mobile-menu-toggle, #et_mobile_nav_menu').length) {
                    const openClass = 'dt-open';
                    const visibleClass = 'visible';

                    $('.et_mobile_menu li.' + openClass).removeClass(openClass);
                    $('.et_mobile_menu .' + visibleClass).removeClass(visibleClass).css('max-height', '');
                    $('.mobile-toggle').attr('aria-expanded', 'false');
                }
            });

            // Add screen reader text styles
            $('<style>').text(
                ".screen-reader-text {" +
                "    border: 0;" +
                "    clip: rect(1px, 1px, 1px, 1px);" +
                "    clip-path: inset(50%);" +
                "    height: 1px;" +
                "    margin: -1px;" +
                "    overflow: hidden;" +
                "    padding: 0;" +
                "    position: absolute;" +
                "    width: 1px;" +
                "    word-wrap: normal !important;" +
                "}"
            ).appendTo('head');
        }, 300); // 300ms timeout to ensure elements are ready
    });

})(jQuery);
