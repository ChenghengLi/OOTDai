<template>
    <main-header />
    <sub-header
        heading="Checkout"
        subHeading="Complete your order by filling the form below"
    />
    <section>
        <div class="container">
            <div class="coupon">
                <input type="text" placeholder="Enter your coupon code" />
                <action-button>Apply</action-button>
            </div>
            <form class="billing-info" @submit.prevent="placeOrder">
                <div class="form">
                    <!-- Billing Address -->
                    <div class="form-section">
                        <h4 @click="toggleSection(1)">Billing Address</h4>
                        <div
                            class="collapsible-content"
                            :class="{ active: step === 1 }"
                            :style="step === 1 ? { maxHeight: '1000px' } : { maxHeight: '0' }"
                        >
                            <div class="form-group">
                                <div class="form-control">
                                    <label>First Name *</label>
                                    <input type="text" required v-model="firstName" />
                                </div>
                                <div class="form-control">
                                    <label>Last Name *</label>
                                    <input type="text" required v-model="lastName" />
                                </div>
                            </div>
                            <div class="form-control">
                                <label>Country *</label>
                                <input type="text" required v-model="userCountry" />
                            </div>
                            <div class="form-control">
                                <label>Street Address *</label>
                                <input
                                    type="text"
                                    required
                                    v-model="userStreetAddress"
                                />
                            </div>
                            <div class="form-group">
                                <div class="form-control">
                                    <label>Town / City *</label>
                                    <input type="text" required v-model="userCity" />
                                </div>
                                <div class="form-control">
                                    <label>State / County *</label>
                                    <input type="text" required v-model="userState" />
                                </div>
                                <div class="form-control">
                                    <label>Zip Code *</label>
                                    <input type="text" v-model="mailingZip" required />
                                </div>
                            </div>
                            <div class="form-control">
                                <label>Email Address *</label>
                                <input type="email" required v-model="userEmail" />
                            </div>
                            <div class="form-control">
                                <label>Order Notes (optional)</label>
                                <textarea
                                    rows="10"
                                    placeholder="Notes about your order, e.g. special notes for delivery"
                                    v-model="orderNotes"
                                ></textarea>
                            </div>
                            <button type="button" class="submit" @click="goToNextStep(2)">Next</button>
                        </div>
                    </div>

                    <!-- Mailing Address -->
                    <div class="form-section">
                        <h4 @click="toggleSection(2)">Mailing Address</h4>
                        <div
                            class="collapsible-content"
                            :class="{ active: step === 2 }"
                            :style="step === 2 ? { maxHeight: '1000px' } : { maxHeight: '0' }"
                        >
                            <div class="form-group">
                                <div class="form-control">
                                    <label>First Name *</label>
                                    <input type="text" v-model="mailingFirstName" required />
                                </div>
                                <div class="form-control">
                                    <label>Last Name *</label>
                                    <input type="text" v-model="mailingLastName" required />
                                </div>
                            </div>
                            <div class="form-control">
                                <label>Country *</label>
                                <input type="text" v-model="mailingCountry" required />
                            </div>
                            <div class="form-control">
                                <label>Street Address *</label>
                                <input
                                    type="text"
                                    v-model="mailingStreetAddress"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <div class="form-control">
                                    <label>Town / City *</label>
                                    <input type="text" v-model="mailingCity" required />
                                </div>
                                <div class="form-control">
                                    <label>State / County *</label>
                                    <input type="text" v-model="mailingState" required />
                                </div>
                                <div class="form-control">
                                    <label>Zip Code *</label>
                                    <input type="text" v-model="mailingZip" required />
                                </div>
                            </div>
                            <button type="button" class="submit" @click="goToNextStep(3)">Next</button>
                        </div>
                    </div>

                    <!-- Payment -->
                    <div class="form-section">
                        <h4 @click="toggleSection(3)">Payment</h4>
                        <div
                            class="collapsible-content"
                            :class="{ active: step === 3 }"
                            :style="step === 3 ? { maxHeight: '1000px' } : { maxHeight: '0' }"
                        >
                            <form id="payment-form">
                                <div id="payment-element">
                                    <!-- A Stripe Element will be inserted here. -->
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <aside>
                    <h4>Your Order</h4>
                    <table class="table table-summary">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total (NGN)</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in cart" :key="index">
                                <td>
                                    <span>{{ item.name }}</span> <br />
                                    Size: {{ item.size }} <br />
                                    Qty: {{ item.quantity }}
                                </td>
                                <td>
                                    {{ item.price.toFixed(2) }}
                                </td>
                            </tr>

                            <tr class="summary-subtotal">
                                <td>Subtotal (NGN):</td>
                                <td>{{ subtotal.toFixed(2) }}</td>
                            </tr>
                            <!-- End .summary-subtotal -->
                            <tr>
                                <td>Shipping:</td>
                                <td>Free shipping</td>
                            </tr>
                            <tr class="summary-total">
                                <td>Total (NGN):</td>
                                <td>
                                    {{ subtotal.toFixed(2) }}
                                </td>
                            </tr>
                            <!-- End .summary-total -->
                        </tbody>
                    </table>
                    <button class="submit" :class="{ payment: !noOrder }">
                        <template v-if="noOrder">
                            <span>Place Order</span>
                            <div class="icon">
                                <i class="fa fa-credit-card"></i>
                            </div>
                        </template>
                        <button-preloader v-else />
                    </button>
                </aside>
            </form>
        </div>
    </section>
    <success-modal
        @close-modal="closeModal"
        :price="this.price"
        :email="this.userEmail"
        :reference="referenceMessage"
        :orderNum="this.orderNumber"
        v-if="showModal"
    />
    <main-footer />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import ButtonPreloader from "@/components/preloaders/ButtonPreloader.vue";
