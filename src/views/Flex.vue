<script setup>
import Highlight from "@/components/Highlight.vue";
import Rule from "@/components/Rule.vue";
import Code from "@/components/Code.vue";
import Figure from "@/components/Figure.vue";
import Alert from "@/components/Alert.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useTitle } from "@vueuse/core";
import _ from "lodash";

const title = "Flex 布局建议指南";

useTitle(title);

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

const toggleShrink = ref(false);

onMounted(() => {
  Prism.highlightAll();
});
</script>
<template>
  <h1>{{ title }}</h1>

  <section class="section">
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

  <section class="section">
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

    <Alert class="w-fit">
      注意：主轴和交叉轴的方向取决于
      <code class="inline-code">flex-direction</code>
      的值。默认情况下，主轴是水平的，交叉轴是垂直的。
    </Alert>
  </section>

  <main class="grid lg:grid-cols-2 lg:gap-8 gap-0 grid-cols-1 my-12">
    <!-- left -->
    <div>
      <h2>容器 - Flex Container</h2>
      <p>使用 display: flex 作用的元素被称为 flex 容器</p>
      <Figure
        source="https://css-tricks.com/wp-content/uploads/2018/10/01-container.svg"
        caption="flex 容器 - 图片来自 css-tricks"
      ></Figure>
      <Highlight label="flex container" class="box flex mt-5" />
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

      <section class="section">
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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/flex-direction.svg"
          caption="调整方向 - 图片来自 css-tricks"
        ></Figure>
        <h4 class="mt-8">演示</h4>
        <div class="flex gap-6 pb-8">
          <div class="relative">
            <div
              label="row"
              class="box flex gap-2"
              :class="[tailwindDirection]"
            >
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
      </section>

      <section class="section">
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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/flex-wrap.svg"
          caption="控制换行 - 图片来自 css-tricks"
        ></Figure>
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
      </section>

      <!-- justify-content -->
      <section class="section">
        <h3>主轴对齐 - <code class="inline-code">justify-content</code></h3>
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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/justify-content.svg"
          caption="justify-content 不同值的效果 - 图片来自 css-tricks"
        ></Figure>
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
      <section class="section">
        <h3>交叉轴对齐 - <code class="inline-code">align-items</code></h3>
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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg"
          caption="align-items 不同值的效果 - 图片来自 css-tricks"
        ></Figure>
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
          的子项未设置高度，所以 stretch 生效
        </p>
      </section>
      <!-- align-content -->
      <section class="section">
        <h3>多行内容对齐 - <code class="inline-code">align-content</code></h3>
        <p>
          定义交叉轴的对齐方式（多行）,
          可以理解为交叉轴的多行对齐，值的作用方式与
          <code class="inline-code">justify-content</code> 和
          <code class="inline-code">align-items</code> 相似
        </p>

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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/align-content.svg"
          caption="align-content 不同值的效果 - 图片来自 css-tricks"
        ></Figure>
      </section>
      <!-- gap -->
      <section class="section">
        <h3>间隙 - <code class="inline-code">gap</code></h3>
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
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2021/09/gap-1.svg"
          caption="gap 不同值的效果 - 图片来自 css-tricks"
        ></Figure>
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
      <Figure
        source="https://css-tricks.com/wp-content/uploads/2018/10/02-items.svg"
        caption="flex 子项 - 图片来自 css-tricks"
      ></Figure>
      <div class="flex gap-4 mt-5">
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
        <div class="flex-grow overflow-hidden">
          <Code
            :content="`<div class=&quot;flex&quot;>
  <div>item</div>
  <div>
    <div></div>  <!-- 这个不是直接子元素， 所以不是 flex items -->
  </div>
