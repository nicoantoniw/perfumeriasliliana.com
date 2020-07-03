<template>
  <div
    v-if="
      checkRoute !== '/admin/products' &&
        checkRoute !== '/admin/orders' &&
        checkRoute !== '/admin/categories' &&
        checkRoute !== '/admin/options' &&
        checkRouteByName !== 'variants' &&
        checkRoute !== '/admin/website-products' &&
        checkRoute !== '/admin/featured-products' &&
        checkRoute !== '/admin/promotion-products' &&
        checkRoute !== '/admin/users'
    "
  >
    <div class="navbar-container" v-if="$vuetify.breakpoint.lgAndUp">
      <Alert />
      <div class="navbar">
        <div class="logo-menu">
          <router-link :to="{ name: 'home' }">
            <img src="../../assets/logo.png" alt />
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
                rounded
                color="black"
                x-large
                class="no-active"
                outlined
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
              @keyup.enter="login"
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
            <p>
              Te olvidaste la contraseña?
              <span>
                <a @click="redirect2">Reestablecer contraseña</a>
              </span>
            </p>
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
              <v-btn class="no-active" x-large color="black" rounded outlined v-on="on">CUENTA</v-btn>
            </template>
            <v-list>
              <v-list-item v-if="isAdmin" class="no-active" link :to="{ name: 'adminProducts' }">
                <v-list-item-content>
                  <v-list-item-title class>Administrar Pagina</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="!isAdmin" class="no-active" link :to="{ name: 'profile' }">
                <v-list-item-content>
                  <v-list-item-title class>Mis datos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="!isAdmin" class="no-active" link :to="{ name: 'orders' }">
                <v-list-item-content>
                  <v-list-item-title class>Mis compras</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout" class="no-active">
                <v-list-item-content>
                  <v-list-item-title class>Cerrar sesion</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-progress-circular class="ml-3" v-if="loader" color="black" indeterminate></v-progress-circular>
          <v-badge v-if="!isAdmin" :value="changeCart" :content="changeCart" color="black">
            <router-link
              v-if="authenticated"
              style="text-decoration:none;margin-left:1.5rem"
              :to="{ name: 'cart' }"
            >
              <v-icon color="black">shopping_basket</v-icon>
            </router-link>
          </v-badge>
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
                <v-list-item-title class>MUJER</v-list-item-title>
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
                <v-list-item-title class>HOMBRE</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'perfumes niños' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>NIÑOS/AS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'perfumes sets' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>SETS</v-list-item-title>
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
                <v-list-item-title class>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Acondicionador</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'baños de crema' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Baños de crema</v-list-item-title>
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
                <v-list-item-title class>cremas de peinar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'serum' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>serum</v-list-item-title>
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
                <v-list-item-title class>protectores térmicos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tinturas' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Tinturas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'decoloracion' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Decolorantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'oxidantes' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Oxidantes</v-list-item-title>
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
                <v-list-item-title class>geles y fijadores</v-list-item-title>
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
                <v-list-item-title class>Cabezas de Practica</v-list-item-title>
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
                <v-list-item-title class>Tijeras Navajas y Filos</v-list-item-title>
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
                <v-list-item-title class>Peines Brochas y Pinceles</v-list-item-title>
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
                <v-list-item-title class>Capas Broches y Separadores de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'lavacabezas' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>lavacabezas</v-list-item-title>
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
                <v-list-item-title class>guantes gorros y cofias</v-list-item-title>
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
                <v-list-item-title class>Labios</v-list-item-title>
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
                <v-list-item-title class>Rostro</v-list-item-title>
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
                <v-list-item-title class>Ojos</v-list-item-title>
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
                <v-list-item-title class>brochas y pinceles</v-list-item-title>
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
                <v-list-item-title class>Sets de maquillaje</v-list-item-title>
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
                <v-list-item-title class>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>acondicionador</v-list-item-title>
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
                <v-list-item-title class>Tratamiento Capilar</v-list-item-title>
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
                <v-list-item-title class>geles y fijadores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'alcohol' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Alcohol en gel</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'jabones' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Jabones</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'barbijos' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Tapabocas</v-list-item-title>
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
                <v-list-item-title class>Protección Solar</v-list-item-title>
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
                <v-list-item-title class>protección femenina</v-list-item-title>
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
                <v-list-item-title class>Tratamientos de Cuerpo y Cremas</v-list-item-title>
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
                <v-list-item-title class>Tratamientos de Rostro</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'depilación' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Depilación</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'desodorantes' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Desodorantes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'cuidado bucal' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Cuidado bucal</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'talcos' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>talcos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'algodones' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>algodones</v-list-item-title>
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
                <v-list-item-title class>pañales y apósitos de adultos</v-list-item-title>
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
                <v-list-item-title class>toallitas húmedas</v-list-item-title>
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
                <v-list-item-title class>pañales</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'shampoo' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Shampoo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'acondicionador' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Acondicionador</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'talcos' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>talcos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'colonias' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>colonias</v-list-item-title>
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
                <v-list-item-title class>chupetes y mamaderas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'jabones bebes' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>jabones</v-list-item-title>
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
                <v-list-item-title class>toallitas húmedas</v-list-item-title>
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
                <v-list-item-title class>Esmaltes</v-list-item-title>
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
                <v-list-item-title class>Tratamientos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'quitaesmaltes' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Quitaesmaltes</v-list-item-title>
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
                <v-list-item-title class>Accesorios</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tornos' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Tornos</v-list-item-title>
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
                <v-list-item-title class>Cabinas & Equipos</v-list-item-title>
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
                <v-list-item-title class>SPA Facial</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'spa pies' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>SPA de Pies</v-list-item-title>
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
                <v-list-item-title class>Cortadoras de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'planchitas' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Planchitas</v-list-item-title>
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
                <v-list-item-title class>Secadores de pelo</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'bucleadoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Bucleadoras</v-list-item-title>
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
                <v-list-item-title class>Cepillos Electricos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tornos' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Tornos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'afeitadoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Afeitadoras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'depiladoras' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Depiladoras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'masajeadores' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Masajeadores</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'balanzas' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Balanzas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'termometros' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Termometros</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'tensiometros' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Tensiometros</v-list-item-title>
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
                <v-list-item-title class>Portacosméticos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="no-active"
              link
              :to="{ name: 'products', params: { category: 'uñas' } }"
            >
              <v-list-item-content>
                <v-list-item-title class>Uñas</v-list-item-title>
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
                <v-list-item-title class>Pestañas y Cejas</v-list-item-title>
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
                <v-list-item-title class>Brochas y Pinceles</v-list-item-title>
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
                <v-list-item-title class>Esponjas y Cisnes</v-list-item-title>
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
    <v-app-bar app fixed color="#000" v-if="$vuetify.breakpoint.mdAndDown" dark height="120px">
      <v-container class="toolbar-items-sm">
        <div style="display:flex;justify-content:space-between">
          <div>
            <v-menu
              class="menu1"
              z-index="555"
              offset-y
              transition="scale-transition"
              open-on-click
              v-if="!authenticated && menuIndicator === true"
              v-model="menu1"
              :close-on-content-click="false"
              min-width="100%"
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  large
                  class="mt-4"
                  @click="menu1 = true"
                  v-if="!authenticated"
                  v-on="on"
                >person</v-icon>
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
              min-width="100%"
            >
              <template v-slot:activator="{ on }">
                <v-icon large class="mt-4" v-on="on">person</v-icon>
              </template>
              <v-list>
                <v-list-item v-if="isAdmin" class="no-active" link :to="{ name: 'adminProducts' }">
                  <v-list-item-content>
                    <v-list-item-title class>Administrar Pagina</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="!isAdmin" class="no-active" link :to="{ name: 'profile' }">
                  <v-list-item-content>
                    <v-list-item-title class>Mis datos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="!isAdmin" class="no-active" link :to="{ name: 'orders' }">
                  <v-list-item-content>
                    <v-list-item-title class>Mis compras</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout" class="no-active">
                  <v-list-item-content>
                    <v-list-item-title class>Cerrar sesion</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-progress-circular class="ml-3 mt-3" v-if="loader" color="white" indeterminate></v-progress-circular>
            <v-badge v-if="!isAdmin" :value="changeCart" :content="changeCart" color="white">
              <router-link
                v-if="authenticated"
                style="text-decoration:none;margin-left:1.5rem"
                :to="{ name: 'cart' }"
              >
                <v-icon large class="mt-4">shopping_basket</v-icon>
              </router-link>
            </v-badge>
          </div>
          <div>
            <router-link :to="{ name: 'home' }">
              <img class="toolbar-logo-sm" src="../../assets/logo.png" alt="logo" />
            </router-link>
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
                          <v-menu
                            offset-y
                            dark
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn x-large dark text class="no-active" v-on="on">
                                FRAGANCIAS
                                <span>
                                  <v-icon color="white">keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">MUJER</v-list-item-title>
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
                                  <v-list-item-title class="black--text">HOMBRE</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'perfumes niños' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">NIÑOS/AS</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'perfumes sets' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">SETS</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn x-large dark text class="no-active" v-on="on">
                                PELUQUERIA & COLORACIÓN
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">Shampoo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'acondicionador' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Acondicionador</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'baños de crema' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Baños de crema</v-list-item-title>
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
                                  <v-list-item-title class="black--text">cremas de peinar</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'serum' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">serum</v-list-item-title>
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
                                  <v-list-item-title class="black--text">protectores térmicos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'tinturas' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Tinturas</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'decoloracion' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Decolorantes</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'oxidantes' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Oxidantes</v-list-item-title>
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
                                  <v-list-item-title class="black--text">geles y fijadores</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Cabezas de Practica</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Tijeras Navajas y Filos</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Peines Brochas y Pinceles</v-list-item-title>
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
                                  <v-list-item-title
                                    class="black--text"
                                  >Capas Broches y Separadores de pelo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'lavacabezas' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">lavacabezas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">guantes gorros y cofias</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-btn
                            x-large
                            text
                            dark
                            class="no-active"
                            link
                            :to="{ name: 'products', params: { category: 'limpieza' } }"
                          >
                            LIMPIEZA
                            <span>
                              <v-icon color="black">keyboard_arrow_down</v-icon>
                            </span>
                          </v-btn>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large text class="no-active" v-on="on">
                                MAKEUP
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">Labios</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Rostro</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Ojos</v-list-item-title>
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
                                  <v-list-item-title class="black--text">brochas y pinceles</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Sets de maquillaje</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large text class="no-active" v-on="on">
                                PIEL & CUIDADO PERSONAL
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">Shampoo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'acondicionador' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">acondicionador</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Tratamiento Capilar</v-list-item-title>
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
                                  <v-list-item-title class="black--text">geles y fijadores</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'alcohol' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Alcohol en gel</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'jabones' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Jabones</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'barbijos' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Tapabocas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Protección Solar</v-list-item-title>
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
                                  <v-list-item-title class="black--text">protección femenina</v-list-item-title>
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
                                  <v-list-item-title
                                    class="black--text"
                                  >Tratamientos de Cuerpo y Cremas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Tratamientos de Rostro</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'depilación' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Depilación</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'desodorantes' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Desodorantes</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'cuidado bucal' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Cuidado bucal</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'talcos' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">talcos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'algodones' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">algodones</v-list-item-title>
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
                                  <v-list-item-title
                                    class="black--text"
                                  >pañales y apósitos de adultos</v-list-item-title>
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
                                  <v-list-item-title class="black--text">toallitas húmedas</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn x-large dark text class="no-active" v-on="on">
                                BEBÉS
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">pañales</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'shampoo' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Shampoo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'acondicionador' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Acondicionador</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'talcos' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">talcos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'colonias' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">colonias</v-list-item-title>
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
                                  <v-list-item-title class="black--text">chupetes y mamaderas</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'jabones bebes' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">jabones</v-list-item-title>
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
                                  <v-list-item-title class="black--text">toallitas húmedas</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large text class="no-active" v-on="on">
                                MANOS Y PIES
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">Esmaltes</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Tratamientos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'quitaesmaltes' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Quitaesmaltes</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Accesorios</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'tornos' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Tornos</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Cabinas & Equipos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large text class="no-active" v-on="on">
                                MAQUINAS
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">SPA Facial</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'spa pies' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">SPA de Pies</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Cortadoras de pelo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'planchitas' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Planchitas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Secadores de pelo</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'bucleadoras' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Bucleadoras</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Cepillos Electricos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'tornos' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Tornos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'afeitadoras' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Afeitadoras</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'depiladoras' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Depiladoras</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'masajeadores' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Masajeadores</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'balanzas' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Balanzas</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'termometros' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Termometros</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'tensiometros' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Tensiometros</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                        <div class="box">
                          <v-menu
                            offset-y
                            transition="slide-y-transition"
                            open-on-click
                            min-width="100%"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn dark x-large text class="no-active" v-on="on">
                                ACCESORIOS
                                <span>
                                  <v-icon>keyboard_arrow_down</v-icon>
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
                                  <v-list-item-title class="black--text">Portacosméticos</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                class="no-active"
                                link
                                :to="{ name: 'products', params: { category: 'uñas' } }"
                              >
                                <v-list-item-content>
                                  <v-list-item-title class="black--text">Uñas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Pestañas y Cejas</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Brochas y Pinceles</v-list-item-title>
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
                                  <v-list-item-title class="black--text">Esponjas y Cisnes</v-list-item-title>
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
    checkRouteByName() {
      return this.$route.name;
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
    },
    redirect2() {
      this.menu1 = false;
      this.$router.replace("/forgot");
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
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
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
      img {
        height: 115px;
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
      height: 75px;
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
@media only screen and (max-width: 1264px) {
  .v-menu__content {
    background: rgb(255, 255, 255);
    padding: 1rem;

    .v-list {
      background: rgb(255, 255, 255);
      color: #000;
      text-transform: uppercase;
      display: grid;
      grid-template-rows: repeat(12, min-content);
      grid-auto-flow: column;
    }
  }
}
</style>
