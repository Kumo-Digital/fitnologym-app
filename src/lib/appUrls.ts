export const appUrls = {
  admin: "/admin",
  userDetails: (gymId: string, userId: string) => `/${gymId}/${userId}`,
  measurements: {
    new: "/admin/measurements/new",
  },
};
