import axios from 'axios';
const BASE_URL = 'http://localhost:8080';


const request = async (url, method = 'GET', data = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const options = { method, url: `${BASE_URL}${url}`, headers };
    if (data) options.data = data;
    
    const response = await axios(options);
    return response.data;
};


export const api = {
    auth: {
        register: (data) => request('/users/register', 'POST', data),
        login: (data) => request('/users/login', 'POST', data),
    },
    users: {
        getAll: () => request('/users'),
    },
    blogs: {
        create: (data) => request('/blogs', 'POST', data),
        getAll: () => request('/blogs', 'GET'),
    },
    bookings: {
        create: (data, token) => request('/bookings', 'POST', data, token),
        getAll: (token) => request('/bookings', 'GET', null, token),
        getByUser: (id, token) => request(`/bookings/${id}`, 'GET', null, token),
        update: (id, data, token) => request(`/bookings/${id}`, 'PUT', data, token),
        delete: (id, token) => request(`/bookings/${id}`, 'DELETE', null, token),
    },
    contacts: {
        create: (data) => request('/contacts', 'POST', data),
        getAll: () => request('/contacts', 'GET'),
    },
    rooms: {
        create: (data) => request('/rooms', 'POST', data),
        getAll: () => request('/rooms', 'GET'),
    },
    testimonials: {
        create: (data, token) => request('/testimonials', 'POST', data, token),
        getAll: () => request('/testimonials', 'GET'),
    },
    admins: {
        getStats: (token) => request('/admin/stats', 'GET', null, token),
    },
    notifications: {
        subscriptionBlog: (email) => request('/subscription-blog', 'POST', email)
    },
    weather: {
        getWeather: () => request('/clima-ciudad', 'GET')
    }
};
