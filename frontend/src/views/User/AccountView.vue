<template>
  <main-header />
  <section>
    <div class="account-page">
      <h1>My Account</h1>

    <!-- Profile Info Section -->
    <section class="profile-info">
      <h3>Profile Information</h3>
      <div v-if="user" class="profile-card">
        <div class="profile-info-row">
          <strong>Email:</strong> <span>{{ user.email }}</span>
        </div>
        <div class="profile-info-row">
          <strong>Name:</strong> <span>{{ user.displayName || "Not provided" }}</span>
        </div>
      </div>
      <p v-else>Loading user info...</p>
    </section>

    <!-- Past Orders Section -->
    <section class="past-orders">
      <h3>Past Orders</h3>
      <div v-if="loadingOrders">
        <p>Loading orders...</p>
      </div>
      <div v-else-if="orders.length === 0">
        <p>You have no past orders.</p>
      </div>
      <div v-else>
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td @click="openOrderDetails(order)">{{ order.id }}</td>
              <td>{{ order.timeOrdered ? new Date(order.timeOrdered).toLocaleDateString() : "No date available" }}</td>
              <td>${{ parseFloat(order.total).toFixed(2) }}</td>
              <td>
                <ul>
                  <li v-for="item in order.order" :key="item.name">
                    {{ item.quantity }} x {{ item.name }} (${{ parseFloat(item.price).toFixed(2) }})
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal for displaying order details -->
    <div v-if="showOrderModal" class="order-popup-overlay" @click.self="closeOrderDetails">
      <div class="order-popup">
        <span class="close-btn" @click="closeOrderDetails">&times;</span>
          <h3>Order Details - {{ selectedOrder.id }}</h3>

          <!-- Loop through each order and make the details collapsible -->
          <div v-for="(orderElement, index) in selectedOrder.order" :key="index">
            <p><strong>Name:</strong> {{ selectedOrder.name }}</p>
            <p><strong>Email:</strong> {{ selectedOrder.emailAddress }}</p>
            <p><strong>Address:</strong> {{ selectedOrder.address.streetAddress }}, {{ selectedOrder.address.city }}, {{ selectedOrder.address.state }}, {{ selectedOrder.address.country }}</p>

            <!-- Collapsible Order Details -->
            <div class="order-section">
              <h4 @click="toggleOrderDetails(index)">
                Order {{ index + 1 }}
              </h4>
              <div
                class="collapsible-content"
                :class="{ active: !collapsedOrders[index] }"
                :style="!collapsedOrders[index] ? { maxHeight: '1000px' } : { maxHeight: '0' }"
              >
                <p><strong>Profile:</strong> {{ orderElement.profile }}</p>
                <p><strong>Product:</strong> {{ orderElement.product }}</p>
                <p><strong>Control Type:</strong> {{ orderElement.controlType }}</p>
                <p><strong>Pet Name:</strong> {{ orderElement.petName }}</p>
                <p><strong>Pet Species:</strong> {{ orderElement.petSpecies }}</p>
                <p><strong>Comments:</strong> {{ orderElement.comments }}</p>
                <p><strong>Instagram:</strong> {{ orderElement.insta }}</p>
                <p><strong>Currency:</strong> {{ orderElement.currency }}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </section>
  <main-footer />
</template>


<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/init";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      user: null,
      orders: [], 
      loadingOrders: true, 
      loggedInEmail: null, 
      showOrderModal: false, 
      selectedOrder: null, 
      collapsedOrders: [],
    };
  },
  methods: {
    openOrderDetails(order) {
      this.selectedOrder = order;
      this.collapsedOrders = order.order.map(() => true);
      this.showOrderModal = true;
    },
    closeOrderDetails() {
      this.showOrderModal = false;
      this.selectedOrder = null; 
    },
    toggleOrderDetails(index) {
      this.collapsedOrders[index] = !this.collapsedOrders[index]; 
    },
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        this.loggedInEmail = user.email;

        this.user = {
          email: user.email,
          displayName: user.displayName || "Not provided",
        };

        try {
          const ordersQuery = query(
            collection(db, "orders"),
            where("accountEmail", "==", user.email)
          );
          const querySnapshot = await getDocs(ordersQuery);
          this.orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      } else {
        console.log("not logged in");
        this.user = null;
      }
      this.loadingOrders = false;
    });
  },
};
</script>

<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.profile-info, .past-orders {
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.profile-info {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-info h3 {
  margin-bottom: 15px;
  text-align: left;
}

.profile-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-info-row {
  margin-bottom: 10px;
}

.profile-info-row strong {
  font-weight: bold;
}

.profile-info-row span {
  margin-left: 10px;
  color: #555;
}


.past-orders {
  margin: 2rem 0;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.orders-table th,
.orders-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.orders-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.orders-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.orders-table tr:hover {
  background-color: #f1f1f1;
}

.orders-table td ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.orders-table td ul li {
  margin: 0.5rem 0;
}

.orders-table td {
  vertical-align: top;
}

.order-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.order-popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.close-btn:hover {
  color: #333;
}

.order-popup h3 {
  margin-top: 0;
}

.order-popup {
  background-color: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-popup {
  background-color: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.collapsible-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease-in-out;
}

.collapsible-content.active {
  padding: 10px 0;
}

.order-section {
  border: 1px solid #ddd;
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #fff;
}

.order-section h4 {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
}
</style>