export const technicianRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/technician",
      },
    ],
  },

  {
    title: "Complaints",
    items: [
      {
        title: "Assigned Complaints",
        url: "/technician/complaints",
      },
      {
        title: "In Progress",
        url: "/technician/complaints/in-progress",
      },
      {
        title: "Resolved",
        url: "/technician/complaints/resolved",
      },
    ],
  },

  {
    title: "Notifications",
    items: [
      {
        title: "Notifications",
        url: "/technician/notifications",
      },
    ],
  },

  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "/technician/profile",
      },
      {
        title: "Change Password",
        url: "/technician/change-password",
      },
    ],
  },
];
