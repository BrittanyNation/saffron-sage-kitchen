const { useState, useEffect, useMemo } = React;
const RECIPES = [
  { id: "r1", name: "Saffron Chicken & Rice", emoji: "\u{1F357}", img: "images/r1.jpg", alt: "Saffron chicken and rice served in a wide pan", hue: "#F6D9A8", diets: ["Gluten-Free"], time: 35, level: "Easy", perServing: 9.5, rating: 4.9, blurb: "Golden saffron rice, warm spices, and a cool yogurt sauce.", ingredients: ["Chicken thighs", "Basmati rice", "Saffron", "Greek yogurt", "Cucumber", "Lemon"], steps: ["Bloom saffron in warm water.", "Sear chicken, set aside.", "Cook rice in saffron water, return chicken, rest 10 minutes."] },
  { id: "r2", name: "Smoky Paprika Salmon", emoji: "\u{1F41F}", img: "images/r2.jpg", alt: "Paprika salmon fillet plated with greens and sauce", hue: "#F3C6B3", diets: ["Gluten-Free"], time: 25, level: "Easy", perServing: 12, rating: 4.8, blurb: "Paprika-crusted salmon with charred greens and lemon.", ingredients: ["Salmon fillets", "Smoked paprika", "Green beans", "Lemon", "Garlic"], steps: ["Rub salmon with paprika and salt.", "Sear skin-side down 6 minutes.", "Char beans in the same pan, finish with lemon."] },
  { id: "r3", name: "Sage Butter Gnocchi", emoji: "\u{1F35D}", img: "images/r3.jpg", alt: "Gnocchi served on a ceramic plate", hue: "#E7DFC8", diets: ["Vegetarian"], time: 20, level: "Easy", perServing: 8.25, rating: 4.7, blurb: "Pillowy gnocchi in brown sage butter with crispy edges.", ingredients: ["Potato gnocchi", "Butter", "Fresh sage", "Parmesan", "Walnuts"], steps: ["Boil gnocchi until they float.", "Brown butter with sage leaves.", "Toss together with parmesan and walnuts."] },
  { id: "r4", name: "Harissa Chickpea Stew", emoji: "\u{1F372}", img: "images/r4.jpg", alt: "Chickpea stew served with bread and herbs", hue: "#EBC9A3", diets: ["Vegan", "Gluten-Free", "Spicy"], time: 40, level: "Medium", perServing: 7.75, rating: 4.8, blurb: "A warming one-pot stew with harissa heat and herbs.", ingredients: ["Chickpeas", "Harissa paste", "Crushed tomatoes", "Spinach", "Red onion"], steps: ["Soften onion, add harissa.", "Add tomatoes and chickpeas, simmer 25 minutes.", "Fold in spinach and serve."] },
  { id: "r5", name: "Herb Garden Pasta", emoji: "\u{1F33F}", img: "images/r5.jpg", alt: "Pasta coated in green herb sauce with grated cheese", hue: "#CFE0C0", diets: ["Vegetarian"], time: 22, level: "Easy", perServing: 8, rating: 4.6, blurb: "Pasta tossed with a bright herb, lemon and pea sauce.", ingredients: ["Pasta", "Peas", "Basil", "Mint", "Lemon", "Ricotta"], steps: ["Cook pasta, save a cup of water.", "Blitz herbs, peas and lemon.", "Toss with ricotta and pasta water."] },
  { id: "r6", name: "Ginger Lime Tofu Bowls", emoji: "\u{1F957}", img: "images/r6.jpg", alt: "Rice bowl with tofu, black beans, vegetables, and chopsticks", hue: "#D8E6C3", diets: ["Vegan", "Gluten-Free"], time: 30, level: "Medium", perServing: 8.75, rating: 4.7, blurb: "Crisp tofu, ginger-lime dressing, crunchy vegetables.", ingredients: ["Firm tofu", "Rice", "Ginger", "Lime", "Carrots", "Edamame"], steps: ["Press and crisp the tofu.", "Whisk ginger, lime and soy dressing.", "Build bowls over rice and drizzle."] },
  { id: "r7", name: "Tomato Basil Shakshuka", emoji: "\u{1F345}", img: "images/r7.jpg", alt: "Shakshuka in a skillet with eggs, bread, and herbs", hue: "#F2B8A0", diets: ["Vegetarian", "Gluten-Free", "Spicy"], time: 28, level: "Easy", perServing: 7.5, rating: 4.9, blurb: "Eggs poached in spiced tomato sauce, made for dipping.", ingredients: ["Eggs", "Crushed tomatoes", "Bell pepper", "Cumin", "Feta", "Crusty bread"], steps: ["Simmer spiced tomato sauce 15 minutes.", "Crack in eggs, cover until just set.", "Top with feta and serve with bread."] },
  { id: "r8", name: "Mushroom Sage Risotto", emoji: "\u{1F344}", img: "images/r8.jpg", alt: "Mushroom risotto served on an oval plate", hue: "#E3D5BE", diets: ["Vegetarian", "Gluten-Free"], time: 45, level: "Hard", perServing: 10.25, rating: 4.8, blurb: "Slow-stirred risotto with mushrooms and crispy sage.", ingredients: ["Arborio rice", "Mixed mushrooms", "Vegetable stock", "Sage", "Parmesan"], steps: ["Brown mushrooms, set aside.", "Stir stock into rice a ladle at a time.", "Fold mushrooms back in with parmesan."] },
  { id: "r9", name: "Citrus Herb Shrimp", emoji: "\u{1F364}", img: "images/r9.jpg", alt: "Grilled shrimp topped with fresh herbs", hue: "#F6DCAE", diets: ["Gluten-Free"], time: 18, level: "Easy", perServing: 11.5, rating: 4.7, blurb: "Fast shrimp with citrus, garlic and a herb finish.", ingredients: ["Shrimp", "Orange", "Garlic", "Parsley", "Chili flakes"], steps: ["Marinate shrimp in citrus 10 minutes.", "Sear 2 minutes per side.", "Finish with herbs and chili."] },
  { id: "r10", name: "Roasted Veg & Tahini Tray", emoji: "\u{1F955}", img: "images/r10.jpg", alt: "Roasted broccoli and carrots in a baking tray", hue: "#EAD9B8", diets: ["Vegan", "Gluten-Free"], time: 38, level: "Easy", perServing: 7.25, rating: 4.5, blurb: "One tray of roasted vegetables with lemon tahini.", ingredients: ["Sweet potato", "Chickpeas", "Cauliflower", "Tahini", "Lemon"], steps: ["Roast vegetables at 425F for 30 minutes.", "Whisk tahini, lemon and water.", "Drizzle and serve over grains."] },
  { id: "r11", name: "Chicken Korma, Gentle Heat", emoji: "\u{1F35B}", img: "images/r11.jpg", alt: "Chicken curry served with basmati rice, lime, and chilies", hue: "#F0D9A8", diets: ["Gluten-Free", "Spicy"], time: 42, level: "Medium", perServing: 10, rating: 4.8, blurb: "Creamy, gently spiced korma with basmati rice.", ingredients: ["Chicken breast", "Korma paste", "Coconut milk", "Almonds", "Basmati rice"], steps: ["Brown chicken with paste.", "Simmer in coconut milk 20 minutes.", "Serve over rice with almonds."] },
  { id: "r12", name: "Pear & Walnut Salad Kit", emoji: "\u{1F350}", img: "images/r12.jpg", alt: "Pear, walnut, cheese, and leafy vegetable salad", hue: "#DCE8CC", diets: ["Vegetarian", "Gluten-Free"], time: 15, level: "Easy", perServing: 6.95, rating: 4.4, blurb: "A crisp starter kit with honey dressing on the side.", ingredients: ["Pears", "Walnuts", "Mixed greens", "Goat cheese", "Honey"], steps: ["Toast walnuts.", "Slice pears just before serving.", "Dress, toss and top with cheese."] }
];
const DIETS = ["All", "Vegetarian", "Vegan", "Gluten-Free", "Spicy"];
const money = (n) => "$" + n.toFixed(2);
function Header({ view, setView, boxCount, openBox }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "topbar" }, "Free delivery on boxes over $60 \xB7 Use code SAGE10 for 10% off your first box"), /* @__PURE__ */ React.createElement("header", { className: "site" }, /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("a", { className: "logo", href: "#", onClick: (e) => {
    e.preventDefault();
    setView("menu");
  } }, "Saffron ", /* @__PURE__ */ React.createElement("span", null, "& Sage")), /* @__PURE__ */ React.createElement("div", { className: "navlinks" }, /* @__PURE__ */ React.createElement("button", { className: view === "menu" ? "active" : "", onClick: () => setView("menu") }, "This Week's Menu"), /* @__PURE__ */ React.createElement("button", { className: view === "how" ? "active" : "", onClick: () => setView("how") }, "How It Works"), /* @__PURE__ */ React.createElement("button", { className: view === "checkout" ? "active" : "", onClick: () => setView("checkout") }, "Checkout"), /* @__PURE__ */ React.createElement("button", { className: "boxbtn", onClick: openBox }, "\u{1F9FA} My Box (", boxCount, ")")))));
}
function FilterBar({ diet, setDiet, query, setQuery, sort, setSort, servings, setServings, count }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "filters", role: "search" }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Search recipes", placeholder: "Search recipes or ingredients\u2026", value: query, onChange: (e) => setQuery(e.target.value) }), /* @__PURE__ */ React.createElement("select", { "aria-label": "Sort recipes", value: sort, onChange: (e) => setSort(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "popular" }, "Most loved"), /* @__PURE__ */ React.createElement("option", { value: "price-low" }, "Price: low to high"), /* @__PURE__ */ React.createElement("option", { value: "price-high" }, "Price: high to low"), /* @__PURE__ */ React.createElement("option", { value: "time" }, "Quickest first")), /* @__PURE__ */ React.createElement("select", { "aria-label": "Servings per recipe", value: servings, onChange: (e) => setServings(Number(e.target.value)) }, /* @__PURE__ */ React.createElement("option", { value: 2 }, "2 servings"), /* @__PURE__ */ React.createElement("option", { value: 4 }, "4 servings"))), /* @__PURE__ */ React.createElement("div", { className: "filters" }, DIETS.map((d) => /* @__PURE__ */ React.createElement("button", { key: d, className: "chip" + (diet === d ? " active" : ""), onClick: () => setDiet(d) }, d)), /* @__PURE__ */ React.createElement("span", { "aria-live": "polite" }, count, " recipe", count === 1 ? "" : "s", " this week")));
}
function RecipeCard({ r, servings, onAdd, onView, isFav, onFav }) {
  const price = r.perServing * servings;
  return /* @__PURE__ */ React.createElement("article", { className: "card" }, /* @__PURE__ */ React.createElement("div", { className: "art", style: { background: r.hue } }, /* @__PURE__ */ React.createElement("img", { src: r.img, alt: r.alt, loading: "lazy" })), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("button", { className: "fav", "aria-label": "Save " + r.name, onClick: () => onFav(r.id) }, isFav ? "\u2764\uFE0F" : "\u{1F90D}"), /* @__PURE__ */ React.createElement("h3", null, r.name), /* @__PURE__ */ React.createElement("div", { className: "meta" }, r.diets.join(" \xB7 "), " \xB7 ", r.time, " min \xB7 ", r.level, " \xB7 \u2605 ", r.rating), /* @__PURE__ */ React.createElement("p", null, r.blurb), /* @__PURE__ */ React.createElement("div", { className: "price" }, money(price), " ", /* @__PURE__ */ React.createElement("small", null, "for ", servings)), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => onAdd(r) }, "Add to box"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: () => onView(r) }, "Details"))));
}
function RecipeModal({ r, servings, onClose, onAdd }) {
  if (!r) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "modalback", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "modal", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("img", { className: "modalimg", src: r.img, alt: r.alt }), /* @__PURE__ */ React.createElement("h2", null, r.emoji, " ", r.name), /* @__PURE__ */ React.createElement("p", { className: "meta" }, r.diets.join(" \xB7 "), " \xB7 ", r.time, " minutes \xB7 ", r.level, " \xB7 \u2605 ", r.rating), /* @__PURE__ */ React.createElement("p", null, r.blurb), /* @__PURE__ */ React.createElement("h3", null, "What's in the box"), /* @__PURE__ */ React.createElement("ul", null, r.ingredients.map((i) => /* @__PURE__ */ React.createElement("li", { key: i }, i))), /* @__PURE__ */ React.createElement("h3", null, "How it cooks"), /* @__PURE__ */ React.createElement("ol", null, r.steps.map((s) => /* @__PURE__ */ React.createElement("li", { key: s }, s))), /* @__PURE__ */ React.createElement("p", { className: "price" }, money(r.perServing * servings), " for ", servings, " servings"), /* @__PURE__ */ React.createElement("div", { className: "row", style: { display: "flex", gap: ".5rem" } }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => {
    onAdd(r);
    onClose();
  } }, "Add to box"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: onClose }, "Close"))));
}
function BoxDrawer({ open, items, servings, changeQty, removeItem, subtotal, goCheckout, onClose }) {
  if (!open) return null;
  return /* @__PURE__ */ React.createElement("aside", { className: "drawer", "aria-label": "Your box" }, /* @__PURE__ */ React.createElement("h2", null, "Your box"), items.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "Your box is empty. Add a recipe from this week's menu and it will show up here, saved even if you close the tab.") : items.map(({ r, qty }) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { borderBottom: "1px solid #EFE3D3", padding: ".6rem 0" } }, /* @__PURE__ */ React.createElement("strong", null, r.emoji, " ", r.name), /* @__PURE__ */ React.createElement("div", null, money(r.perServing * servings), " \xD7 ", qty), /* @__PURE__ */ React.createElement("div", { className: "qty" }, /* @__PURE__ */ React.createElement("button", { "aria-label": "Decrease", onClick: () => changeQty(r.id, -1) }, "\u2212"), /* @__PURE__ */ React.createElement("span", null, qty), /* @__PURE__ */ React.createElement("button", { "aria-label": "Increase", onClick: () => changeQty(r.id, 1) }, "+"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: () => removeItem(r.id) }, "Remove")))), /* @__PURE__ */ React.createElement("div", { className: "summary", style: { marginTop: "1rem" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Subtotal"), /* @__PURE__ */ React.createElement("strong", null, money(subtotal))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Delivery"), /* @__PURE__ */ React.createElement("span", null, subtotal >= 60 || subtotal === 0 ? "Free" : money(6.95)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: ".5rem", marginTop: "1rem" } }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", disabled: items.length === 0, onClick: goCheckout }, "Go to checkout"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: onClose }, "Keep browsing")));
}
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: "faq" }, /* @__PURE__ */ React.createElement("button", { "aria-expanded": open, onClick: () => setOpen(!open) }, q, " ", open ? "\u2212" : "+"), open && /* @__PURE__ */ React.createElement("p", null, a));
}
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("ss-news") || "[]");
    if (saved.includes(email.toLowerCase())) {
      setMsg("You're already on the Sunday Menu Letter \u2014 welcome back.");
      return;
    }
    saved.push(email.toLowerCase());
    localStorage.setItem("ss-news", JSON.stringify(saved));
    setMsg("You're in! The Sunday Menu Letter arrives this weekend.");
    setEmail("");
  };
  return /* @__PURE__ */ React.createElement("form", { onSubmit: submit }, /* @__PURE__ */ React.createElement("label", { htmlFor: "nl" }, "Get the Sunday Menu Letter"), /* @__PURE__ */ React.createElement("input", { id: "nl", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" }), msg && /* @__PURE__ */ React.createElement("p", { className: msg.startsWith("Please") ? "err" : "" }, msg), /* @__PURE__ */ React.createElement("button", { className: "addbtn", type: "submit", style: { marginTop: ".5rem" } }, "Join the letter"));
}
function CheckoutForm({ items, servings, subtotal, onConfirm }) {
  const [f, setF] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvc: "", promo: "" });
  const [errs, setErrs] = useState({});
  const [promoMsg, setPromoMsg] = useState("");
  const set = (k, v) => setF({ ...f, [k]: v });
  const discount = f.promo.trim().toUpperCase() === "SAGE10" ? subtotal * 0.1 : 0;
  const delivery = subtotal === 0 ? 0 : subtotal - discount >= 60 ? 0 : 6.95;
  const total = Math.max(0, subtotal - discount + delivery);
  const applyPromo = () => setPromoMsg(f.promo.trim().toUpperCase() === "SAGE10" ? "SAGE10 applied \u2014 10% off." : "That code isn't one of ours. Try SAGE10.");
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Please enter the name for the delivery.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = "Please enter a valid email.";
    if (f.address.trim().length < 5) er.address = "Please enter a street address.";
    if (f.city.trim().length < 2) er.city = "Please enter a city.";
    if (!/^\d{5}(-\d{4})?$/.test(f.zip.trim())) er.zip = "Please enter a valid ZIP code.";
    if (!/^\d{16}$/.test(f.card.replace(/\s/g, ""))) er.card = "Please enter the 16-digit card number.";
    const m = f.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) er.expiry = "Use MM/YY.";
    else {
      const exp = new Date(2e3 + Number(m[2]), Number(m[1]), 0);
      if (exp < /* @__PURE__ */ new Date()) er.expiry = "That card date is in the past.";
    }
    if (!/^\d{3,4}$/.test(f.cvc.trim())) er.cvc = "Please enter the 3 or 4 digit code.";
    if (items.length === 0) er.box = "Your box is empty \u2014 add a recipe first.";
    setErrs(er);
    if (Object.keys(er).length) return;
    onConfirm({ name: f.name, email: f.email, total, ref: "SS-" + Math.random().toString(36).slice(2, 8).toUpperCase() });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" } }, /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true }, /* @__PURE__ */ React.createElement("h2", null, "Delivery & payment"), errs.box && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.box), /* @__PURE__ */ React.createElement("label", null, "Full name"), /* @__PURE__ */ React.createElement("input", { value: f.name, onChange: (e) => set("name", e.target.value) }), errs.name && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.name), /* @__PURE__ */ React.createElement("label", null, "Email"), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => set("email", e.target.value) }), errs.email && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.email), /* @__PURE__ */ React.createElement("label", null, "Street address"), /* @__PURE__ */ React.createElement("input", { value: f.address, onChange: (e) => set("address", e.target.value) }), errs.address && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.address), /* @__PURE__ */ React.createElement("label", null, "City"), /* @__PURE__ */ React.createElement("input", { value: f.city, onChange: (e) => set("city", e.target.value) }), errs.city && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.city), /* @__PURE__ */ React.createElement("label", null, "ZIP"), /* @__PURE__ */ React.createElement("input", { value: f.zip, onChange: (e) => set("zip", e.target.value) }), errs.zip && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.zip), /* @__PURE__ */ React.createElement("label", null, "Card number"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", placeholder: "1234 5678 9012 3456", value: f.card, onChange: (e) => set("card", e.target.value) }), errs.card && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.card), /* @__PURE__ */ React.createElement("label", null, "Expiry (MM/YY)"), /* @__PURE__ */ React.createElement("input", { placeholder: "MM/YY", value: f.expiry, onChange: (e) => set("expiry", e.target.value) }), errs.expiry && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.expiry), /* @__PURE__ */ React.createElement("label", null, "CVC"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: f.cvc, onChange: (e) => set("cvc", e.target.value) }), errs.cvc && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.cvc), /* @__PURE__ */ React.createElement("label", null, "Promo code"), /* @__PURE__ */ React.createElement("input", { value: f.promo, onChange: (e) => set("promo", e.target.value), placeholder: "SAGE10" }), /* @__PURE__ */ React.createElement("button", { type: "button", className: "ghost", onClick: applyPromo, style: { marginTop: ".4rem" } }, "Apply code"), promoMsg && /* @__PURE__ */ React.createElement("p", null, promoMsg), /* @__PURE__ */ React.createElement("button", { className: "addbtn", type: "submit", style: { marginTop: "1rem", width: "100%" } }, "Place order \u2014 ", money(total))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Order summary"), /* @__PURE__ */ React.createElement("div", { className: "summary" }, items.map(({ r, qty }) => /* @__PURE__ */ React.createElement("div", { key: r.id }, /* @__PURE__ */ React.createElement("span", null, r.name, " \xD7 ", qty), /* @__PURE__ */ React.createElement("span", null, money(r.perServing * servings * qty)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Subtotal"), /* @__PURE__ */ React.createElement("span", null, money(subtotal))), discount > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "SAGE10 (10% off)"), /* @__PURE__ */ React.createElement("span", null, "\u2212", money(discount))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Delivery"), /* @__PURE__ */ React.createElement("span", null, delivery === 0 ? "Free" : money(delivery))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "2px solid #EFE3D3", fontWeight: "bold" } }, /* @__PURE__ */ React.createElement("span", null, "Total"), /* @__PURE__ */ React.createElement("span", null, money(total))), /* @__PURE__ */ React.createElement("p", null, "Delivery is free once your box reaches $60 after discounts. Servings: ", servings, " per recipe."))));
}
function App() {
  const [view, setView] = useState("menu");
  const [diet, setDiet] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [servings, setServings] = useState(2);
  const [box, setBox] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ss-box") || "{}");
    } catch (e) {
      return {};
    }
  });
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ss-favs") || "[]");
    } catch (e) {
      return [];
    }
  });
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState(null);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    localStorage.setItem("ss-box", JSON.stringify(box));
  }, [box]);
  useEffect(() => {
    localStorage.setItem("ss-favs", JSON.stringify(favs));
  }, [favs]);
  const items = Object.entries(box).map(([id, qty]) => ({ r: RECIPES.find((x) => x.id === id), qty })).filter((x) => x.r);
  const boxCount = items.reduce((s, x) => s + x.qty, 0);
  const subtotal = items.reduce((s, x) => s + x.r.perServing * servings * x.qty, 0);
  const add = (r) => setBox({ ...box, [r.id]: (box[r.id] || 0) + 1 });
  const changeQty = (id, d) => {
    const q = (box[id] || 0) + d;
    const next = { ...box };
    if (q <= 0) delete next[id];
    else next[id] = q;
    setBox(next);
  };
  const removeItem = (id) => {
    const next = { ...box };
    delete next[id];
    setBox(next);
  };
  const toggleFav = (id) => setFavs(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]);
  const visible = useMemo(() => {
    let list = RECIPES.filter((r) => (diet === "All" || r.diets.includes(diet)) && (r.name + " " + r.ingredients.join(" ")).toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-low") list = [...list].sort((a, b) => a.perServing - b.perServing);
    if (sort === "price-high") list = [...list].sort((a, b) => b.perServing - a.perServing);
    if (sort === "time") list = [...list].sort((a, b) => a.time - b.time);
    if (sort === "popular") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [diet, query, sort]);
  const confirm = (o) => {
    setOrder(o);
    const orders = JSON.parse(localStorage.getItem("ss-orders") || "[]");
    orders.push({ ...o, at: (/* @__PURE__ */ new Date()).toISOString() });
    localStorage.setItem("ss-orders", JSON.stringify(orders));
    setBox({});
    setView("done");
    window.scrollTo(0, 0);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, { view, setView, boxCount, openBox: () => setDrawer(true) }), view === "menu" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("h1", null, "Dinner, decided."), /* @__PURE__ */ React.createElement("p", null, "Saffron & Sage sends pre-measured ingredients and a calm, clear recipe card for the week you actually have. Pick your recipes, build your box, and dinner stops being a daily decision."), /* @__PURE__ */ React.createElement("button", { className: "cta", onClick: () => document.getElementById("menu").scrollIntoView({ behavior: "smooth" }) }, "Browse this week's menu"), /* @__PURE__ */ React.createElement("div", { className: "stats" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "12"), " recipes weekly"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "15\u201345"), " minutes to cook"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "$6.95"), " delivery, free over $60")), /* @__PURE__ */ React.createElement("img", { className: "heroimg", src: "images/hero.jpg", alt: "Overhead view of a shared table filled with salads, bread, and plated dishes" })), /* @__PURE__ */ React.createElement("main", { className: "wrap", id: "menu" }, /* @__PURE__ */ React.createElement("div", { className: "banner" }, "Demo note: this is a React component app running entirely in your browser. Your box, favorites and orders save in this browser only \u2014 no account, no real payment."), /* @__PURE__ */ React.createElement("h2", null, "This week's menu"), /* @__PURE__ */ React.createElement(FilterBar, { diet, setDiet, query, setQuery, sort, setSort, servings, setServings, count: visible.length }), visible.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "No recipes match that search this week. Try a different ingredient, or clear the diet filter.") : /* @__PURE__ */ React.createElement("div", { className: "grid" }, visible.map((r) => /* @__PURE__ */ React.createElement(RecipeCard, { key: r.id, r, servings, onAdd: add, onView: setSelected, isFav: favs.includes(r.id), onFav: toggleFav }))))), view === "how" && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("h2", null, "How it works"), /* @__PURE__ */ React.createElement("ol", { style: { lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Pick your recipes"), " from the weekly menu of 12 \u2014 filter by diet, search by ingredient."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Choose 2 or 4 servings"), " per recipe; every price on the page updates at once (that is React state doing its job)."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Build your box"), " \u2014 it saves as you go and waits for you if you close the tab."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Check out once"), " \u2014 delivery is $6.95, free over $60, and SAGE10 takes 10% off a first box.")), /* @__PURE__ */ React.createElement("h2", null, "Common questions"), /* @__PURE__ */ React.createElement(FaqItem, { q: "Can I skip a week?", a: "Yes. There is no subscription lock-in in this demo concept \u2014 you order the weeks you want, and your saved favorites wait for you." }), /* @__PURE__ */ React.createElement(FaqItem, { q: "What if I need 4 servings of one recipe and 2 of another?", a: "Servings are set for the whole box in this version, so every recipe is priced for the same household size. It keeps the box simple to pack." }), /* @__PURE__ */ React.createElement(FaqItem, { q: "Is the food spicy?", a: "Recipes marked Spicy say so on the card before you add them, and the detail view lists every ingredient so you can check first." }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 440 } }, /* @__PURE__ */ React.createElement(NewsletterForm, null))), view === "checkout" && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("h2", null, "Checkout"), /* @__PURE__ */ React.createElement(CheckoutForm, { items, servings, subtotal, onConfirm: confirm })), view === "done" && order && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "ok" }, /* @__PURE__ */ React.createElement("h2", null, "Order confirmed \u2014 thank you, ", order.name.split(" ")[0], "."), /* @__PURE__ */ React.createElement("p", null, "Your order reference is ", /* @__PURE__ */ React.createElement("strong", null, order.ref), ". A confirmation was saved for ", order.email, " in this browser, and your box total was ", /* @__PURE__ */ React.createElement("strong", null, money(order.total)), ". Your Saffron & Sage box arrives Thursday between 4 and 8 PM."), /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => setView("menu") }, "Plan another week"))), /* @__PURE__ */ React.createElement(RecipeModal, { r: selected, servings, onClose: () => setSelected(null), onAdd: add }), /* @__PURE__ */ React.createElement(BoxDrawer, { open: drawer, items, servings, changeQty, removeItem, subtotal, goCheckout: () => {
    setDrawer(false);
    setView("checkout");
  }, onClose: () => setDrawer(false) }), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("p", null, "Saffron & Sage Kitchen \u2014 a fictional meal-box service. Original portfolio concept by Brittany Nation \xB7 Built with React components, HTML and CSS \xB7 Sketch / Webflow design workflow")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
