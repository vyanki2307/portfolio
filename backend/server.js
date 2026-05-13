const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const app      = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://vyankateshc94_db_user:mypass123@cluster0.bib5kwa.mongodb.net/portfolio?appName=Cluster0';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB error:', err));

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  githubLink:  { type: String },
  techStack:   { type: String },
  liveLink:    { type: String },
  createdAt:   { type: Date, default: Date.now }
});


const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, githubLink, techStack } = req.body;
    const project = new Project({ title, description, githubLink, techStack });
    await project.save();
    res.status(201).json({ message: 'Project saved!', project });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});