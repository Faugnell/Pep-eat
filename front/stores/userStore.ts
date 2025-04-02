import { defineStore } from 'pinia';

type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    city: string,
    postalCode: string,
    address: string,
    phone: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo : {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            city: '',
            postalCode: '',
            address: '',
            phone: '',
        } as User,
        connected: false
    }),
    getters: {
        getId: (state) => () => state.userInfo.id,
        getFirstName: (state) => () => state.userInfo.firstName,
        getEmail: (state) => () => state.userInfo.email,
        getRole: (state) => () => state.userInfo.role,
        isAdmin: (state) => () => state.userInfo.role === 'admin',
        isConnected: (state) => () => state.connected,
    },
    actions: {
        setUserInfo({ id, firstName, lastName, email, role, city, postalCode, address, phone } : User) {
            this.userInfo.id = id;
            this.userInfo.firstName = firstName;
            this.userInfo.lastName = lastName;
            this.userInfo.email = email;
            this.userInfo.role = role;
            this.userInfo.city = city;
            this.userInfo.postalCode = postalCode;
            this.userInfo.address = address;
            this.userInfo.phone = phone;
            this.connected = true;
        },
        clearUserInfo() {
            this.userInfo.id = '';
            this.userInfo.firstName = '';
            this.userInfo.lastName = '';
            this.userInfo.email = '';
            this.userInfo.role = '';
            this.userInfo.city = '';
            this.userInfo.postalCode = '';
            this.userInfo.address = '';
            this.userInfo.phone = '';
            this.connected = false;
        },
        /* Permet de rendre le code plus lisible dans les composants souhaitant déconnecter l'utilisateur */
        disconnectUser() {
            this.clearUserInfo();
        }
    }
});