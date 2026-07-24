document.addEventListener('DOMContentLoaded', () => {

    const newBtn = document.getElementById('btn-new-assignment');
    if (newBtn) {
        newBtn.addEventListener('click', () => {
            alert('Open new assignment form here');
        });
    }

});
