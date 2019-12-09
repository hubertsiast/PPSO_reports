var pathname = window.location.pathname;
if(pathname == '/') 
	pathname = "index.html";

console.log(pathname);
$('.duik-sidebar__nav > li > a[href="'+pathname+'"]').addClass('active');