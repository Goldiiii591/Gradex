document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const table = document.querySelector('.student-table');
    const rows = table.querySelectorAll('tbody tr');
    const badge = document.querySelector('.badge-purple');
    // Live search filter
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        let visibleCount = 0;
        rows.forEach(row => {
            const name = row.querySelector('.student-cell span').textContent.toLowerCase();
            const roll = row.children[1].textContent.toLowerCase();
            const matches = name.includes(query) || roll.includes(query);

            row.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });
        badge.textContent = `${visibleCount} student${visibleCount !== 1 ? 's' : ''}`;
    });
    // Section filter dropdown
    const sectionSelect = document.querySelector('.range-select');
    sectionSelect.addEventListener('change', function() {
        const selected = this.value; // "Class X - A" or "Class X - B"
        const sectionCode = selected.includes('- A') ? 'X - A' : 'X - B';
        let visibleCount = 0;

        rows.forEach(row => {
            const section = row.children[2].textContent.trim();
            const matches = section === sectionCode;

            row.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });
        badge.textContent = `${visibleCount} student${visibleCount !== 1 ? 's' : ''}`;
        searchInput.value = ''; 
    });
    // Click a row to see quick details
    rows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            const name = this.querySelector('.student-cell span').textContent;
            const avg = this.querySelector('td:nth-child(4)').textContent;
            const completion = this.querySelector('td:nth-child(5)').textContent;
            const status = this.querySelector('.status').textContent;

            alert(`${name}\nAverage: ${avg}\nCompletion: ${completion}\nStatus: ${status}`);
        });
    });

});