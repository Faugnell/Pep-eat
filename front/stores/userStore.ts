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
    phone: string,
    referral_link: string,
    is_suspended: boolean
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
            referral_link: '',
            is_suspended: false
        } as User,
        connected: false
    }),
    getters: {
        getId: (state) => () => state.userInfo.id,
        getFirstName: (state) => () => state.userInfo.firstName,
        getLastName: (state) => () => state.userInfo.lastName,
        getEmail: (state) => () => state.userInfo.email,
        getRole: (state) => () => state.userInfo.role,
        getCity: (state) => () => state.userInfo.city,
        getPostalCode: (state) => () => state.userInfo.postalCode,
        getAdress: (state) => () => state.userInfo.address,
        getPhone: (state) => () => state.userInfo.phone,
        getReferralLink: (state) => () => state.userInfo.referral_link,
        isSuspended: (state) => () => state.userInfo.is_suspended,
        isAdmin: (state) => () => state.userInfo.role === 'admin',
        isConnected: (state) => () => state.connected,
    },
    actions: {
        setUserInfo({ id, firstName, lastName, email, role, city, postalCode, address, phone, referral_link, is_suspended } : User) {
            this.userInfo.id = id;
            this.userInfo.firstName = firstName;
            this.userInfo.lastName = lastName;
            this.userInfo.email = email;
            this.userInfo.role = role;
            this.userInfo.city = city;
            this.userInfo.postalCode = postalCode;
            this.userInfo.address = address;
            this.userInfo.phone = phone;
            this.userInfo.referral_link = referral_link;
            this.userInfo.is_suspended = is_suspended;
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
            this.userInfo.referral_link = '';
            this.userInfo.is_suspended = false;
            this.connected = false;
        },
        /* Permet de rendre le code plus lisible dans les composants souhaitant déconnecter l'utilisateur */
        disconnectUser() {
            this.clearUserInfo();
        }
    }
});