import SubHeader from "@/components/SubHeader.vue";
import ActionButton from "@/components/ActionButton.vue";
import SuccessModal from "@/components/SuccessModal.vue";

import { mapState, mapGetters } from "vuex";
import axios from "axios";

// Firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth, db, functions, httpsCallable} from "@/firebase/init";
import { collection, addDoc } from "firebase/firestore";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
 
export default {
    data() {
        return {
            step: 1,
            noOrder: true,
            firstName: "",
            lastName: "",
            userCountry: "",
            userState: "",
            userCity: "",
            userStreetAddress: "",
            postal_code: "",
            phone_number: "",
            referenceMessage: "",
            price: "",
            total: "",
            showModal: false,
            userEmail: "",
            orderNotes: "",
            userDetails: {
                displayName: null,
                email: null,
            },
            orderPaid: false,
            stripe_pk: process.env.STRIPE_PK,
            stripe: null,
            elements: null,
            cardElement: null,
            paymentElement: null,
            clientSecret: null,
            orderId: null,
            orderNumber: null,
            loading: false,
            showMailingAddress: false,
            loggedInEmail: ""
        };
    },
    components: {
        MainHeader,
        MainFooter,
        ButtonPreloader,
        SubHeader,
        ActionButton,
        SuccessModal,
    },
    computed: {
        ...mapState(["user", "cart"]),
        ...mapGetters(["subtotal"]),
    },
    methods: {
        toggleSection(section) {
            this.step = this.step === section ? 0 : section;
        },
        goToNextStep(nextStep) {
            this.step = nextStep;
        },
        async placeOrder() {
            this.noOrder = false;
            try {
                const billingDetails = {
                    address: {
                        city: this.userCity,
                        country: this.userCountry,
                        line1: this.userStreetAddress,
                        line2: null,
                        postal_code: this.postal_code,
                        state: this.userState
                    },
                    email: this.email,
                    name: this.firstName + " " + this.lastName,
                    phone: this.phone_number
                };

                const { error, paymentIntent } = await this.stripe.confirmPayment({
                        elements: this.elements,
                        confirmParams: {
                            return_url: 'http://localhost:8080/'
                        },
                        redirect: "if_required",
                    });

                const now = new Date();

                const orderData = {
                    order: this.cart,
                    name: this.firstName + " " + this.lastName,
                    total: this.subtotal.toFixed(2),
                    address: {
                        state: this.userState,
                        streetAddress: this.userStreetAddress,
                        city: this.userCity,
                        state: this.userState,
                        country: this.userCountry
                    },
                    emailAddress: this.userEmail,
                    accountEmail: this.loggedInEmail,
                    orderPaid: this.orderPaid,
                    timeOrdered: now.toString(),
                };

                if (error) {
                    console.error("Payment confirmation error:", error.message);
                } else if (paymentIntent && paymentIntent.status === "succeeded") {
                    console.log("Payment successful!");
                    orderData.orderPaid = true;
                    const ordersCollection = collection(db, "orders");
                    const docRef = await addDoc(ordersCollection, orderData);

                    if (docRef.id) {
                      this.noOrder = true;
                      this.showModal = true;
                      this.price = this.subtotal.toFixed(2);
                      this.orderNumber = docRef.id;
                      console.log("Document written with ID: ", docRef.id);
                    }
                }
            }
            catch (error) {
                console.error("Error during payment:", error);
            }
        },
        async createPaymentIntent() {
            try {
                console.log("Card Element: ", this.paymentElement)
                // Call the backend function with the order data and total amount
                const response = await axios.post('http://127.0.0.1:5001/myoxytocin000-e3049/us-central1/createStripePayment', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    totalAmount: this.subtotal,  // Amount in cents (Stripe expects it in cents)
                });


                if (response.data.success == true) {
                    console.log("Client secret returned ", response.data.client_secret);
                    return response.data.client_secret;
                } else {
                    console.error("Payment creation failed:", response.data.error);
                }
            } catch (error) {
                console.error("Error calling createPayment:", error);
            }
        },
        closeModal() {
            this.showModal = false;
        },
    },
    mounted() {
        // Handle authentication state
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("logged in");
                this.loggedInEmail = user.email;
            } else {
                console.log("not logged in");
            }
        });

        // Load Stripe instance and configure PaymentElement
        (async () => {
            try {
                // Load the Stripe instance asynchronously
                this.stripe = await loadStripe("pk_test_51OzJwUBkDGtaNC4Pb5KNRWcaVWgimu84WBJVJoWRJ1uEzsO133xneQhEnBMZdlzpVoRjrckVPI227TLTAj7BkRoG00aktLitm1");

                const stripe = await this.stripe;

                // Define the appearance options for the PaymentElement
                const appearance = {
                    theme: 'flat',
                    variables: {
                        colorPrimary: '#5469d4',
                    },
                };

                // Define layout options for the PaymentElement
                const options = {
                    layout: {
                        type: 'accordion',
                        defaultCollapsed: false,
                        radios: false,
                        spacedAccordionItems: true,
                    },
                };

                // Fetch the client secret from your backend
                const clientSecret = await this.createPaymentIntent();

                // Create Stripe elements with the clientSecret and appearance options
                this.elements = stripe.elements({ clientSecret, appearance });

                // Create the PaymentElement
                this.paymentElement = this.elements.create('payment', options);

                // Mount the PaymentElement into the DOM
                this.paymentElement.mount('#payment-element');
            } catch (error) {
                console.error("Error initializing Stripe or PaymentElement:", error);
            }
        })();
    }

    };
