export const Roles = {
  ADMIN: "ADMIN",
  OFFICER: "PANCHAYAT_OFFICER",
  CITIZEN: "CITIZEN"
};

export const isAdminOrOfficer = (role) => [Roles.ADMIN, Roles.OFFICER].includes(role);
