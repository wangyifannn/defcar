 jQuery(function($) {
     console.log(".sidebar-dropdown > a");
     $(".sidebar-dropdown > a").click(function() {
         console.log(this);
         $(".sidebar-submenu").slideUp(250);
         if ($(this).parent().hasClass("active")) {
             $(".sidebar-dropdown").removeClass("active");
             $(this).parent().removeClass("active");
         } else {
             $(".sidebar-dropdown").removeClass("active");
             $(this).next(".sidebar-submenu").slideDown(250);
             $(this).parent().addClass("active");
         }

     });

     $("#toggle-sidebar").click(function() {
         $(".page-wrapper").toggleClass("toggled");
     });

     if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
         $(".sidebar-content").mCustomScrollbar({
             axis: "y",
             autoHideScrollbar: true,
             scrollInertia: 300
         });
         $(".sidebar-content").addClass("desktop");

     }
 });