</script>

<style scoped>
#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

#card-element {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}

.coupon {
    display: flex;
    gap: 15px;
}

.billing-info {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 15px;
    width: 100%;
}

.billing-info h4 {
    margin-bottom: 15px;
}

.form {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

form input,
form textarea {
    border-radius: 0px;
    padding: 0px;
}

.form-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.form-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

label {
    font-size: 1.5rem;
}

.form-control input,
.form-control textarea {
    padding: 10px 12px;
    outline: none;
    transition: 0.25s;
    background-color: whitesmoke;
    width: 100%;
}

textarea {
    resize: vertical;
}

.form-control input:focus,
.form-control textarea:focus {
    border: 1px solid var(--dim-blue);
    background-color: white;
}

aside {
    flex: 1;
    padding: 25px;
    border: 1px dashed lightgray;
    background-color: whitesmoke;
    height: auto;
}

aside h4 {
    padding-bottom: 20px;
    border-bottom: 1px solid black;
}

table {
    border-collapse: collapse;
    width: 100%;
}

.table.table-summary thead th,
.table.table-summary .summary-subtotal td {
    color: var(--brown);
    font-weight: 500;
    font-size: 1.6rem;
}

.table.table-summary thead th:last-child,
.table.table-summary tbody td:last-child {
    text-align: right;
    min-width: 90px;
}
table thead tr th {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 400;
}

table tbody tr td {
    font-size: 1.6rem;
    font-weight: 400;
}

.table.table-summary tbody td {
    padding: 0;
    height: 70px;
    border-bottom: 0.1rem solid #ebebeb;
}

.table.table-summary .summary-total td {
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--dim-blue);
    border-bottom: none;
}

table tbody tr td span {
    width: 150px;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 10px;
}

.submit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    font-size: 1.6rem;
    width: 100%;
    color: var(--dim-blue);
    background-color: transparent;
    border-radius: 0px;
    border: 1px solid var(--dim-blue);
}

.icon {
    position: absolute;
    right: 20px;
}

.submit:hover,
.submit:focus,
.submit:active,
.payment {
    background-color: var(--dim-blue);
    color: white;
}

.submit:nth-child(2) {
    display: none;
}

.submit:hover:nth-child(1),
.submit:focus:nth-child(1) {
    display: none;
}

@media (max-width: 790px) {
    .billing-info,
    .form-group {
        flex-direction: column;
        width: 100%;
    }
    aside,
    .form {
        width: 100%;
    }
    table tbody tr td span {
        width: 100%;
        white-space: break-spaces;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.form-section {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 25px;
}

.form-section h4 {
    cursor: pointer;
    margin-bottom: 10px;
}

.collapsible-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s ease-in-out;
}

.collapsible-content.active {
    padding: 10px 0;
}

.form-control {
    margin-bottom: 15px;
}
</style>
