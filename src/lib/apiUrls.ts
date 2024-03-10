export const API_URL_V1 = "api/v1";

export const apiUrls = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
  },
  users: {
    get: "/users",
    getAllUsersButAdmins: "/users/getAllUsersButAdmins",
    getById: (id: string) => `/users/${id}`,
    create: "/users",
  },
  gyms: {
    get: "/gyms",
    getById: (id: string) => `/gyms/${id}`,
    create: "/gyms",
  },
  measurements: {
    get: "/measurements",
    getLastMeasureByUser: (id: string) =>
      `/measurements/get-last-measure-by-user/${id}`,
    create: "/measurements",
  },
};
