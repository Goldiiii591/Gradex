// ======= STUDENT DATA =======
const students = [
    {
        initials:   'AK',
        avClass:    'av1',
        name:       'Ananya Krishnan',
        subject:    'Photosynthesis Essay · Submitted 14 July',
        score:      84,
        submission: 'Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of glucose. Chlorophyll absorbs sunlight and converts CO₂ and water into glucose. Oxygen is released as a by-product. This process forms the basis of most food chains...',
        feedback:   'Good understanding of photosynthesis with clear explanation. Scientific terms like chlorophyll used correctly. Grammar is mostly correct. The conclusion could be stronger — consider adding the importance to the food chain.',
        scores:     { r1: 20, r2: 22, r3: 21, r4: 21 }
    },
    {
        initials:   'RV',
        avClass:    'av2',
        name:       'Rohan Verma',
        subject:    'Photosynthesis Essay · Submitted 14 July',
        score:      91,
        submission: 'Photosynthesis occurs in the chloroplasts of plant cells. The process has two stages — light reactions and the Calvin cycle. During light reactions, sunlight splits water molecules and produces ATP. The Calvin cycle uses ATP to convert CO₂ into glucose. This glucose is used by the plant for growth and energy...',
        feedback:   'Excellent essay with strong understanding of both stages of photosynthesis. Very good use of scientific terminology. Clear and well structured. Conclusion is strong and mentions real-world significance. Outstanding work.',
        scores:     { r1: 24, r2: 23, r3: 22, r4: 22 }
    },
    {
        initials:   'PS',
        avClass:    'av3',
        name:       'Priya Sharma',
        subject:    'Quiz 3 — Periodic Table · Submitted 15 July',
        score:      76,
        submission: 'The periodic table organises elements by atomic number. Elements in the same group have similar properties. Noble gases are in group 18 and are unreactive. Metals are on the left side and non-metals on the right. The transition metals are in the middle block of the periodic table...',
        feedback:   'Good basic understanding of the periodic table. Some key concepts like electron configuration and periodicity are missing. Try to include more specific examples from NCERT. Overall a decent attempt.',
        scores:     { r1: 18, r2: 20, r3: 19, r4: 19 }
    },
    {
        initials:   'DM',
        avClass:    'av4',
        name:       'Dev Mehta',
        subject:    'Quiz 3 — Periodic Table · Submitted 15 July',
        score:      88,
        submission: 'The modern periodic table has 118 elements arranged in 18 groups and 7 periods. Elements are arranged in order of increasing atomic number. Properties like atomic radius decrease across a period and increase down a group. Ionisation energy increases across a period. Metals tend to lose electrons while non-metals gain electrons...',
        feedback:   'Very good answer with accurate understanding of periodic trends. Good use of examples. Minor errors in explaining ionisation energy trend. Conclusion is clear and well written. Good effort overall.',
        scores:     { r1: 22, r2: 22, r3: 22, r4: 22 }
    }
];
// track which students are approved
const approvedList = [false, false, false, false];
// current student index
let currentIndex = 0;
// score values
let scores = { r1: 20, r2: 22, r3: 21, r4: 21 };
//SELECT STUDENT 
function selectStudent(index) {
    currentIndex = index;
    const s = students[index];
    // update panel
    document.getElementById('panel-av').textContent    = s.initials;
    document.getElementById('panel-av').className      = 'panel-av ' + s.avClass;
    document.getElementById('panel-name').textContent  = s.name;
    document.getElementById('panel-sub').textContent   = s.subject;
    document.getElementById('panel-score').textContent = s.score;
    document.getElementById('submission-text').textContent = s.submission;
    document.getElementById('feedback-text').value     = s.feedback;
    // update scores
    scores = { ...s.scores };
    document.getElementById('r1').textContent = scores.r1;
    document.getElementById('r2').textContent = scores.r2;
    document.getElementById('r3').textContent = scores.r3;
    document.getElementById('r4').textContent = scores.r4;
    updateTotal();
    // highlight active card
    document.querySelectorAll('.stud-card').forEach(function(card, i) {
        card.classList.remove('active');
        if (i === index) card.classList.add('active');
    });
    // show or hide approve button
    if (approvedList[index]) {
        document.getElementById('action-btns').style.display  = 'none';
        document.getElementById('approved-msg').style.display = 'block';
        document.getElementById('approved-msg').textContent   = '✅ Grade approved and feedback sent to ' + s.name + '!';
    } else {
        document.getElementById('action-btns').style.display  = 'flex';
        document.getElementById('approved-msg').style.display = 'none';
    }
}
//ADJUST SCORE
function adjustScore(id, delta) {
    scores[id] = Math.max(0, Math.min(25, scores[id] + delta));
    document.getElementById(id).textContent = scores[id];
    updateTotal();
}
// UPDATE TOTAL
function updateTotal() {
    const total = scores.r1 + scores.r2 + scores.r3 + scores.r4;
    document.getElementById('total-score').textContent = total + ' / 100';
    document.getElementById('panel-score').textContent = total;
}

//APPROVE GRADE
function approveGrade() {
    approvedList[currentIndex] = true;
    const s = students[currentIndex];
    // update student card badge
    const card = document.getElementById('card-' + currentIndex);
    card.classList.add('approved');
    card.querySelector('.status-badge').textContent  = 'Approved';
    card.querySelector('.status-badge').className    = 'status-badge approved';
    // show approved message
    document.getElementById('action-btns').style.display  = 'none';
    document.getElementById('approved-msg').style.display = 'block';
    document.getElementById('approved-msg').textContent   = '✅ Grade approved and feedback sent to ' + s.name + '!';
    // update counts
    const pendingCount  = approvedList.filter(function(a) { return !a; }).length;
    const approvedCount = approvedList.filter(function(a) { return a; }).length;
    document.getElementById('pending-count').textContent  = pendingCount;
    document.getElementById('approved-count').textContent = parseInt(document.getElementById('approved-count').textContent) + 1;
    // auto move to next pending student
    setTimeout(function() {
        const nextIndex = approvedList.findIndex(function(a, i) { return !a && i !== currentIndex; });
        if (nextIndex !== -1) selectStudent(nextIndex);
    }, 1500);
}

//SKIP 
function skipStudent() {
    const nextIndex = (currentIndex + 1) % students.length;
    selectStudent(nextIndex);
}

//APPROVE
document.getElementById('approve-all-btn').addEventListener('click', function() {
    const confirm = window.confirm('Approve all pending grades and send feedback to all students?');
    if (!confirm) return;
    students.forEach(function(s, i) {
        if (!approvedList[i]) {
            approvedList[i] = true;
            const card = document.getElementById('card-' + i);
            card.classList.add('approved');
            card.querySelector('.status-badge').textContent = 'Approved';
            card.querySelector('.status-badge').className   = 'status-badge approved';
        }
    });
    document.getElementById('pending-count').textContent  = '0';
    document.getElementById('action-btns').style.display  = 'none';
    document.getElementById('approved-msg').style.display = 'block';
    document.getElementById('approved-msg').textContent   = '✅ All grades approved and sent to students!';
});
// load first student on page open
selectStudent(0);