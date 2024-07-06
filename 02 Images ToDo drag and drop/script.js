document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const inputSection = document.getElementById("inputSection");
  const descriptionInput = document.getElementById("descriptionInput");
  const addImageButton = document.getElementById("addImageButton");
  const MAX_IMAGES = 5;
  let selectedFile = null;

  function updateFileList() {
    const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
    fileList.innerHTML = '';

    storedImagesData.forEach((data, index) => {
      const div = document.createElement("div");
      div.className = "file-item";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      const desc = document.createElement("p");
      desc.textContent = data.description;
      div.appendChild(desc);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        storedImagesData.splice(index, 1);
        localStorage.setItem("storedImagesData", JSON.stringify(storedImagesData));
        updateFileList();
      };
      div.appendChild(deleteButton);

      fileList.appendChild(div);
    });

    if (storedImagesData.length < MAX_IMAGES) {
      dropzone.style.display = "block";
    } else {
      dropzone.style.display = "none";
    }
  }

  function handleFileSelect(file) {
    selectedFile = file;
    inputSection.style.display = "block";
  }

  dropzone.addEventListener("click", function () {
    fileInput.click();
  });

  dropzone.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileSelect(event.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
      handleFileSelect(event.target.files[0]);
    }
  });

  addImageButton.addEventListener("click", function () {
    if (selectedFile && descriptionInput.value.trim() !== '') {
      const reader = new FileReader();

      reader.onload = function (e) {
        const storedImagesData = JSON.parse(localStorage.getItem("storedImagesData") || "[]");
        storedImagesData.push({ src: e.target.result, description: descriptionInput.value });
        localStorage.setItem("storedImagesData", JSON.stringify(storedImagesData));
        alert('Image added successfully!');
        updateFileList();
        descriptionInput.value = '';
        inputSection.style.display = "none";
        selectedFile = null;
      };

      reader.readAsDataURL(selectedFile);
    }
  });

  updateFileList();
});
