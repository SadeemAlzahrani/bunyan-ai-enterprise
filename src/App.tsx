import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import SiteLayout from "@/components/site/SiteLayout";
import AppShell from "@/components/app/AppShell";

import Home from "@/pages/site/Home";
import Solutions from "@/pages/site/Solutions";
import Security from "@/pages/site/Security";
import Pricing from "@/pages/site/Pricing";
import Contact from "@/pages/site/Contact";
import RequestDemo from "@/pages/site/RequestDemo";
import Login from "@/pages/auth/Login";

import SuperAdminDashboard from "@/pages/admin/SuperAdminDashboard";
import CompanyWorkspace from "@/pages/company/CompanyWorkspace";
import ProjectsDashboard from "@/pages/projects/ProjectsDashboard";
import EngineerDashboard from "@/pages/engineer/EngineerDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public marketing site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/security" element={<Security />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-demo" element={<RequestDemo />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Super Admin */}
          <Route
            element={
              <AppShell
                expectedRole="super_admin"
                workspaceName="Bunyan Platform"
                navItems={[
                  { to: "/admin", label: "Overview" },
                  { to: "/admin", label: "Tenants" },
                  { to: "/admin", label: "Users" },
                  { to: "/admin", label: "Audit" },
                  { to: "/admin", label: "Settings" },
                ]}
              />
            }
          >
            <Route path="/admin" element={<SuperAdminDashboard />} />
          </Route>

          {/* Company Admin */}
          <Route
            element={
              <AppShell
                expectedRole="company_admin"
                workspaceName="NorthBuild Construction"
                navItems={[
                  { to: "/workspace", label: "Overview" },
                  { to: "/workspace", label: "Team" },
                  { to: "/workspace", label: "Projects" },
                  { to: "/workspace", label: "Compliance" },
                  { to: "/workspace", label: "Settings" },
                ]}
              />
            }
          >
            <Route path="/workspace" element={<CompanyWorkspace />} />
          </Route>

          {/* Project Manager */}
          <Route
            element={
              <AppShell
                expectedRole="project_manager"
                workspaceName="NorthBuild Construction"
                navItems={[
                  { to: "/projects", label: "Dashboard" },
                  { to: "/projects", label: "Projects" },
                  { to: "/projects", label: "Risks" },
                  { to: "/projects", label: "Reports" },
                ]}
              />
            }
          >
            <Route path="/projects" element={<ProjectsDashboard />} />
          </Route>

          {/* Project Engineer */}
          <Route
            element={
              <AppShell
                expectedRole="project_engineer"
                workspaceName="NorthBuild Construction"
                navItems={[
                  { to: "/engineer", label: "My Queue" },
                  { to: "/engineer", label: "Evaluations" },
                  { to: "/engineer", label: "Findings" },
                  { to: "/engineer", label: "Reports" },
                ]}
              />
            }
          >
            <Route path="/engineer" element={<EngineerDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