</div>`"
            lang="html"
          ></Code>
        </div>
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
      <section class="section">
        <h3>子项增长 - <code class="inline-code">flex-grow</code></h3>
        <p>控制子项在可用空间的增长</p>
        <p>
          如果所有项目都flex-grow设置为1，则容器中的剩余空间将平均分配给所有子项。如果其中一个子项的值为2，则该子项将占用其他子项的两倍空间（或者至少会尝试）
        </p>
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/flex-grow.svg"
          caption="flex-grow: 2 - 图片来自 css-tricks"
        ></Figure>
      </section>

      <section class="section">
        <h3>子项收缩 - <code class="inline-code">flex-shrink</code></h3>
        <p>控制子项在可用空间的收缩</p>
      </section>

      <section class="section">
        <h3>可用空间</h3>
        <p>想要理解 grow 和 shrink，先要理解什么是可用空间</p>
        <p>
          在一个 flex
          容器中，对于已知大小的子项所占的空间就是已知空间，那容器中剩余的部分可以称为可用空间。例如在一个
          240px 的 flex 容器中，有 2 个 50px
          的子项，现在要放置第三个元素，那可用空间就是 240 - 50 - 50 =
          140px，给第三个元素设置 grow 和 shrink 就可以控制在这 140px
          内的伸缩表现。比如
          <code class="inline-code">flex-grow: 1</code>
          就可以使其占满可用可用空间，也就是 140px
        </p>

        <div>
          <div class="box !p-0">
            <div class="flex">
              <div class="item"></div>
              <div class="item !bg-green-400"></div>
              <div class="item !bg-red-400 flex-grow"></div>
            </div>
          </div>
        </div>
        <p>
          如果绿色蓝色也设置 <code class="inline-code">flex-grow: 1</code>
          那么他们会平分可用空间，也就是240 - 50 = 190px，都是 grow = 1，那么这
          2 个子项平均分配这 190px 的可用空间，也就是 95px
        </p>
        <div>
          <div class="box !p-0">
            <div class="flex">
              <div class="item"></div>
              <div class="item !bg-green-400 flex-grow"></div>
              <div class="item !bg-red-400 flex-grow"></div>
            </div>
          </div>
        </div>
        <p>可以看出 flex-grow 是让子项占有可用空间的份额</p>
        <div class="rounded p-4 bg-amber-200 my-4">
          注意：上面是举例的计算方式，并没有计算 gap 或者 margin
          等影响空间的属性，实际上可用空间的计算更复杂也更智能，这里只是为了说明可用空间的概念
        </div>
        <p>
          现在看一下 shrink 的表现，绿色和红色都设置 200px，但 240px
          的容器根本装不下这 2 个子项，所以就会产生子项的收缩，因为 flex
          容器在自动分配空间。
        </p>
        <div class="flex gap-6">
          <div class="box !p-0">
            <div class="flex">
              <div
                class="item !bg-green-400 !w-[200px]"
                :class="{
                  'shrink-0': toggleShrink,
                }"
              ></div>
              <div class="item !bg-red-400 !w-[200px]"></div>
            </div>
          </div>
          <div>
            <button class="bg-gray-300" @click="toggleShrink = !toggleShrink">
              click
            </button>
            <p>
              点击按钮 为绿色子项<strong class="mx-1">{{
                !toggleShrink ? "增加" : "移除"
              }}</strong>
              <code class="inline-code">flex-shrink: 0</code>
              来禁止收缩
            </p>
          </div>
        </div>
        <blockquote
          class="border-l-4 pl-4 py-2 border-gray-400 my-4 text-gray-600"
        >
          通常情况下，在空间无法分配时，你可能需要使用
          <code class="inline-code">flex-shrink: 0</code>
          来让某个（些）子项禁止收缩
        </blockquote>
      </section>

      <section class="section">
        <h3>子项默认大小 - <code class="inline-code">flex-basis</code></h3>
        <p>
          定义了分配剩余空间之前元素的默认大小，默认值是
          auto，也就是使用元素本身的宽度和高度属性
        </p>
        <blockquote
          class="border-l-4 pl-4 py-2 border-gray-400 my-4 text-gray-600"
        >
          通常情况下，我们不会使用 flex-basis，而是使用 width 和 height
        </blockquote>
      </section>

      <section class="section">
        <h3>子项自身对齐 - <code class="inline-code">align-self</code></h3>
        <p>覆盖容器指定或默认对齐方式，使用子项自身的对齐方式</p>
        <table class="my-5 properties-table">
          <tr>
            <th>属性值</th>
            <th>作用</th>
          </tr>
          <tr>
            <td>auto</td>
            <td>自动</td>
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
          <tr>
            <td>stretch</td>
            <td>伸展以填充容器</td>
          </tr>
        </table>
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/align-self.svg"
          caption="align-self: flex-end 覆盖了容器的 align-items: flex-start - 图片来自 css-tricks"
        ></Figure>
      </section>

      <section class="section">
        <h3>子项排序 - <code class="inline-code">order</code></h3>
        <p>order属性控制它们在 flex 容器中出现的顺序</p>
        <Figure
          source="https://css-tricks.com/wp-content/uploads/2018/10/order.svg"
          caption="order - 图片来自 css-tricks"
        ></Figure>
      </section>
    </div>
  </main>

  <section class="section">
    <h3>其他内容</h3>
    <div>
      <h4>flex-flow</h4>
      <Code content="flex-flow: <'flex-direction'> || <'flex-wrap'>"></Code>
      <p>flex-direction 和 flex-wrap 的缩写形式</p>
      <h4>flex</h4>
      <Code
        content="flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]"
      ></Code>
      <p>flex-grow flex-shrink flex-basis 的缩写形式</p>
    </div>
  </section>

  <section class="my-12">
    <h2>动手试一试</h2>
    <iframe
      height="400"
      style="width: 100%"
      scrolling="no"
      title="Untitled"
      src="https://codepen.io/princess_war/embed/LYXZeQq?default-tab=html%2Cresult&editable=true"
      frameborder="no"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    >
      See the Pen
      <a href="https://codepen.io/princess_war/pen/LYXZeQq"> Untitled</a> by
      X-Ray (<a href="https://codepen.io/princess_war">@princess_war</a>) on
      <a href="https://codepen.io">CodePen</a>.
    </iframe>
  </section>

  <section class="my-12">
    <h3>总结</h3>
    <p>
      Flex
      布局用在容器上，来调整子项目的排列方式，可以实现改变排版方向，垂直和水平方向的对齐，修改子项的顺序，控制子项的填充，使其适应容器宽度等场景。
    </p>
  </section>

  <section class="my-12">
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
  </section>

  <section class="my-12">
    <h3 class="font-semibold">觉得内容对你有用，打赏一杯可乐 🥤</h3>
    <img
      width="240"
      class="rounded-lg overflow-hidden mx-4"
      src="@/assets/buy_me_cola.jpg"
      alt=""
    />
  </section>
</template>

<style scoped>
.section {
  @apply my-10;
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
