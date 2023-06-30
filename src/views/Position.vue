<script setup>
import Highlight from "@/components/Highlight.vue";
import Rule from "@/components/Rule.vue";
import Code from "@/components/Code.vue";
import Figure from "@/components/Figure.vue";
import Alert from "@/components/Alert.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useTitle } from "@vueuse/core";
import _ from "lodash";

const title = "Position 简易指南";

useTitle(title);

onMounted(() => {
  Prism.highlightAll();
});
</script>
<template>
  <h1>{{ title }}</h1>

  <h2>背景</h2>
  <p>
    position 用于指定一个元素在文档中的定位方式。top，right，bottom，和 left
    属性（下文中使用“位置属性“指代）决定元素出现的位置
  </p>
  <p>
    position
    最常使用的场景，使一个元素出现的位置不占位（不影响其他元素的排版），或元素的位置是基于另一个元素的位置。
  </p>

  <table class="my-5 properties-table">
    <tr>
      <th>属性值</th>
      <th>作用</th>
      <th>是否占位</th>
      <th>特性</th>
    </tr>
    <tr>
      <td>static</td>
      <td>正常的布局行为，此时位置属性无效</td>
      <td>占位</td>
      <td></td>
    </tr>
    <tr>
      <td>relative</td>
      <td>
        相对定位，相对自己本身的位置进行定位，调整前的元素位置依然存在（占位）
      </td>
      <td>占位</td>
      <td></td>
    </tr>
    <tr>
      <td>absolute</td>
      <td>
        绝对定位，元素会被移出正常文档流（不占位），通过指定元素相对于最近的非
        static 定位祖先元素的偏移，来确定元素位置。
      </td>
      <td>不占位</td>
      <td>如果不存在拥有定位的父级，那么会以文档元素作为基准</td>
    </tr>
    <tr>
      <td>fixed</td>
      <td>
        固定定位，元素会被移出正常文档流（不占位），屏幕视口（viewport）的位置来指定元素位置，
      </td>
      <td>不占位</td>
      <td>元素的位置在屏幕滚动时不会改变。</td>
    </tr>
    <tr>
      <td>sticky</td>
      <td>粘性定位，元素会被移出正常文档流（不占位），相对它的最近滚动祖先</td>
      <td>不占位</td>
      <td>滚动时会吸附在滚动容器上</td>
    </tr>
  </table>
  <section class="section">
    <h3></h3>
  </section>
</template>
