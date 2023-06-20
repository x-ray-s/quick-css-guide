<script setup>
import Highlight from "./components/Highlight.vue";
import Rule from "./components/Rule.vue";
import Code from "./components/Code.vue";
import { ref, computed, watch } from "vue";
import _ from "lodash";

const isHover = ref(false);

const direction = ref();
const directionValues = ["row", "row-reverse", "column", "column-reverse"];

const tailwindDirection = computed(() => {
  const index = directionValues.indexOf(direction.value);
  return ["flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse"][
    index
  ];
});

const degree = computed(() => {
  const index = directionValues.indexOf(direction.value);
  return [0, -180, 90, -90][index];
});

const directionAnimate = ref(true);

const arrowPosition = computed(() => {
  if (direction.value?.includes("col")) {
    if (direction.value.includes("reverse")) {
      return {
        left: "-20px",
        bottom: "0",
        "transform-origin": "0 100%",
        width: "200px",
      };
    }
    return {
      left: "-20px",
      top: "0",
      "transform-origin": "0 0",
      width: "200px",
    };
  }

  return {
    bottom: "-20px",
    left: 0,
    width: "240px",
  };
});

watch(
  direction,
  (v) => {
    directionAnimate.value = false;
    setTimeout(() => {
      directionAnimate.value = true;
    }, 0);
  },
  {
    immediate: true,
  }
);

const wrap = ref();
const wrapValues = ["nowrap", "wrap", "wrap-reverse"];

const tailwindWrap = computed(() => {
  const index = wrapValues.indexOf(wrap.value);
  return "flex-" + wrapValues[index];
});

const gapHover = ref(false);

const justify = ref();
const justifyValues = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

const tailwindJustify = computed(() => {
  const index = justifyValues.indexOf(justify.value);
  return [
    "justify-start",
    "justify-end",
    "justify-center",
    "justify-between",
    "justify-around",
    "justify-evenly",
  ][index];
});

const items = ref();
const itemsValues = ["stretch", "flex-start", "flex-end", "center", "baseline"];

const tailwindItems = computed(() => {
  const index = itemsValues.indexOf(items.value);
  return [
    "items-stretch",
    "items-start",
    "items-end",
    "items-center",
    "items-baseline",
  ][index];
});

