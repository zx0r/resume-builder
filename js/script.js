// Simple Resume Builder JavaScript

// Global variables to keep track of dynamic sections
let experienceCount = 1;
let educationCount = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Make sure we're starting with at least one experience and education entry
    updateExperience(0);
    updateEducation(0);
});

// Update basic resume fields
function updateResume(field, value) {
    const element = document.getElementById(`preview-${field}`);
    if (element) {
        if (field === 'skills') {
            // Format skills as badges for Modern template or as a list for others
            const template = document.getElementById('resume-preview').className;
            
            if (template === 'modern-template') {
                const skills = value.split(',').filter(skill => skill.trim() !== '');
                if (skills.length > 0) {
                    element.innerHTML = skills.map(skill => 
                        `<span class="skill">${skill.trim()}</span>`
                    ).join('');
                } else {
                    element.textContent = "Your skills will appear here.";
                }
            } else {
                element.textContent = value || "Your skills will appear here.";
            }
        } else {
            element.textContent = value || element.dataset.placeholder || '';
        }
    }
}

// Add a new experience field
function addExperienceField() {
    const container = document.getElementById('experience-container');
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-entry';
    newExperience.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="job-position" oninput="updateExperience(${experienceCount})" placeholder="Position Title">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="job-company" oninput="updateExperience(${experienceCount})" placeholder="Company Name">
        </div>
        <div class="form-group form-row">
            <div class="form-group half">
                <label>Start Date</label>
                <input type="text" class="job-start-date" oninput="updateExperience(${experienceCount})" placeholder="MM/YYYY">
            </div>
            <div class="form-group half">
                <label>End Date</label>
                <input type="text" class="job-end-date" oninput="updateExperience(${experienceCount})" placeholder="MM/YYYY or Present">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="job-description" oninput="updateExperience(${experienceCount})" rows="3" placeholder="Describe your responsibilities and achievements"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newExperience);
    experienceCount++;
}

// Remove an experience field
function removeExperience(button) {
    const entry = button.parentNode;
    entry.parentNode.removeChild(entry);
    updateAllExperiences();
}

// Update all experience entries in preview
function updateAllExperiences() {
    const preview = document.getElementById('preview-experience');
    preview.innerHTML = ''; // Clear existing preview
    
    const experiences = document.querySelectorAll('.experience-entry');
    if (experiences.length === 0) {
        preview.innerHTML = '<p class="no-data">Your work experience will appear here.</p>';
        return;
    }
    
    experiences.forEach((entry, index) => {
        updateExperience(index);
    });
}

// Update a specific experience entry in preview
function updateExperience(index) {
    const entries = document.querySelectorAll('.experience-entry');
    if (index >= entries.length) return;
    
    const entry = entries[index];
    const position = entry.querySelector('.job-position').value;
    const company = entry.querySelector('.job-company').value;
    const startDate = entry.querySelector('.job-start-date').value;
    const endDate = entry.querySelector('.job-end-date').value;
    const description = entry.querySelector('.job-description').value;
    
    let previewExperience = document.getElementById('preview-experience');
    
    // Clear placeholder if this is the first entry
    if (index === 0 && previewExperience.querySelector('.no-data')) {
        previewExperience.innerHTML = '';
    }
    
    // Find or create the experience item
    let expItem = document.getElementById(`exp-item-${index}`);
    if (!expItem) {
        expItem = document.createElement('div');
        expItem.id = `exp-item-${index}`;
        expItem.className = 'experience-item';
        previewExperience.appendChild(expItem);
    }
    
    // Update content
    if (position || company || startDate || endDate || description) {
        let dateRange = '';
        if (startDate || endDate) {
            dateRange = `${startDate || 'Start Date'} - ${endDate || 'End Date'}`;
        }
        
        expItem.innerHTML = `
            <div class="experience-title">${position || 'Position Title'}</div>
            <div class="experience-company">${company || 'Company Name'}</div>
            <div class="experience-date">${dateRange}</div>
            <div class="experience-description">${description || 'Job description'}</div>
        `;
    } else {
        // If all fields are empty, show placeholder
        expItem.innerHTML = '<p class="no-data">Fill in your experience details.</p>';
    }
}

// Add a new education field
function addEducationField() {
    const container = document.getElementById('education-container');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    newEducation.innerHTML = `
        <div class="form-group">
            <label>Degree</label>
            <input type="text" class="education-degree" oninput="updateEducation(${educationCount})" placeholder="Degree / Certificate">
        </div>
        <div class="form-group">
            <label>Institution</label>
            <input type="text" class="education-institution" oninput="updateEducation(${educationCount})" placeholder="University / School">
        </div>
        <div class="form-group form-row">
            <div class="form-group half">
                <label>Start Year</label>
                <input type="text" class="education-start" oninput="updateEducation(${educationCount})" placeholder="YYYY">
            </div>
            <div class="form-group half">
                <label>End Year</label>
                <input type="text" class="education-end" oninput="updateEducation(${educationCount})" placeholder="YYYY or Present">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">Remove</button>
    `;
    container.appendChild(newEducation);
    educationCount++;
}

// Remove an education field
function removeEducation(button) {
    const entry = button.parentNode;
    entry.parentNode.removeChild(entry);
    updateAllEducation();
}

// Update all education entries in preview
function updateAllEducation() {
    const preview = document.getElementById('preview-education');
    preview.innerHTML = ''; // Clear existing preview
    
    const educations = document.querySelectorAll('.education-entry');
    if (educations.length === 0) {
        preview.innerHTML = '<p class="no-data">Your education will appear here.</p>';
        return;
    }
    
    educations.forEach((entry, index) => {
        updateEducation(index);
    });
}

// Update a specific education entry in preview
function updateEducation(index) {
    const entries = document.querySelectorAll('.education-entry');
    if (index >= entries.length) return;
    
    const entry = entries[index];
    const degree = entry.querySelector('.education-degree').value;
    const institution = entry.querySelector('.education-institution').value;
    const startYear = entry.querySelector('.education-start').value;
    const endYear = entry.querySelector('.education-end').value;
    
    let previewEducation = document.getElementById('preview-education');
    
    // Clear placeholder if this is the first entry
    if (index === 0 && previewEducation.querySelector('.no-data')) {
        previewEducation.innerHTML = '';
    }
    
    // Find or create the education item
    let eduItem = document.getElementById(`edu-item-${index}`);
    if (!eduItem) {
        eduItem = document.createElement('div');
        eduItem.id = `edu-item-${index}`;
        eduItem.className = 'education-item';
        previewEducation.appendChild(eduItem);
    }
    
    // Update content
    if (degree || institution || startYear || endYear) {
        let yearRange = '';
        if (startYear || endYear) {
            yearRange = `${startYear || 'Start Year'} - ${endYear || 'End Year'}`;
        }
        
        eduItem.innerHTML = `
            <div class="education-degree">${degree || 'Degree / Certificate'}</div>
            <div class="education-institution">${institution || 'University / School'}</div>
            <div class="education-date">${yearRange}</div>
        `;
    } else {
        // If all fields are empty, show placeholder
        eduItem.innerHTML = '<p class="no-data">Fill in your education details.</p>';
    }
}

// Change resume template
function changeTemplate() {
    const selector = document.getElementById('template-selector');
    const template = selector.value;
    const resumePreview = document.getElementById('resume-preview');
    
    // Remove all template classes
    resumePreview.className = '';
    
    // Add selected template class
    resumePreview.classList.add(`${template}-template`);
    
    // Re-render skills as they might have special formatting
    const skills = document.getElementById('skills').value;
    updateResume('skills', skills);
}
