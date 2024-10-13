// Function to add a new skill input field
document.getElementById('add-skill').addEventListener('click', function () {
    const skillsList = document.getElementById('skills-list');
    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    skillEntry.innerHTML = `
        <input type="text" class="skill-name" placeholder="Skill name" required>
        <input type="number" class="skill-rating" min="1" max="5" placeholder="Rating (1-5)" required>
        <button type="button" class="remove-skill">Remove</button>
    `;
    skillsList.appendChild(skillEntry);
});

// Function to remove a skill entry
document.getElementById('skills-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-skill')) {
        e.target.parentElement.remove();
    }
});

// Function to analyze the skills gap
document.getElementById('skills-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const careerGoal = document.getElementById('career-goal').value.trim();
    const skillElements = document.querySelectorAll('.skill-entry');
    let currentSkills = [];
    
    // Collect the current skills and their ratings
    skillElements.forEach(skillElement => {
        const skillName = skillElement.querySelector('.skill-name').value.trim();
        const skillRating = parseInt(skillElement.querySelector('.skill-rating').value);
        if (skillName) {
            currentSkills.push({ name: skillName, rating: skillRating });
        }
    });

    // Analyze and suggest skills based on the career goal
    let suggestions = suggestSkills(currentSkills, careerGoal);
    
    // Display the results
    displayResults(currentSkills, careerGoal, suggestions);
});

// Function to suggest skills based on career goal and current skills
function suggestSkills(currentSkills, careerGoal) {
    const essentialSkills = {
        "Senior Web Developer": ["JavaScript", "React", "Node.js", "CSS", "HTML", "TypeScript", "Git", "APIs", "Responsive Design", "Testing", "Database Management"],
        "Web Developer": ["JavaScript", "HTML", "CSS", "React", "Git", "APIs"],
        "Data Scientist": ["Python", "Machine Learning", "Data Analysis", "Pandas", "NumPy", "R"],
        "Mobile App Developer": ["Java", "Kotlin", "Swift", "Flutter", "React Native", "Dart"],
        "UI/UX Designer": ["Adobe XD", "Sketch", "Figma", "Wireframing", "Prototyping", "User Research"]
    };

    let missingSkills = [];
    const targetSkills = essentialSkills[careerGoal] || [];

    // Find out which target skills are not in current skills or have low ratings
    targetSkills.forEach(skill => {
        const existingSkill = currentSkills.find(s => s.name.toLowerCase() === skill.toLowerCase());
        if (!existingSkill || existingSkill.rating < 3) {
            missingSkills.push(skill);
        }
    });

    return missingSkills;
}

// Function to display the results
function displayResults(currentSkills, careerGoal, suggestions) {
    const resultDiv = document.getElementById('analysis-result');
    resultDiv.style.display = 'block';

    let html = `<h3>Career Goal: ${careerGoal}</h3>`;
    html += `<h4>Your Current Skills:</h4><ul>`;
    currentSkills.forEach(skill => {
        html += `<li>${skill.name} (Rating: ${skill.rating}/5)</li>`;
    });
    html += `</ul>`;
    
    if (suggestions.length > 0) {
        html += `<h4>Suggested Skills to Learn or Improve:</h4><ul>`;
        suggestions.forEach(skill => {
            html += `<li>${skill}</li>`;
        });
        html += `</ul>`;
    } else {
        html += `<p>You're well-prepared for your career goal! Keep refining your skills.</p>`;
    }

    resultDiv.innerHTML = html;
}
