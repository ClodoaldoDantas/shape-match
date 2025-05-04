import "./style.css";

const shapes = document.querySelectorAll(".shape");
const dropzones = document.querySelectorAll(".dropzone");

shapes.forEach((shape) => {
  shape.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", shape.id);
  });
});

dropzones.forEach((dropzone) => {
  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();

    const shapeId = event.dataTransfer.getData("text/plain");
    const expectedShape = dropzone.dataset.shape;

    if (shapeId === expectedShape) {
      document.getElementById(shapeId).classList.add("hidden");

      dropzone.classList.add("dropped");
      dropzone.style.backgroundColor = `var(--shape-${expectedShape})`;
    }
  });
});
