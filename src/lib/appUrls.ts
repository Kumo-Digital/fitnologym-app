export const appUrls = {
  auth: {
    login: "/login",
  },
  admin: "/admin",
  userDetails: (gymId: string, userId: string) => `/${gymId}/${userId}`,
  measurements: {
    new: "/admin/measurements/new",
    edit: (id: string) => `/admin/measurements/edit/${id}`,
  },
  user: {
    my_profile: "/my-profile",
  },
  privacyPolicy: "/politica-de-privacidad",
  termsAndConditions: "/terminos-y-condiciones",
  contact: "/contacto",
  changePassword: "/change-password",
};
