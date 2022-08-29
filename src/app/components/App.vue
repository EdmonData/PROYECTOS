<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask"><!-- //? .prevent agrega un preventDefault -->
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Insert A Task"
                    class="form-control"
                    v-model="task.title"
                  />
                </div>
                <div class="form-group mt-2">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Insert A Description"
                    v-model="task.description"
                  ></textarea>
                </div>
                <div class="d-grid gap-2">
                    <template  v-if="edit === false">
                      <button class="btn btn-primary mt-2">Save Task</button>
                    </template>
                    <template v-if="edit === true">
                      <button class="btn btn-primary mt-2">Update</button>
                    </template>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <caption>
              *Muestar todas las tareas
            </caption>
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in tasks" :key="index">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td class="text-center">
                  <button @click="deleteTask(task._id)" class="btn btn-danger mx-2">
                    Delete</button><!--//! el _id es de mogoDB-->
                  <button @click="updateTask(task._id)" class="btn btn-warning mx-2" >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: ''
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
     if (this.edit === false){
         if (this.task.title == undefined || this.task.description == undefined) {
        alert("Please Insert A Task");
      } else {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((_data) => {
            this.getTasks();
          });
        this.task = new Task();
      }
     }else{
       fetch("/api/tasks/" + this.taskToEdit, {
         method: "PUT",
         body: JSON.stringify(this.task),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       })
         .then((res) => res.json())
         .then((_data) => {
           this.getTasks();
         });
       this.task = new Task();
       this.edit = false;
     }
    },
    getTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tasks = data;
        });
    },
    deleteTask(id) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((_data) => {
          this.getTasks();
          this.edit = false;
        });
    },
    updateTask(id) {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.task = new Task(data.title, data.description);
          this.edit = true;
          this.taskToEdit = data._id;
        });
    },
  }
};
</script>

<style></style>