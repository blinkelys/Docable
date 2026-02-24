import {
  createRouter,
  createWebHistory, // Changed from memory history for standard web use
  type RouteRecordRaw,
} from "vue-router";
import api from "./api";

import HomeView from "./pages/Home.vue";
import DocView from "./pages/doc/[id].vue";
import LoginView from "./pages/Login.vue";

const routes: RouteRecordRaw[] = [
  // Fixed: meta syntax uses ":" not "="
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/doc/:id', component: DocView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
];

export const router = createRouter({
  // Fixed: Use createWebHistory (or createWebHashHistory) for browser apps
  history: createWebHistory(), 
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("GUARD START for:", to.path);

  // Use .some() to check all nested levels of the route
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log("Requires Auth?", requiresAuth);

  if (!requiresAuth) {
    console.log("No auth required, letting through...");
    return next();
  }

  try {
    console.log("Fetching user from API...");
    const res = await api.get("/auth/me");
    
    if (res.data) {
      console.log("User authenticated:", res.data);
      next(); 
    } else {
      console.warn("No user data, redirecting to login");
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } catch (err) {
    console.error("Auth request failed:", err);
    next({ path: "/login", query: { redirect: to.fullPath } });
  }
});