const shuffleHeight = _.shuffle(
  new Array(3).fill(0).map((_i, index) => index * 20 + 25)
);
</script>
<template>
  <h1>Flex</h1>

  <section>
    <h2>背景</h2>
    <p>
      Flexbox Layout
      模块旨在提供一种更有效的方式来布置、对齐和分配容器中项目之间的空间，即使它们的大小未知或动态。
    </p>
    <p>
      flex
      布局背后的主要思想是让容器能够改变其项目的宽度/高度（和顺序）以最好地填充可用空间。
    </p>

    <p>
      flex
      布局用来弥补常规布局模型的不足，它具有更灵活的方式来对容器中的项目进行方向更改、调整大小、对齐、拉伸、收缩和排序。
    </p>
    <p>使用 <code class="inline-code">display</code> 定义一个 flex 容器，</p>
    <Code content="display: flex | inline-flex;" />
  </section>

  <section>
    <h2>术语</h2>
    <dl>
      <dt class="font-semibold my-1">主轴</dt>
      <dd class="pl-2">
        弹性容器的主轴是弹性项目布局的主轴，可以理解为坐标系的 x 轴
      </dd>
      <dt class="font-semibold my-1">交叉轴</dt>
      <dd class="pl-2">
        垂直于主轴的轴称为横轴。它的方向取决于主轴方向。可以理解为坐标系的 y 轴
      </dd>
    </dl>

    <div class="rounded p-4 bg-amber-200 my-4">
      注意：主轴和交叉轴的方向取决于
      <code class="inline-code">flex-direction</code>
      的值。默认情况下，主轴是水平的，交叉轴是垂直的。
    </div>
  </section>

  <div class="grid grid-cols-2 gap-8">
    <!-- left -->
    <div>
      <h2>容器 - Flex Container</h2>
      <p>使用 display: flex 作用的元素被称为 flex 容器</p>
      <Highlight label="flex container" class="box flex" />
      <div class="mt-8">
        <h4>Flex 容器的常用属性</h4>
        <Code
          content="display: flex | inline-flex; flex-direction: row | row-reverse |
          column | column-reverse;flex-wrap: nowrap | wrap | wrap-reverse;
          justify-content: flex-start | flex-end | center | space-between |
          space-around | space-evenly; align-items: stretch | flex-start |
          flex-end | center | baseline; align-content: flex-start | flex-end |
          center | space-between | space-around | space-evenly | stretch; gap: 
          &lt;length&gt;"
        >
        </Code>
      </div>

      <h3>方向 - <code class="inline-code">flex-direction</code></h3>
      <p>用于改变 Flex 容器的轴方向，会影响子项的排版顺序。</p>
      <blockquote
        class="border-l-4 pl-4 py-2 border-gray-400 my-4 text-gray-600"
      >
        例如想让子项从上到下排列，可以使用
        <code class="inline-code">flex-direction:column</code>。
      </blockquote>
      <table class="my-5 properties-table">
        <tr>
          <th>属性值</th>
          <th>作用</th>
          <th>主轴方向</th>
        </tr>
        <tr>
          <td>row （默认）</td>
          <td>从左到右。主轴水平方向 X，交叉轴方向 Y</td>
          <td>X</td>
        </tr>
        <tr>
          <td>row-reverse</td>
          <td>从右到左。水平反转主轴水平方向 X，交叉轴方向 Y 不变</td>
          <td>反方向 X</td>
        </tr>
        <tr>
          <td>column</td>
          <td>从上到下。主轴垂直方向 Y，交叉轴方向 X</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>column-reverse</td>
          <td>从下到上。水平反转主轴垂直方向 Y，交叉轴方向 X 不变</td>
          <td>反方向 Y</td>
        </tr>
      </table>
      <h4 class="mt-8">演示</h4>
      <div class="flex gap-6 pb-8">
        <div class="relative">
          <div label="row" class="box flex gap-2" :class="[tailwindDirection]">
            <div class="item" v-for="i in 3">{{ i }}</div>
          </div>
          <div
            class="direction-arrow absolute left-0"
            :style="{
              transform: `rotate(${degree}deg)`,
              ...arrowPosition,
            }"
          >
            <div
              :class="{
                'direction-arrow-animate': directionAnimate,
              }"
            ></div>
          </div>
        </div>
        <div>
          <Rule
            property="flex-direction"
            v-model:model-value="direction"
            :values="directionValues"
          />
        </div>
      </div>

      <h3>换行 - <code class="inline-code">flex-wrap</code></h3>
      <p>用于改变 Flex 容器换行方式。</p>
      <p>
        默认情况下，flex
        子项会尝试在一行内进行填充，如果你想包含多行子项，可以使用这个属性。
      </p>

      <table class="my-5 properties-table">
        <tr>
          <th>属性值</th>
          <th>作用</th>
        </tr>
        <tr>
          <td>nowrap （默认）</td>
          <td>不换行</td>
        </tr>
        <tr>
          <td>wrap</td>
          <td>换行，从上到下</td>
        </tr>
        <tr>
          <td>wrap-reverse</td>
          <td>换行，从下到上</td>
        </tr>
      </table>
      <h4 class="mt-8">演示</h4>
      <div class="flex gap-6">
        <div class="relative">
          <div label="row" class="box flex gap-2" :class="[tailwindWrap]">
            <div class="item" v-for="i in 5">{{ i }}</div>
          </div>
        </div>
        <div>
          <Rule
            property="flex-wrap"
            v-model:model-value="wrap"
            :values="wrapValues"
          />
        </div>
      </div>
      <!-- justify-conetent -->
      <section>
        <h2>主轴对齐 - <code class="inline-code">justify-content</code></h2>
        <p>定义主轴的对齐方式，也可以分配剩余的额外可用空间</p>
        <table class="my-5 properties-table">
          <tr>
            <th>属性值</th>
            <th>作用</th>
          </tr>
          <tr>
            <td>flex-start （默认）</td>
            <td>向主轴开始方向对齐</td>
          </tr>
          <tr>
            <td>flex-end</td>
            <td>向主轴结束方向对齐</td>
          </tr>
          <tr>
            <td>center</td>
            <td>居中对齐</td>
          </tr>
          <tr>
            <td>space-between</td>
            <td>两端对齐</td>
          </tr>
          <tr>
            <td>space-around</td>
            <td>项目间的空间相同（不包含边缘的空间），两边环绕</td>
          </tr>
          <tr>
            <td>space-evenly</td>
            <td>所有间距都相同（包含边缘的空间），平均分布</td>
          </tr>
        </table>

        <h4 class="mt-8">演示</h4>
        <div class="flex gap-6">
          <div class="relative">
            <div label="row" class="box flex" :class="[tailwindJustify]">
              <div class="item" v-for="i in 3">{{ i }}</div>
            </div>
          </div>
          <div>
            <Rule
              property="justify-content"
              v-model:model-value="justify"
              :values="justifyValues"
            />
          </div>
        </div>
      </section>

      <!-- align-items -->
      <section>
        <h2>交叉轴对齐 - <code class="inline-code">align-items</code></h2>
        <p>定义交叉轴的对齐方式（单行）</p>
        <table class="my-5 properties-table">
          <tr>
            <th>属性值</th>
            <th>作用</th>
          </tr>
          <tr>
            <td>stretch （默认）</td>
            <td>伸展以填充容器 （前提是没有指定高度）</td>
          </tr>
          <tr>
            <td>flex-start</td>
            <td>向交叉轴开始方向对齐</td>
          </tr>
          <tr>
            <td>flex-end</td>
            <td>向交叉轴结束方向对齐</td>
          </tr>
          <tr>
            <td>center</td>
            <td>居中对齐</td>
          </tr>
          <tr>
            <td>baseline</td>
            <td>基于子项的基线（baseline）对齐</td>
          </tr>
        </table>

        <h4 class="mt-8">演示</h4>
        <div class="flex gap-6">
          <div class="relative">
            <div label="row" class="box flex gap-2" :class="[tailwindItems]">
              <div
                class="item"
                v-for="i in 3"
                :style="{
                  height: shuffleHeight[i - 1] + 'px',
                }"
              >
                {{ i }}
              </div>
              <div
                class="item"
                :style="{
                  height: 'auto',
                }"
              >
                4
              </div>
            </div>
          </div>
          <div>
            <Rule
              property="align-items"
              v-model:model-value="items"
              :values="itemsValues"
            />
          </div>
        </div>
        <p class="text-gray-600 text-sm" v-if="items === 'stretch' || !items">
          数字为 1,2,3 子项因设置了高度后，所以 stretch 无效， 数字 4
          得子项未设置高度，所以 stretch 生效
        </p>
      </section>
      <!-- align-content -->
      <section>
        <h2>多行内容对齐 - <code class="inline-code">align-content</code></h2>
        <p>定义交叉轴的对齐方式（多行）</p>
        <table class="my-5 properties-table">
          <tr>
            <th>属性值</th>
            <th>作用</th>
          </tr>
          <tr>
            <td>normal （默认）</td>
            <td>默认</td>
          </tr>
          <tr>
            <td>center</td>
            <td>居中对齐</td>
          </tr>
          <tr>
            <td>flex-start</td>
            <td>沿交叉轴开始方向对齐</td>
          </tr>
          <tr>
            <td>flex-end</td>
            <td>沿交叉轴结束方向对齐</td>
          </tr>
          <tr>
            <td>space-between</td>
            <td>交叉轴方向的两端对齐</td>
          </tr>
          <tr>
            <td>space-around</td>
            <td>交叉轴方向的间距环绕</td>
          </tr>
          <tr>
            <td>space-evenly</td>
            <td>交叉轴方向的平均分布</td>
          </tr>
        </table>
      </section>
      <!-- gap -->
      <section>
        <h2>间隙 - <code class="inline-code">gap</code></h2>
        <p>明确控制<strong>子项之间</strong>的空间</p>
        <p>同时它拥有水平(row-gap)和垂直(column-gap)方向的间距</p>
        <p>它不仅适用于 flex 布局，也适用于 grid 布局</p>
        <table class="my-5 rules-table">
          <tr>
            <th>规则</th>
            <th>解释</th>
          </tr>
          <tr>
            <td>gap: 10px;</td>
            <td>所有间距为 10px</td>
          </tr>
          <tr>
            <td>gap: 10px 20px;</td>
            <td>水平 10px,垂直 20px</td>
          </tr>
          <tr>
            <td>row-gap: 10px;</td>
            <td>水平 10px</td>
          </tr>
          <tr>
            <td>column-gap: 10px;</td>
            <td>垂直 10px</td>
          </tr>
        </table>
        <h4 class="mt-8">演示</h4>
        <div class="flex gap-6">
          <div
            class="box flex overflow-hidden flex-wrap relative content-start"
            :style="{
              gap: '10px',
            }"
            @mouseover="gapHover = true"
            @mouseout="gapHover = false"
          >
            <div class="item" v-for="i in 4"></div>
            <div
              class="gaps animate__animated"
              :class="{
                animate__flash: gapHover,
              }"
            >
              <div
                v-for="i in 3"
                class="gap-help-line"
                :style="{
                  left: 8 + 50 * i + (i - 1) * 10 + 'px',
                }"
              ></div>
              <div
                v-for="i in 2"
                class="gap-help-line gap-help-line-y"
                :style="{
                  top: 8 + 50 * i + (i - 1) * 10 + 'px',
                }"
              ></div>
            </div>
          </div>
          <div>
            <Rule property="gap" :values="['10px']" />
          </div>
        </div>
      </section>
    </div>
    <!-- right -->
    <div>
      <h2>子项 - Flex Items</h2>
      <p>flex 容器内的直接子元素被称为 flex 子项</p>
      <div
        class="box flex gap-2"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
      >
        <div
          class="item animate__animated"
          :class="{
            animate__flash: isHover,
          }"
        ></div>

        <div
          class="item animate__animated"
          :class="{
            animate__flash: isHover,
          }"
        ></div>
      </div>
      <div class="mt-8">
        <h4>Flex 子项的常用属性</h4>
        <Code
          content="align-self: auto | flex-start | flex-end | center | baseline | stretch;
  flex-basis: &lt;length&gt; | auto;
  flex-shrink: &lt;number&gt;;
  flex-grow: &lt;number&gt;;
  order: &lt;number&gt;;"
        ></Code>
      </div>
    </div>
  </div>

  <div class="mt-12">
    <h2>动手试一试</h2>
  </div>

  <div>
    <h3>参考和资源</h3>
    <ul>
      <li class="text-gray-600 my-1">
        <a
          href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
          target="_blank"
          >A Complete Guide to Flexbox</a
        >
        - css-tricks 的 Flex 完整的指南
      </li>
      <li class="text-gray-600 my-1">
        <a href="https://tailwindcss.com/docs/flex-basis" target="_blank"
          >tailwindcss Flex</a
        >
        - tailwincss Flex 文档，可以看到更多的属性的演示
      </li>
      <li class="text-gray-600 my-1">
        <a href="https://flexboxzombies.com/p/flexbox-zombies" target="_blank"
          >flexbox zombies</a
        >
        - 一款学习 flex 布局的在线游戏，非常有趣
      </li>
    </ul>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.box {
  @apply w-[240px] h-[200px] bg-slate-100 rounded p-2 flex-shrink-0;
}

