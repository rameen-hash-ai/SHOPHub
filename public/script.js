// Toggles the nav menu open/closed on mobile
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Tab switching on product detail page
function switchTab(btn, tabId) {
    // Remove active from all tabs and content
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Activate clicked tab
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Search handler (Week 2 will make this dynamic)
function handleSearch() {
    const query = document.getElementById('searchInput')?.value;
    if (query) {
        window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
}