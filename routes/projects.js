const projectController = require("../controllers/projectsController");
const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

// Add a new product
router.post("/", projectController.addProject);
router.get("/", projectController.getProjects);
router.put("/:ProjectID", projectController.updateProject);
router.delete("/:ProjectID", projectController.deleteProject);
module.exports = router;
