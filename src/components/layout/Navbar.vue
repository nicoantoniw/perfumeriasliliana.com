<template>
  <div
    v-if="
      checkRoute !== '/admin/products' &&
        checkRoute !== '/admin/orders' &&
        checkRoute !== '/admin/website-products' &&
        checkRoute !== '/admin/featured-products' &&
        checkRoute !== '/admin/promotion-products' &&
        checkRoute !== '/admin/users'
    "
  >
    <div class="navbar-container">
      <Alert />
      <div class="navbar">
        <div class="logo-menu">
          <router-link :to="{ name: 'home' }">
            <p>Logo</p>
          </router-link>
        </div>
        <div class="login-menu" style="margin:auto">
          <!-- <v-autocomplete
          class="mr-3"
          chips
          placeholder="Buscar productos"
          no-data-text="No se encontraron resultados"
          rounded
          background-color="white"
          color="black"
          ></v-autocomplete>-->

          <v-menu
            class="menu1"
            z-index="555"
            offset-y
            transition="scale-transition"
            open-on-click
            v-if="!authenticated && menuIndicator === true"
            v-model="menu1"
            :close-on-content-click="false"
            min-width="250px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                @click="menu1 = true"
                x-large
                outlined
                color="black"
                v-if="!authenticated"
                v-on="on"
              >MI CUENTA</v-btn>
            </template>
            <v-text-field v-model="email" color="black" outlined label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              color="black"
              type="password"
              outlined
              label="Contraseña"
            ></v-text-field>
            <v-hover open-delay="200">
              <v-btn
                dark
                color="black"
                large
                outlined
                @click="login"
                class="text-none mb-3"
              >Ingresar</v-btn>
            </v-hover>
            <p>Reestablecer Contraseña</p>
            <p>
              Todavia no te registraste?
              <span>
                <a @click="redirect">Registrarse</a>
              </span>
            </p>
          </v-menu>

          <v-menu
            class="menu1"
            z-index="555"
            offset-y
            transition="scale-transition"
            open-on-click
            v-if="authenticated"
            :close-on-content-click="true"
            min-width="250px"
          >
            <template v-slot:activator="{ on }">
              <v-btn x-large text v-on="on">CUENTA</v-btn>
            </template>
            <v-list>
              <v-list-item class="no-active" link :to="{ name: 'profile' }">
                <v-list-item-content>
                  <v-list-item-title>Mis datos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="no-active" link :to="{ name: 'orders' }">
                <v-list-item-content>
                  <v-list-item-title>Mis compras</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout" class="no-active">
                <v-list-item-content>
                  <v-list-item-title>Cerrar sesion</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-progress-circular class="ml-3" v-if="loader" color="black" indeterminate></v-progress-circular>
          <v-badge :value="changeCart" :content="changeCart" color="black">
            <router-link
              v-if="authenticated"
              style="text-decoration:none;margin-left:1.5rem"
              :to="{ name: 'cart' }"
            >
              <v-icon color="black">shopping_basket</v-icon>
            </router-link>
          </v-badge>
          <router-link
            v-if="isAdmin"
            style="text-decoration:none;margin-left:1.5rem"
            :to="{ name: 'adminProducts' }"
          >
            <v-icon color="black">mdi-account</v-icon>
          </router-link>
        </div>
      </div>
      <div style="width:60%">
        <v-divider></v-divider>
      </div>
      <div class="navbar2">
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              FRAGANCIAS
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'perfumes mujer' } }"
            >
              <v-list-item-content>
                <v-list-item-title>MUJER</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'perfumes hombre' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>HOMBRE</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'perfumes niños' } }"
            >
              <v-list-item-content>
                <v-list-item-title>NIÑOS/AS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'perfumes sets' } }"
            >
              <v-list-item-content>
                <v-list-item-title>SETS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              PELUQUERIA & COLORACIÓN
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              ::to="{ name: 'products',params:{category:'shampoo'} }"
            >
              <v-list-item-content>
                <v-list-item-title>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Acondicionador</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'baños de crema' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Baños de crema</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'cremas de peinar' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>cremas de peinar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'serum' } }"
            >
              <v-list-item-content>
                <v-list-item-title>serum</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'protectores termicos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>protectores térmicos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tinturas' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Tinturas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'decoloracion' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Decolorantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'oxidantes' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Oxidantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'geles y fijadores' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>geles y fijadores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'cabezas de practica' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Cabezas de Practica</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'tijeras navajas y filos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Tijeras Navajas y Filos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'peines brochas y pinceles' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Peines Brochas y Pinceles</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'capas broches y separadores de pelo' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Capas Broches y Separadores de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'lavacabezas' } }"
            >
              <v-list-item-content>
                <v-list-item-title>lavacabezas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'guantes gorros y cofias' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>guantes gorros y cofias</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          x-large
          text
          class="no-active"
          link
          :to="{ name: 'products', params: { category: 'limpieza' } }"
        >LIMPIEZA</v-btn>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              MAKEUP
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'maquillaje labios' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Labios</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'maquillaje rostro' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Rostro</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'maquillaje ojos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Ojos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'brochas y pinceles' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>brochas y pinceles</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'sets de maquillaje' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Sets de maquillaje</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              PIEL & CUIDADO PERSONAL
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'shampoo' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title>acondicionador</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'tratamiento capilar' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Tratamiento Capilar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'geles y fijadores' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>geles y fijadores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'alcohol' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Alcohol en gel</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'jabones' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Jabones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'barbijos' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Tapabocas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'protectores solares' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Protección Solar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'proteccion femenina' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>protección femenina</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'tratamientos de cuerpo' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Tratamientos de Cuerpo y Cremas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'tratamientos de rostro' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Tratamientos de Rostro</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'depilación' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Depilación</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'desodorantes' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Desodorantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'cuidado bucal' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Cuidado bucal</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'talcos' } }"
            >
              <v-list-item-content>
                <v-list-item-title>talcos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'algodones' } }"
            >
              <v-list-item-content>
                <v-list-item-title>algodones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'pañales y apositos de adultos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>pañales y apósitos de adultos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'toallitas humedas' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>toallitas húmedas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              BEBÉS
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'pañales bebe ' } }"
            >
              <v-list-item-content>
                <v-list-item-title>pañales</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'shampoo' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Acondicionador</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'talcos' } }"
            >
              <v-list-item-content>
                <v-list-item-title>talcos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'colonias' } }"
            >
              <v-list-item-content>
                <v-list-item-title>colonias</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'chupetes y mamaderas' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>chupetes y mamaderas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'jabones bebes' } }"
            >
              <v-list-item-content>
                <v-list-item-title>jabones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'toallitas humedas bebes' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>toallitas húmedas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              MANOS Y PIES
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'esmaltes' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Esmaltes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'manos y uñas tratamiento' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Tratamientos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'quitaesmaltes' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Quitaesmaltes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'manos y uñas accesorios' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Accesorios</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tornos' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Tornos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'manos y uñas cabinas' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Cabinas & Equipos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              MAQUINAS
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'spa facial' } }"
            >
              <v-list-item-content>
                <v-list-item-title>SPA Facial</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'spa pies' } }"
            >
              <v-list-item-content>
                <v-list-item-title>SPA de Pies</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'cortadoras de pelo' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Cortadoras de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'planchitas' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Planchitas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'secadores de pelo' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Secadores de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'bucleadoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Bucleadoras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'cepillos electricos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Cepillos Electricos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tornos' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Tornos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'afeitadoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Afeitadoras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'depiladoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Depiladoras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'masajeadores' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Masajeadores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'balanzas' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Balanzas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'termometros' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Termometros</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tensiometros' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Tensiometros</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition" open-on-hover min-width="150px">
          <template v-slot:activator="{ on }">
            <v-btn x-large text class="no-active" v-on="on">
              ACCESORIOS
              <span>
                <v-icon color="black">keyboard_arrow_down</v-icon>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'portacosmeticos' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Portacosméticos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'uñas' } }"
            >
              <v-list-item-content>
                <v-list-item-title>Uñas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'pestañas y cejas' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Pestañas y Cejas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'brochas y pinceles' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Brochas y Pinceles</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{
                name: 'products',
                params: { category: 'esponjas y cisnes' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>Esponjas y Cisnes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->
    <!-- ---------------------------------------------------------------------------------------- -->

    <v-app-bar app fixed color="#000" v-if="$vuetify.breakpoint.smAndDown" dark height="120px">
      <v-container class="toolbar-items-sm">
        <div style="display:flex;justify-content:space-between">
          <div>
            <!-- <img
              class="toolbar-logo-sm"
              src="../../.././assets/images/ozix-logo-white.png"
              alt="logo"
            />-->
          </div>
          <div>
            <v-container>
              <v-dialog
                :retain-focus="false"
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-icon x-large rounded color="white" class="mb-2" v-on="on">mdi-menu</v-icon>
                </template>
                <v-card style="background:#000">
                  <v-card-text>
                    <v-container>
                      <div style="display:flex;justify-content:space-between">
                        <v-btn icon class="cancel-dialog" @click.native="dialog = false">
                          <v-icon color="white" x-large>mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <div class="boxes">
                        <div class="box">
                          <v-btn
                            x-large
                            class="no-active text-none"
                            text
                            dark
                            :to="{ name: 'home' }"
                            @click="dialog = false"
                          >Dashboard</v-btn>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            dark
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large class="text-none" text v-on="on">
                                Tienda
                                <span>
                                  <v-icon color="black">keyboard_arrow_down</v-icon>
                                </span>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item class="no-active" link :to="{}" @click="dialog = false">
                                <v-list-item-content>
                                  <v-list-item-title>Productos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item class="no-active" link :to="{}" @click="dialog = false">
                                <v-list-item-content>
                                  <v-list-item-title>Categorias</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </div>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-container>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "../Alert";
import errorAlertHandler from "../../util/error";

export default {
  name: "navbar",
  components: { Alert },
  data: function() {
    return {
      dialog: false,
      menuIndicator: true,
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      collapse: false,
      flat: true,
      bg: false,
      extensionHeight: 48,
      email: "",
      password: "",
      menu1: false,
      cartItems: this.$store.state.cartItems
    };
  },
  created() {
    if (this.$store.state.userId) {
      this.updateCart();
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.token;
    },
    isAdmin() {
      return this.$store.state.role;
    },
    checkRoute() {
      return this.$route.path;
    },
    loader() {
      return this.$store.state.loader1;
    },
    changeCart() {
      return this.$store.state.cartItems;
    }
  },
  methods: {
    replace(category) {
      if (this.$route.path !== "/") {
        this.$router.replace("/");
      }
      this.$router.push({
        name: "products",
        params: { category: `${category}` }
      });
    },
    async login() {
      const data = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", data);
        if (this.$store.state.userId !== null) {
          const response = await axios.get(
            `/website/user/cart/${this.$store.state.userId}`
          );
          this.cartItems = response.data.cart.items.length;
        } else {
          this.cartItems = 0;
        }
      } catch (error) {
        errorAlertHandler(error, "not found");
      }
    },
    async updateCart() {
      try {
        const response = await axios.get(
          `/website/user/cart/${this.$store.state.userId}`
        );
        this.cartItems = response.data.cart.items.length;
      } catch (error) {}
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
    redirect() {
      this.menu1 = false;
      this.$router.replace("/signup");
    }
  }
};
</script>

<style scoped lang="scss">
.navbar-container {
  top: 0;
  z-index: 20;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .navbar {
    background: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    z-index: 11;
    padding: 1rem 3rem;

    p {
      color: #000;
    }
    .logo-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      margin: auto;
      a {
        color: black;
        text-decoration: none;
      }
      .v-autocomplete {
        margin-top: 0.5rem;
      }
      .v-btn {
        margin-right: 1rem;
        transition: 0.5s ease-in-out;
        padding: 0.5rem;
        border-radius: 0;
        &:hover {
          border-bottom: 1px solid #333;
        }
      }
    }
    .login-menu {
      .menu1 {
        p {
          color: red;
        }
      }
    }
  }

  .navbar2 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
  }
}

.v-menu__content {
  background: rgb(255, 255, 255);
  padding: 1rem;

  .v-list {
    background: rgb(255, 255, 255);
    color: #000;
    text-transform: uppercase;
    display: grid;
    grid-template-rows: repeat(6, min-content);
    grid-auto-flow: column;
  }
}
.no-active::before {
  display: none;
}

.toolbar-items-sm {
  div {
    .toolbar-logo-sm {
      width: 85px;
    }
  }
}

.boxes {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    margin-bottom: 3rem;
  }
}
</style>
