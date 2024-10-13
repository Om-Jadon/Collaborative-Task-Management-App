import express from "express";
import Project from "../models/Projects.js";
import User from "../models/User.js";
import Task from "../models/Tasks.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define a route to create a new project
router.post("/", authMiddleware, async (req, res) => {
  const { projectName, description, members } = req.body;

  if (!projectName) {
    return res.status(400).json({ msg: "Project name is required" });
  }

  const memberIds = new Set();
  try {
    if (members && members.length > 0) {
      // Iterate through the members and find their IDs
      for (const memberUsernameOrEmail of members) {
        const member = await User.findOne({
          $or: [
            { username: memberUsernameOrEmail },
            { email: memberUsernameOrEmail },
          ],
        });

        // If the member exists, push their ID to the array
        if (member) {
          memberIds.push(member._id);
        } else {
          return res
            .status(404)
            .json({ msg: `User ${memberUsernameOrEmail} not found` });
        }
      }
    }

    // Assign the member IDs to the project
    const newProject = new Project({
      projectName,
      description,
      creator: req.user.id,
      members: Array.from(memberIds),
    });

    await newProject.save();

    res.status(201).json({ project: newProject });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to get all projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    })
      .populate("members", "username email")
      .populate("creator", "username email")
      .exec();

    res.json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to get a project by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    })
      .populate("members", "username email")
      .populate("creator", "username email")
      .exec();

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to update a project by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const { projectName, description, members } = req.body; // members can be an array of usernames or emails

  if (!projectName) {
    return res.status(400).json({ msg: "Project name is required" });
  }

  try {
    // Find the project that the creator wants to update
    const project = await Project.findOne({
      _id: req.params.id,
      creator: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.projectName = projectName;
    project.description = description;
    project.updatedAt = Date.now();

    if (members && members.length > 0) {
      const memberIds = new Set();
      // Iterate through the members and find their IDs
      for (const memberUsernameOrEmail of members) {
        const member = await User.findOne({
          $or: [
            { username: memberUsernameOrEmail },
            { email: memberUsernameOrEmail },
          ],
        });

        // If the member exists, push their ID to the array
        if (member) {
          memberIds.push(member._id);
        } else {
          return res
            .status(404)
            .json({ msg: `User ${memberUsernameOrEmail} not found` });
        }
      }

      // Assign the member IDs to the project
      project.members = Array.from(memberIds);
    }

    // Save the updated project
    await project.save();

    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to delete a project by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      creator: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    await Project.deleteOne({ _id: req.params.id });

    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to add a task to a project
router.post("/:projectId/tasks", authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ msg: "Title and due date are required" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      project: req.params.projectId,
      creator: req.user.id,
    });

    await newTask.save();

    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to get all tasks for a project
router.get("/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const tasks = await Task.find({ project: req.params.projectId }).exec();

    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to get a task by ID
router.get("/:projectId/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const task = await Task.findOne({
      _id: req.params.taskId,
      project: req.params.projectId,
    }).exec();

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to update a task by ID
router.put("/:projectId/tasks/:taskId", authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ msg: "Title and due date are required" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const task = await Task.findOne({
      _id: req.params.taskId,
      project: req.params.projectId,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;
    task.updatedAt = Date.now();

    await task.save();

    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Define a route to delete a task by ID
router.delete("/:projectId/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      $or: [{ creator: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const task = await Task.findOne({
      _id: req.params.taskId,
      project: req.params.projectId,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await Task.deleteOne({ _id: req.params.taskId });

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
