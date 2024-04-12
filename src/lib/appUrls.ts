export const appUrls = {
  auth: {
    login: "/login",
  },
  admin: "/admin",
  userDetails: (gymId: string, userId: string) => `/${gymId}/${userId}`,
  measurements: {
    new: "/admin/measurements/new",
  },
  user: {
    my_profile: "/my-profile",
  },
  privacyPolicy: "/politica-de-privacidad",
  termsAndConditions: "/terminos-y-condiciones",
  contact: "/contacto",
  changePassword: "/change-password",
};
