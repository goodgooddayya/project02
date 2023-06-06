// Get the sidebar and its top offset
var sidebar = document.querySelector('.sidebar');
var sidebarTop = sidebar.offsetTop;

// Add an event listener to the window's scroll event
window.addEventListener('scroll', function() {
    // If the user has scrolled past the sidebar's original position
    if (window.pageYOffset > sidebarTop) {
        // Add a "fixed" class to the sidebar
        sidebar.classList.add('fixed');
    } else {
        // Remove the "fixed" class from the sidebar
        sidebar.classList.remove('fixed');
    }
});

// Get all the links in the sidebar
var sidebarLinks = sidebar.querySelectorAll('a');

// Add an event listener to each link
sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Remove the "active" class from all links
        sidebarLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        // Add the "active" class to the clicked link
        this.classList.add('active');
    });
});
