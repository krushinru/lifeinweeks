const dobInput = document.getElementById('dobInput');
const submitButton = document.getElementById('submitButton');
const grid = document.getElementById('grid');
const resetLink = document.getElementById('resetLink');
const header = document.getElementById('header');

        function createGrid(weeksLived) {
            grid.innerHTML = '';
            for (let i = 0; i < 52 * 90; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (i < weeksLived) {
                    cell.classList.add('lived');
                }
                grid.appendChild(cell);
            }
            grid.style.display = 'grid';
        }

        function calculateWeeksLived(dob) {
            const now = new Date();
            const birthDate = new Date(dob);
            const diffInMs = now - birthDate;
            const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
            return diffInWeeks;
        }

        function initialize() {
            const storedDob = localStorage.getItem('dob');
            if (storedDob) {
                const weeksLived = calculateWeeksLived(storedDob);
                createGrid(weeksLived);
                submitButton.style.display = 'none';
                dobInput.style.display = 'none';
                resetLink.style.display = 'block';
                header.style.display = 'none';
            }
        }

        submitButton.addEventListener('click', () => {
            const dob = dobInput.value;
            if (dob) {
                localStorage.setItem('dob', dob);
                const weeksLived = calculateWeeksLived(dob);
                createGrid(weeksLived);
                submitButton.style.display = 'none';
                dobInput.style.display = 'none';
                resetLink.style.display = 'block';
                header.style.display = 'none';
            }
        });

        resetLink.addEventListener('click', () => {
            localStorage.removeItem('dob');
            grid.style.display = 'none';
            submitButton.style.display = 'block';
            dobInput.style.display = 'block';
            resetLink.style.display = 'none';
            header.style.display = 'block';
        });

initialize();