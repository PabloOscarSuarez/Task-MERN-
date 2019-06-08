const router = require("express").Router();
const Task = require("../models/task");

//ultilizo async await es una forma mejorada de promesas
router.get("/", async (req, res) => {
  const task = await Task.find();
  res.json(task);
});
// mostrar un solo usuario
router.get("/:id", async (req, res) => {
  const OneTask = await Task.findById(req.params.id);
  res.json(OneTask);
});

//creo una nueva tarea
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  console.log(req.body);

  res.json("datos guardados correctamente");
});

//actualizo las tareas !!!
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json("recibido y modificado");
});

//eliminar una tarea
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json("tarea eliminada");
});

module.exports = router;
