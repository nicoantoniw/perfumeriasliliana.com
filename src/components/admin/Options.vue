<template>
  <div>
    <v-data-table
      style="margin-top:3rem;padding:1rem"
      :headers="headers"
      :search="search"
      :items="options"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          color="black"
          class="elevation-5 mb-5 hidden-md-and-down"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Opciones de producto</v-toolbar-title>
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
              <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nueva Opcion</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class>Nueva Opcion</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="7" sm="11" xs="11" md="7">
                      <v-text-field v-model="option.name" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3" sm="11" xs="11" md="3">
                      <p style="color:white">s</p>
                    </v-col>
                    <v-col cols="12" lg="3" sm="11" xs="11" md="3">
                      <v-text-field v-model="value" label="Valor"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1" sm="1" xs="1" md="1">
                      <v-icon class="mt-7" color="black" @click="addValue">add_circle</v-icon>
                    </v-col>
                  </v-row>

                  <v-data-table
                    :headers="headers2"
                    :items="option.values"
                    class="elevation-1"
                    no-data-text="No se encontraron items"
                    no-results-text="No se encontraron resultados en la busqueda"
                    hide-default-footer
                  >
                    <template v-slot:item.action="{ item }" class="px-0">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" @click="deleteValue(item)">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="clear">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addOption">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <!-- ---------------------- -->
        <!-- ---------------------- -->
        <!-- ---------------------- -->
        <v-toolbar
          height="250"
          color="primary"
          class="elevation-5 mb-5 hidden-lg-and-up"
          style="width:95%;margin:0 auto;border-radius:.5rem;position:relative;top:-1.5rem"
          dark
        >
          <v-toolbar-title class="white--text">Opciones de producto</v-toolbar-title>
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
          <v-dialog :retain-focus="false" v-model="dialog2" max-width="1000px">
            <template v-slot:activator="{ on }">
              <v-btn rounded color="white" class="mb-2 black--text" v-on="on">Nueva Opcion</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class>Nueva Opcion</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" lg="7" sm="11" xs="11" md="7">
                      <v-text-field v-model="option.name" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3" sm="11" xs="11" md="3">
                      <p style="color:white">s</p>
                    </v-col>
                    <v-col cols="12" lg="3" sm="11" xs="11" md="3">
                      <v-text-field v-model="value" label="Valor"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1" sm="1" xs="1" md="1">
                      <v-icon class="mt-7" color="black" @click="addValue">add_circle</v-icon>
                    </v-col>
                  </v-row>

                  <v-data-table
                    :headers="headers2"
                    :items="option.values"
                    class="elevation-1"
                    no-data-text="No se encontraron items"
                    no-results-text="No se encontraron resultados en la busqueda"
                    hide-default-footer
                  >
                    <template v-slot:item.action="{ item }" class="px-0">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" @click="deleteValue(item)">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="clear">Cancelar</v-btn>
                <v-btn color="success" outlined @click="addOption">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }" class="px-0">
        <v-menu offset-y transition="slide-y-transition" open-on-click min-width="150px">
          <template v-slot:activator="{ on }">
            <v-icon text class="no-active" v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-item class="no-active" link @click="getOption(item)">
              <v-list-item-content>
                <v-list-item-title class>Ver valores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="updateOption(item)">
              <v-list-item-content>
                <v-list-item-title class>Editar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="no-active" link @click="deleteOption(item)">
              <v-list-item-content>
                <v-list-item-title class>Eliminar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <p>No se encontraron items</p>
      </template>
    </v-data-table>

    <v-dialog persistent :retain-focus="false" v-model="dialog3" max-width="900px">
      <v-card>
        <v-card-title>
          <span class>Valores</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in option.values" :key="item.value">
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" outlined @click="clear">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import errorAlertHandler from "../../util/error";

export default {
  name: "options",
  data: () => ({
    headers: [
      { text: "Nombre", value: "name", sortable: true },
      { text: "", value: "action", sortable: false }
    ],
    headers2: [
      { text: "Valor", value: "value", sortable: true },
      { text: "", value: "action", sortable: false }
    ],
    search: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    editedIndex: -1,
    options: [],
    option: {
      name: "",
      values: []
    },
    value: ""
  }),
  created() {
    this.getOptions();
  },
  methods: {
    async getOptions() {
      try {
        const response = await axios.get(`/option/options`);
        const options = response.data.options;
        this.options = options;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async getOption(item) {
      try {
        const response = await axios.get(`/option/options/${item._id}`);
        const option = response.data.option;
        this.option = option;
        this.dialog3 = true;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async addOption() {
      if (this.editedIndex > -1) {
        const data = {
          name: this.option.name,
          values: this.option.values
        };
        try {
          await axios.put(`/option/update/${this.option._id}`, data);
          this.dialog = false;
          this.clear();
          this.getOptions();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Opcion actualizada"
          });
        } catch (err) {
          errorAlertHandler(err, "Opcion no encontrada");
        }
      } else {
        const data = {
          name: this.option.name,
          values: this.option.values
        };
        try {
          await axios.post(`/option/add`, data);
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Opcion Agregada"
          });
          this.clear();
          this.getOptions();
        } catch (err) {
          errorAlertHandler(err, "No encontrado");
        }
      }
    },
    async updateOption(item) {
      try {
        this.editedIndex = this.options.indexOf(item);
        this.option = Object.assign({}, item);
        this.dialog = true;
      } catch (err) {
        errorAlertHandler(err, "No encontrado");
      }
    },
    async deleteOption(item) {
      try {
        if (confirm("Eliminar item?")) {
          await axios.delete(`/option/delete/${item._id}`);
          this.getOptions();
          this.$store.dispatch("showAlert", {
            status: true,
            type: "success",
            text: "Opcion eliminada"
          });
        } else {
          return;
        }
      } catch (err) {
        errorAlertHandler(err, "Opcion no encontrada");
      }
    },
    async addValue() {
      const data = {
        value: this.value
      };
      this.option.values.push(data);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Valor Agregado"
      });
      this.value = "";
    },
    async deleteValue(item) {
      const index = this.option.values.indexOf(item);
      let num = 0;
      this.option.values.splice(index, 1);
      this.$store.dispatch("showAlert", {
        status: true,
        type: "success",
        text: "Valor eliminado"
      });
    },
    clear() {
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.editedIndex = -1;
      this.option.name = "";
      this.option.values = [];
      this.value = "";
    }
  }
};
</script>

<style lang="scss">
</style>
