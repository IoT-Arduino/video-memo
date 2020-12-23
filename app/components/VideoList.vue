<template>
  <ul>
    <li
      v-for="item in result"
      :key="item.id"
      class="mb-3 border list-none rounded-sm"
    >
      <div class="flex hover:bg-green-200">
        <div class="flex-none">
          <img :src="item['fields']['thumbnail']" />
        </div>
        <div class="ml-2 pt-1">
          <nuxt-link
            class="mt-2"
            :to="`/Video/${item.fields.youtubeVideoId}?id=${item.id}?${tableId}`"
          >
            <h3 class="mb-2">{{ item["fields"]["title"] | itemTitle }}</h3>
            <span class="text-indigo-600">Go To Movie Page</span>
            <font-awesome-icon
              :icon="['fas', 'angle-double-right']"
              class="text-indigo-600"
            />
          </nuxt-link>
          <star-rating
            v-bind:increment="0.5"
            v-bind:max-rating="5"
            inactive-color="#ccc"
            active-color="#f9d71c"
            v-bind:star-size="10"
            :rating="parseFloat(item.fields.rating)"
            :show-rating="false"
            read-only
          >
          </star-rating>
        </div>
      </div>
      <p v-if="item.fields.memo" class="m-1 p-1 bg-gray-300">
        {{ item["fields"]["memo"] | itemMemo }}
      </p>
    </li>
  </ul>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  props: ["result","tableId"],
  filters: {
    itemTitle(val) {
      if (val) {
        return `${val.substring(0, 50)}...`;
      } else {
        return;
      }
    },
    itemMemo(val) {
      if (val) {
        return `${val.substring(0, 70)}...`;
      } else {
        return;
      }
    }
  }
};
</script>

<style></style>
