import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";
import Men from "../views/Men.vue";
import Women from "../views/Women.vue";
import Jewelries from "../views/Jewelries.vue";
import Contact from "../views/Contact.vue";
import Electronics from "../views/Electronics.vue";
import details from "@/views/details.vue";
import Checkout from "@/views/Checkout.vue";
import Cancelled from "@/views/cancelled.vue";
import Success from "@/views/success.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
    },

    {
      path: "/men",
      name: "men",
      component: Men,
    },

    {
      path: "/women",
      name: "women",
      component: Women,
    },

    {
      path: "/jewelries",
      name: "jewelries",
      component: Jewelries,
    },

    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/electronics",
      name: "electronics",
      component: Electronics,
    },

    {
      path: "/details/:id",
      name: "detailsPage",
      component: details,
    },

    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout,
    },

    {
      path: "/success",
      name: "Success",
      component: Success,
    },

    {
      path: "/cancelled",
      name: "Cancelled",
      component: Cancelled,
    },
  ],
});

export default router;
