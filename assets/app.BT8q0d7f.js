import{t as i}from"./chunks/theme.GF8irOr7.js";import{j as o,a3 as u,a4 as c,a5 as l,a6 as f,a7 as d,a8 as m,a9 as h,aa as g,ab as A,ac as v,d as y,u as C,l as P,z as w,ad as b,ae as R,af as j,ag as D}from"./chunks/framework.B1TURYj3.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),E=y({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=C();return P(()=>{w(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&b(),R(),j(),s.setup&&s.setup(),()=>D(s.Layout)}});async function S(){const e=F(),a=x();a.provide(c,e);const t=l(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function x(){return g(E)}function F(){let e=o,a;return A(t=>{let n=v(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&S().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{S as createApp};
