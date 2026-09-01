import { defineComponent, h } from "vue"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default defineComponent({
    name: "Glowing",

    setup() {
        return () => {
            return h(GlowingEffect, {
                spread: 40,
                glow: true,
                disabled: false,
                proximity: 64,
                inactiveZone: 0.01,
                borderWidth: 1,
            })
        }
    }
})
