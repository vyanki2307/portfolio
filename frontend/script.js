
document.addEventListener('DOMContentLoaded', fetchProjects);


async function fetchProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = '<p class="loading-text">Loading projects...</p>';

  try {
    const response = await fetch('https://portfolio-ynf1.onrender.com');
    const projects = await response.json();

    if (projects.length === 0) {
      container.innerHTML = '<p class="loading-text">No projects yet. Add one below!</p>';
      return;
    }

    container.innerHTML = '';
    projects.forEach(project => {
      const techTags = project.techStack
        ? project.techStack.split(',').map(t => 
            `<span class="tech-tag">${t.trim()}</span>`
          ).join('')
        : '';

      container.innerHTML += `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-tags">${techTags}</div>
          <a href="${project.githubLink}" target="_blank">View on GitHub →</a>
        </div>
      `;
    });

  } catch (error) {
    container.innerHTML = '<p class="loading-text">Could not connect to server. Make sure node server.js is running.</p>';
    console.error('Fetch error:', error);
  }
}


async function addProject() {
  const title       = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const githubLink  = document.getElementById('githubLink').value.trim();
  const techStack   = document.getElementById('techStack').value.trim();
  const message     = document.getElementById('form-message');

  if (!title || !description) {
    message.style.color = '#ff6b6b';
    message.textContent = 'Title and description are required!';
    return;
  }

  try {
    const response = await fetch('https://portfolio-ynf1.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, githubLink, techStack })
    });

    const data = await response.json();

    message.style.color = '#00cc88';
    message.textContent = 'Project added successfully!';

       document.getElementById('title').value       = '';
    document.getElementById('description').value = '';
    document.getElementById('githubLink').value  = '';
    document.getElementById('techStack').value   = '';

    
    fetchProjects();

  } catch (error) {
    message.style.color = '#ff6b6b';
    message.textContent = 'Error adding project. Is the server running?';
    console.error('Add error:', error);
  }
}