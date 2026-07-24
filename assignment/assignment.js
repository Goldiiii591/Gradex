document.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('#tabs .tab');
  const cards = document.querySelectorAll('#assignment-grid .assignment-card[data-status]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const newBtn = document.getElementById('btn-new-assignment');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      alert('Open new assignment form here');
    });
  }

  const emptyCard = document.getElementById('create-assignment');
  if (emptyCard) {
    emptyCard.addEventListener('click', () => {
      newBtn.click();
    });
  }

});