.item {
  @apply w-[50px] h-[50px] bg-cyan-500 rounded-sm flex items-center justify-center text-white;
}

.inline-code {
  @apply bg-gray-500 text-white rounded px-2 py-1 text-sm align-middle;
}

.direction-arrow {
  @apply text-slate-400;
  height: 10px;
  display: flex;
}
.direction-arrow > div {
  --w: 12px;
  --h: 6px;
  content: "";
  background: currentColor;
  width: var(--w);
  clip-path: polygon(
    0 var(--h),
    calc(100% - var(--w)) var(--h),
    calc(100% - var(--w)) 0,
    100% 50%,
    calc(100% - var(--w)) 100%,
    calc(100% - var(--w)) calc(100% - var(--h)),
    0 calc(100% - var(--h))
  );
  fill: currentColor;
}

.direction-arrow-animate {
  animation: 0.5s ease-in forwards grow;
}

@keyframes grow {
  0% {
    flex-grow: 0;
  }
  100% {
    flex-grow: 1;
  }
}

section {
  @apply my-10;
}

.properties-table,
.rules-table {
  @apply w-full text-left border-collapse;
}

.properties-table td,
.rules-table td {
  @apply py-2 border-b border-gray-200;
}
.properties-table td:first-of-type {
  @apply text-indigo-600;
}

.rules-table td:first-of-type {
  @apply text-gray-600;
}

.gaps {
  @apply absolute top-0 left-0 w-full h-full;
}

.gap-help-line {
  @apply absolute top-0 h-full;
  width: 10px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAEBJREFUKFNjZCAC/LH/85+RkDqQIpaDLIx4FcIUgQzDqRBZEU6F6IqwKsSmCEMhLkUoCvEpgiskpAiskBhFIIUA0j0nQfd7WiMAAAAASUVORK5CYII=);
  background-repeat: repeat;
}

.gap-help-line-y {
  transform-origin: 0 0;
  left: 0;
  width: 100%;
  height: 10px;
  top: auto;
}
</style>
