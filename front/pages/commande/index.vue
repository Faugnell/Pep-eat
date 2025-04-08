<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { usePanierStore } from '~/stores/panierStore';
import type { fetchedDataType as commandeFetch } from '../../server/api/commandes/index.post';
import type { fetchedDataType as livraisonFetch } from '../../server/api/livraison/index.post';

/* -------------------------------------------------------------------------
--------------------------------- STORES -----------------------------------
------------------------------------------------------------------------- */

//  ---- Articles ----
const { 
    getArticles,
    getNombreArticles,
    getPrixTotal ,
} = usePanierStore();



const articles = computed(() => getArticles());
const nombreArticles = computed(() => getNombreArticles());
const prixTotal = computed(() => getPrixTotal());


//  ---- Utilisateur ----
const {
    getId,
    isConnected
} = useUserStore();

const userId = computed<string>(() => getId());
const userConnected = computed<boolean>(() => isConnected())

/* -------------------------------------------------------------------------
------------------------------- VARIABLES ----------------------------------
------------------------------------------------------------------------- */

const router = useRouter()
const stepper = useTemplateRef('stepper')

const prixTotalFormat = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotal.value)

const tabs: StepperItem[] = [
    { slot: "recapitulatif", title: "Récapitulatif", description: "Résumé de la commande", icon: "i-lucide-shopping-cart" },
    { slot: "informations", title: "Informations", description: "Informations de livraison", icon: "i-lucide-house" },
    { slot: "paiement", title: "Paiement", description: "Informations de paiement", icon: "i-lucide-credit-card" },
    { slot: "finalisation", title: "Finalisation", description: "Valider votre commande", icon: "i-lucide-check" }
]

// TODO: Ajouté un champ pour le code promotions
const promotions = <Array<string>>[]

const adress_number: Ref<number | undefined> = ref();
const adress_street: Ref<string> = ref('');
const adress_complementary: Ref<string> = ref('');
const postal_code: Ref<number | undefined> = ref();
const city: Ref<string> = ref('');
const phone: Ref<string> = ref('');
const order_information: Ref<string> = ref('');

const numCard: Ref<string> = ref('');
const dateExpiration: Ref<string> = ref('');
const cryptogramme: Ref<string> = ref('');

const paymentMessageVisible: Ref<boolean> = ref(false);
const paymentErrorVisible: Ref<boolean> = ref(false);

/* -------------------------------------------------------------------------
------------------------------- FONCTIONS ----------------------------------
------------------------------------------------------------------------- */

//* TODO: Création de la commandes avec retour de l'id
//* TODO:  Utiliser ll'id retourné à la création pour créer la livraison
// const { data } = await $fetch<Response<Array<Restaurant>>>(`/api/restaurants/${restaurantId}`);

const createCommand = async () => {
    const billing_details = articles.value.map((article) => 
        ({
            quantity: article.quantity,
            article_data: {
                article_id: article.id,
                name: article.name,
                price: article.price
            }
        })
    )
    return await $fetch<commandeFetch>(`/api/commandes/`, {
        method: "POST",
        body: {
            user_id: userId.value,
            restaurant_id: "67e65ad6224030298c111dcc",
            billing_details: billing_details,
            date: new Date(),
            price: prixTotal.value,
            promotions: promotions,
            status: "en cours",
            comment: "Est ce que ca marche"
        }
    });
}

const createLivraison = async (orderId:string) => {
    const newLivraison = await $fetch<livraisonFetch>(`/api/livraison/`, {
        method: "POST",
        body: {
            order_id: orderId,
            restaurant_id: "65e63d6242030298c111dccb",      // TEST
            user_id: userId.value,
            status: "Prise en charge de la commande.",
            address_number: adress_number.value,
            address_street: adress_street.value,
            postal_code: postal_code.value,
            city: city.value,
            phone: phone.value,
            order_information: "OUFEHIOFISHDFKIHSBDFIHBSQFIHSDOGHDSOUHOHb",
        }
    });
    return newLivraison
}

