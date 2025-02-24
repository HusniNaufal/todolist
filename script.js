document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector("button");
  const taskNameInput = document.querySelector("input[type='text']");
  const taskDescriptionInput = document.querySelector("textarea");
  const taskDeadlineInput = document.querySelector("input[type='datetime-local']");
  const taskList = document.querySelector(".list-tugas");

  // 🚀 Ambil tugas dari localStorage saat halaman dimuat
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task));

  // 👉 Fungsi untuk menyimpan tugas ke localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".tugas").forEach(taskElement => {
      const taskName = taskElement.querySelector("p:nth-child(1)").textContent.replace("Nama Tugas: ", "").trim();
      const taskDescription = taskElement.querySelector("p:nth-child(2)").textContent.replace("Deskripsi: ", "").trim();
      const taskDeadline = taskElement.querySelector("p:nth-child(3)").textContent.replace("Deadline: ", "").trim();

      tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // 👉 Fungsi untuk merender tugas ke dalam DOM
  function renderTask({ name, description, deadline }) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("tugas");
    taskElement.innerHTML = `
      <p><b>Nama Tugas:</b> ${name}</p>
      <p><b>Deskripsi:</b> ${description}</p>
      <p><b>Deadline:</b> ${deadline}</p>
      <button class="delete-btn">Hapus</button>
    `;

    // 🚀 Tambahkan fungsi hapus
    const deleteButton = taskElement.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
      taskElement.remove();
      saveTasks(); // Simpan perubahan ke localStorage setelah menghapus

      if (taskList.children.length === 0) {
        showEmptyMessage();
      }
    });

    taskList.appendChild(taskElement);
  }

  // 👉 Fungsi untuk menampilkan pesan "Tugas Kosong"
  function showEmptyMessage() {
    const emptyMessage = document.createElement('h2');
    emptyMessage.id = 'tgskosong';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.textContent = 'Tugas Kosong';
    taskList.parentNode.insertBefore(emptyMessage, taskList);
  }

  // 🚀 Tambahkan tugas baru
  addButton.addEventListener("click", function () {
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskDeadline = taskDeadlineInput.value.trim();

    if (taskName && taskDeadline) {
      const emptyMessageElement = document.getElementById("tgskosong");
      if (emptyMessageElement) emptyMessageElement.remove();

      const newTask = { name: taskName, description: taskDescription, deadline: taskDeadline };
      renderTask(newTask); // Render tugas ke halaman
      saveTasks(); // Simpan ke localStorage

      // Reset form
      taskNameInput.value = "";
      taskDescriptionInput.value = "";
      taskDeadlineInput.value = "";
    } else {
      alert("Form tidak boleh kosong");
    }
  });

  // 👉 Tampilkan pesan "Tugas Kosong" jika tidak ada tugas di localStorage
  if (savedTasks.length === 0) {
    showEmptyMessage();
  }
});
