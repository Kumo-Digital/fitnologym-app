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
    edit: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    changePassword: (id: string) => `/users/change-password/${id}`,
    saveLastLoggedInDate: (id: string) => `/users/save-last-logged-in-date/${id}`,
  },
  gyms: {
    get: "/gyms",
    getById: (id: string) => `/gyms/${id}`,
    create: "/gyms",
    edit: (id: string) => `/gyms/${id}`,
    delete: (id: string) => `/gyms/${id}`,
  },
  measurements: {
    get: "/measurements",
    getMeasurement: (id: string) => `/measurements/get-measurement/${id}`,
    getLastMeasureByUser: (id: string) =>
      `/measurements/get-last-measure-by-user/${id}`,
    getFirstMeasureByUser: (id: string) =>
      `/measurements/get-first-measure-by-user/${id}`,
    getAllMeasurementsByUser: (id: string) =>
      `/measurements/get-all-measurements-by-user/${id}`,
    create: "/measurements",
    update: "/measurements",
    getEvolution: (id: string) => `/measurements/get-evolution/${id}`,
    getEvolutionFromFirstToLast: (id: string) => `/measurements/get-evolution-from-first-to-last/${id}`,
  },
  metrics: {
    get: (filters: string) => `/metrics?${filters}`,
  },
};
