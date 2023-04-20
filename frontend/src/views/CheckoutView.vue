<script setup lang="ts">
  import { Ref, inject, onMounted, ref } from 'vue';
  import axios from "axios";
  import { Order } from '../entities/Order';
  import { Product } from '../entities/Product';
  import { CheckoutGateway, CheckoutOutput } from '../gateway/CheckoutGateway';

  const checkoutGateway = inject("checkoutGateway") as CheckoutGateway;
  const products = ref<Product[]>([]);
  const order = ref(new Order("407.302.170-27"));
  const output = ref<CheckoutOutput>({
    total: 0,
    freight: 0,
  });

  function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-uk", { currency: "GBP", style: "currency"}).format(amount);
  }

  async function checkout(order: Order) {
    output.value = await checkoutGateway.checkout(order);

  }

  onMounted(async () => {
    products.value = await checkoutGateway.getProducts();
  });
</script>

<template>
  <div>
    <div class="title-name">Checkout</div>
    <div class="product" v-for="product in products">
      <div class="product-description">{{ product.description }}</div>
      <div class="product-price">{{ product.getFormattedPrice() }}</div>
      <button class="product-add" @click="order.addItem(product)">Add</button>
    </div>
    <div>
      <div class="total">{{ formatMoney(order.getTotal()) }}</div>
      <div class="order-item" v-for="item in order.items">
        {{ item.productId }} {{ item.getQuantity() }}
      </div>
      <button class="checkout" @click="checkout(order)">Checkout</button>
      <div class="output-total">{{ formatMoney(output.total) }}</div>
      <div class="output-freight">{{ formatMoney(output.freight) }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>
