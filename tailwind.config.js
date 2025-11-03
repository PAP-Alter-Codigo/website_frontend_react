module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cello: "#1e3b5d",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // 'sans' usará Inter por default
      },
      keyframes: {
        sway: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%":      { transform: "translateY(3px) rotate(0.6deg)" },
          "50%":      { transform: "translateY(-4px) rotate(-0.8deg)" },
          "75%":      { transform: "translateY(2px) rotate(0.4deg)" },
        },
        "sway-rev": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%":      { transform: "translateY(-3px) rotate(-0.6deg)" },
          "50%":      { transform: "translateY(4px) rotate(0.8deg)" },
          "75%":      { transform: "translateY(-2px) rotate(-0.4deg)" },
        },
      },
      animation: {
         sway: "sway 9s ease-in-out infinite",
        "sway-slow": "sway 12s ease-in-out infinite",
        "sway-rev": "sway-rev 10s ease-in-out infinite",
      },
    }
  }
}