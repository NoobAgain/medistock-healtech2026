<script setup>
import { ref } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "top", // top | bottom | left | right
  },
});

const visible = ref(false);
const offsetX = ref(0);

function isDisabled(e) {
  const el = e.currentTarget.querySelector("button, input, select, textarea, a");
  const target = el || e.currentTarget.firstElementChild;
  return (
    target?.disabled ||
    target?.hasAttribute("disabled") ||
    target?.getAttribute("aria-disabled") === "true"
  );
}

function handleMouseEnter(e) {
  if (isDisabled(e)) return;
  visible.value = true;
}

function handleMouseLeave() {
  visible.value = false;
}

function handleMouseMove(e) {
  if (isDisabled(e)) { visible.value = false; return; }
  const rect = e.currentTarget.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  offsetX.value = Math.max(-40, Math.min(40, relX));
}
</script>

<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <slot />

    <Transition name="tooltip-pop">
      <div
        v-if="visible"
        class="tooltip-box"
        :class="`tooltip-${position}`"
        :style="['top', 'bottom'].includes(position) ? { '--tx': `${offsetX}px` } : {}"
      >
        <div class="tooltip-arrow" :class="`arrow-${position}`" />
        <span class="tooltip-text">{{ text }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Tooltip Box */
.tooltip-box {
  position: absolute;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #009688;
  padding: 6px 12px;
  white-space: nowrap;
  box-shadow: 0 0px 4px #009688;
  border: #009688;
  pointer-events: none;
  transform-origin: bottom center;
}

/* Positions */
.tooltip-top {
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(calc(-50% + var(--tx, 0px)));
  transform-origin: bottom center;
}

.tooltip-bottom {
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(calc(-50% + var(--tx, 0px)));
  transform-origin: top center;
}

.tooltip-left {
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: right center;
}

.tooltip-right {
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

/* Arrow */
.tooltip-arrow {
  position: absolute;
  width: 9px;
  height: 9px;
  background: #009688;
}

.arrow-top {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.arrow-bottom {
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.arrow-left {
  right: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.arrow-right {
  left: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tooltip-text {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.01em;
}

/* ─── Enter: slide in fast → slow (cubic-bezier ease-out feel) ─── */
.tooltip-pop-enter-active {
  animation: tooltip-enter-top 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.tooltip-pop-enter-active.tooltip-bottom {
  animation: tooltip-enter-bottom 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.tooltip-pop-enter-active.tooltip-left {
  animation: tooltip-enter-left 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.tooltip-pop-enter-active.tooltip-right {
  animation: tooltip-enter-right 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ─── Leave: slide out slow → fast (cubic-bezier ease-in feel) ─── */
.tooltip-pop-leave-active {
  animation: tooltip-leave-top 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards;
}
.tooltip-pop-leave-active.tooltip-bottom {
  animation: tooltip-leave-bottom 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards;
}
.tooltip-pop-leave-active.tooltip-left {
  animation: tooltip-leave-left 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards;
}
.tooltip-pop-leave-active.tooltip-right {
  animation: tooltip-leave-right 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards;
}

/* ── TOP: slides down into place, slides up out ── */
@keyframes tooltip-enter-top {
  from {
    opacity: 0;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(0px) scale(1);
  }
}
@keyframes tooltip-leave-top {
  from {
    opacity: 1;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(0px) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(-8px) scale(0.95);
  }
}

/* ── BOTTOM: slides up into place, slides down out ── */
@keyframes tooltip-enter-bottom {
  from {
    opacity: 0;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(0px) scale(1);
  }
}
@keyframes tooltip-leave-bottom {
  from {
    opacity: 1;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(0px) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(calc(-50% + var(--tx, 0px))) translateY(8px) scale(0.95);
  }
}

/* ── LEFT: slides right into place, slides left out ── */
@keyframes tooltip-enter-left {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0px) scale(1);
  }
}
@keyframes tooltip-leave-left {
  from {
    opacity: 1;
    transform: translateY(-50%) translateX(0px) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-50%) translateX(8px) scale(0.95);
  }
}

/* ── RIGHT: slides left into place, slides right out ── */
@keyframes tooltip-enter-right {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0px) scale(1);
  }
}
@keyframes tooltip-leave-right {
  from {
    opacity: 1;
    transform: translateY(-50%) translateX(0px) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px) scale(0.95);
  }
}
</style>