const completePayment = async (): Promise<void> => {
    if (!numCard.value || !dateExpiration.value || !cryptogramme.value) {
        paymentErrorVisible.value = true;
        paymentMessageVisible.value = false;
    } else {
        paymentMessageVisible.value = true;
        paymentErrorVisible.value = false;
        try {
            const newCommande = await createCommand()
            // if(!newCommande.ok){
            //     throw new Error("Erreur lors de la création de la commande")
            // }
            // const response = await fetch('http://localhost:3105/livraisons', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         order_id: "65e63d6242030298c111dcca",           // TEST
            //         restaurant_id: "65e63d6242030298c111dccb",      // TEST
            //         user_id: "65e63d6242030298c111dccc",            // TEST

            //         status: "Prise en charge de la commande.",
            //         address_number: adress_number.value,
            //         address_street: adress_street.value,
            //         postal_code: postal_code.value,
            //         city: city.value,
            //         phone: phone.value,
            //         order_information: order_information.value,
            //     }),
            // });
            const response = await createLivraison(newCommande?.data._id)

            if (!response.ok && response?.error) {
                console.error('Erreur côté serveur:', response.error);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données:", error);
        }
    }
}
</script>

<template>
    <div class="w-full flex justify-center mt-6">
        <UStepper ref="stepper" :items="tabs" class="w-4/5 xl:w-3/5">

<!-- * =============================================================================================================== -->
<!-- * ==============================================    RECAP COMMANDE    =========================================== -->
<!-- * =============================================================================================================== -->

            <template #recapitulatif>
                <UCard class="w-full min-h-[400px] mt-6">
                    <p class="text-xl font-semibold text-center mb-4">Votre commande</p>
                    <table class="w-full table-auto border-collapse mb-4">
                        <thead>
                            <tr class="text-left border-b">
                                <th class="py-2">Article</th>
                                <th class="py-2">Quantité</th>
                                <th class="py-2">Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="article in articles" :key="article.name" class="border-b">
                                <td class="py-2">{{ article.name }}</td>
                                <td class="py-2">{{ article.quantity }}</td>
                                <td class="py-2">{{ article.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="text-xl font-semibold mt-2">Nombre d'articles : {{ nombreArticles }}</p>
                    <p class="text-xl font-semibold mt-2">Total : {{ prixTotalFormat }}</p>
                </UCard>
            </template>

<!-- * =============================================================================================================== -->
<!-- * ==================================================    ADRESSE   =============================================== -->
<!-- * =============================================================================================================== -->
 
            <template #informations>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex justify-center">
                        <div class="w-full max-w-xl">
                            <p class="text-xl font-semibold mb-6 text-center">Informations de livraison</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <UFormField label="N°" required>
                                    <UInput v-model="adress_number" type="text" placeholder="8" class="w-[200px]" />
                                </UFormField>
                                <UFormField label="Rue" required>
                                    <UInput v-model="adress_street" type="text" placeholder="Rue Isabelle Autissier"
                                        icon="i-lucide-compass" />
                                </UFormField>
                                <UFormField label="Complément (optionnel)">
                                    <UInput v-model="adress_complementary" type="text" placeholder="Bâtiment B, Appt 45"
                                        icon="i-lucide-home" />
                                </UFormField>
                                <UFormField label="Code Postal" required>
                                    <UInput v-model="postal_code" type="text" placeholder="17140"
                                        icon="i-lucide-map-pin" />
                                </UFormField>
                                <UFormField label="city" required>
                                    <UInput v-model="city" type="text" placeholder="Lagord" icon="i-lucide-building" />
                                </UFormField>
                                <UFormField label="Téléphone (pour le livreur)" required>
                                    <UInput v-model="phone" type="tel" placeholder="+33 6 66 66 66 66"
                                        icon="i-lucide-phone" />
                                </UFormField>
                            </div>
                            <div class="mt-6">
                                <UFormField label="Instructions de commande (optionnel)">
                                    <UTextarea class="w-[86%]" v-model="order_information" :rows="3"
                                        placeholder="Indiquez ici les détails importants pour la livraison, les allergies, préférences, etc." />
                                </UFormField>
                            </div>
                        </div>
                    </div>
                </UCard>
            </template>

<!-- * =============================================================================================================== -->
<!-- * =================================================    PAIEMENT   =============================================== -->
<!-- * =============================================================================================================== -->

            <template #paiement>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex flex-col items-center">
                        <div class="flex justify-center mb-6 mt-2 gap-6">
                            <UIcon name="i-ri:visa-line" size="25" />
                            <UIcon name="i-ic:baseline-paypal" size="25" />
                            <UIcon name="i-logos:mastercard" size="25" />
                            <UIcon name="i-cib:american-express" size="25" />
                        </div>
                        <div class="w-full max-w-md p-6">
                            <UFormField class="w-full mb-4" label="Numéro de la carte" required>
                                <UInput v-model="numCard" type="text" class="w-full"
                                    placeholder="**** **** **** ****" />
                            </UFormField>
                            <div class="flex space-x-4 mb-12">
                                <UFormField class="w-1/2" label="Date d'expiration" required>
                                    <UInput v-model="dateExpiration" type="text" placeholder="MM/AA" class="w-full" />
                                </UFormField>
                                <UFormField class="w-1/2" label="Cryptogramme" required>
                                    <UInput v-model="cryptogramme" type="password" placeholder="***" class="w-full" />
                                </UFormField>
                            </div>
                            <UButton label="Payer" color="primary" variant="solid"
                                class="w-full h-full flex items-center justify-center" @click="completePayment" />
                            <div v-if="paymentErrorVisible" class="mt-4 text-center text-red-500">
                                <p>Veuillez remplir tous les champs de paiement pour continuer.</p>
                            </div>
                            <div v-if="paymentMessageVisible" class="mt-4 text-center text-primary-500">
                                <p>Votre paiement a été effectué avec succès !</p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </template>

<!-- * =============================================================================================================== -->
<!-- * ===============================================    FINALISATION   ============================================= -->
<!-- * =============================================================================================================== -->

            <template #finalisation>
                <UCard class="w-full min-h-[400px] mt-6">
                    <div class="flex flex-col items-center text-center">
                        <UIcon name="i-material-symbols:check-circle-rounded" size="175" class="text-primary-500" />
                        <p class="text-2xl font-semibold mb-4">Commande validée avec succès !</p>
                        <p class="text-gray-600 mb-6">Vous recevrez une notification de confirmation sous peu.
                        </p>
                        <div class="flex space-x-4">
                            <UButton label="Retourner à l'accueil" color="primary" variant="outline"
                                @click="router.push('/')" />
                            <UButton label="Suivre la commande" color="primary" variant="solid"
                                @click="router.push(`/commande/avancement`)" />
                        </div>
                    </div>
                </UCard>
            </template>
        </UStepper>
    </div>

<!-- * =============================================================================================================== -->
<!-- * ================================================    NAVIGATION   ============================================== -->
<!-- * =============================================================================================================== -->

    <div class="fixed top-1/2 flex justify-between w-full px-2">
        <UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev" @click="stepper?.prev()"></UButton>
        <UButton trailing-icon="i-lucide-arrow-right" :disabled="!stepper?.hasNext" @click="stepper?.next()"></UButton>
    </div>
</template>