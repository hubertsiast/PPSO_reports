var pathname = window.location.pathname;
if(pathname == '/PPSO_reports/') 
	pathname = "/PPSO_reports/index.html";

console.log(pathname);
$('.duik-sidebar__nav > li > a[href="'+pathname+'"]').addClass('active');