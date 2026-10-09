export const adminRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "Departments",
        url: "/admin/departments",
      },
      {
        title: "Create Department",
        url: "/admin/departments/create-department",
      },
      {
        title: "Assign Technician to Department",
        url: "/admin/departments/assign-technician-to-department",
      },
    ],
  },
  {
    title: "Categories",
    items: [
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
  {
    title: "Complaints",
    items: [
      {
        title: "All Complaints",
        url: "/admin/complaints",
      },
      {
        title: "Assigned Complaints",
        url: "/admin/complaints/assigned",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        title: "All Payments",
        url: "/admin/payments",
      },
      {
        title: "Refunds",
        url: "/admin/payments/refunds",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Audit Logs",
        url: "/admin/audit-logs",
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
      },
    ],
  },
];
