<template>
  <v-data-table
    style="margin-top:4rem"
    :headers="headers"
    :items="categories"
    :search="search"
    class="elevation-1"
    :mobile-breakpoint="1264"
    no-data-text="No se encontraron categorias"
    no-results-text="No se encontraron resultados en la busqueda"
  >
    <template v-slot:top>
      <v-toolbar
        color="black"
        class="elevation-5 mb-5 hidden-md-and-down"
        style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
        dark
      >
        <v-toolbar-title class="white--text">Lista de Categorias</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center white--text"
          v-model="search"
          placeholder="Busqueda"
          single-line
          hide-details
          append-icon="mdi-magnify"
          color="white"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog :retain-focus="false" v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="12" xs="12" sm="12" md="12">
                    <v-text-field v-model="category.name" label="Categoria"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="12" xs="12" sm="12" md="12">
                    <v-text-field v-model="category.description" label="Descripcion"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" outlined @click="close">Cancelar</v-btn>
              <v-btn color="success" outlined @click="addCategory">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-toolbar
        height="250"
        color="primary"
        class="elevation-5 mb-5 hidden-lg-and-up"
        style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
        dark
      >
        <v-toolbar-title class="white--text">Lista de Categorias</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center white--text"
          v-model="search"
          placeholder="Busqueda"
          single-line
          hide-details
          append-icon="mdi-magnify"
          color="white"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog :retain-focus="false" v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn rounded color="white" class="mb-2 margin-too-much black--text" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="12" xs="12" sm="12" md="12">
                    <v-text-field v-model="category.name" label="Categoria"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="12" xs="12" sm="12" md="12">
                    <v-text-field v-model="category.description" label="Descripcion"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" outlined @click="close">Cancelar</v-btn>
              <v-btn color="success" outlined @click="addCategory">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }" class="px-0">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small class="mr-2" v-on="on" @click="updateCategory(item)">mdi-pencil</v-icon>
        </template>
        <span>Editar</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-if="item.status === 'activo'" v-slot:activator="{ on }">
          <v-icon small class="mr-2" v-on="on" @click="changeCategoryStatus(item)">mdi-cancel</v-icon>
        </template>
        <template v-else v-slot:activator="{ off }">
          <v-icon small class="mr-2" v-on="off" @click="changeCategoryStatus(item)">mdi-check-bold</v-icon>
        </template>
        <span>Activar / Desactivar</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small v-on="on" @click="deleteCategory(item)">mdi-delete</v-icon>
        </template>
        <span>Eliminar</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "adminCategories",
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: true,
        value: "name"
      },
      { text: "Descripcion", value: "description", sortable: false },
      { text: "", value: "action", sortable: false }
    ],
    categories: [],
    editedIndex: -1,
    category: {
      name: "",
      description: ""
    }
  }),
  created() {
    this.getCategories();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Categoria" : "Editar Categoria";
    }
  },
  methods: {
    async getCategories() {
      try {
        const response = await axios.get(`/category/categories`);
        const categories = response.data.categories;
        this.categories = categories;
        let counter = 0;
      } catch (err) {
        errorAlertHandler(err, this.categories);
      }
    },
    async addCategory() {
      if (this.editedIndex > -1) {
        const data = {
          name: this.category.name,
          description: this.category.description
        };
        try {
          await axios.put(`/category/update/${this.category._id}`, data);
          this.close();
          this.getCategories();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Categoria actualizada"
          });
        } catch (err) {
          errorAlertHandler(err, "Categoria no encontrada");
        }
      } else {
        const data = {
          name: this.category.name,
          description: this.category.description
        };
        try {
          await axios.post(`/category/add`, data);
          this.close();
          this.getCategories();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Categoria creada"
          });
        } catch (err) {
          errorAlertHandler(err, "No encontrado");
        }
      }
    },

    updateCategory(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.category = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteCategory(item) {
      try {
        if (confirm("Eliminar item?")) {
          await axios.delete(`/category/delete/${item._id}`);
          this.getCategories();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Categoria eliminada"
          });
        } else {
          return;
        }
      } catch (err) {
        errorAlertHandler(err, "Categoria no encontrada");
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.category = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>

<style  lang="scss">
.v-navigation-drawer {
  .v-navigation-drawer__content {
    h2 {
      color: white;
    }
    .spacer {
      color: white;
      width: 100%;
    }
  }
}
</style>