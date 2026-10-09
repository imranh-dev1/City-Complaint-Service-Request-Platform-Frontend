export const superAdminRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/super-admin",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/super-admin/users",
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "Departments",
        url: "/super-admin/departments",
      },
      {
        title: "Create Department",
        url: "/super-admin/departments/create-department",
      },
      {
        title: "Assign Technician to Department",
        url: "/super-admin/departments/assign-technician-to-department",
      },
    ],
  },
  {
    title: "Categories",
    items: [
      {
        title: "Categories",
        url: "/super-admin/categories",
      },
    ],
  },
  {
    title: "Complaints",
    items: [
      {
        title: "All Complaints",
        url: "/super-admin/complaints",
      },
      {
        title: "Assigned Complaints",
        url: "/super-admin/complaints/assigned",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        title: "All Payments",
        url: "/super-admin/payments",
      },
      {
        title: "Refunds",
        url: "/super-admin/payments/refunds",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Audit Logs",
        url: "/super-admin/audit-logs",
      },
      {
        title: "Notifications",
        url: "/super-admin/notifications",
      },
    ],
  },
];
