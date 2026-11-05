/* =====================================================================
   SAFFRON & SAGE KITCHEN — a React component app (Course Step 5: React)
   Study notes for Brittany:
   - React builds a page from COMPONENTS: small functions that return JSX.
   - PROPS pass data down (parent -> child). STATE remembers data inside
     a component (useState). When state changes, React re-renders only
     what changed — no manual DOM updates like vanilla JS projects.
   - useEffect runs side effects (here: saving the box to localStorage).
   - Lists need a stable `key` so React can track each row.
   - This file is JSX; Babel compiles it in the browser for GitHub Pages.
     The identical source, split per component, lives in /src.
   ===================================================================== */
const { useState, useEffect, useMemo } = React;

/* ---- DATA: 12 recipes. In a full-stack app this would come from an API
   (Steps 2-3); here it is a constant the components render from. ---- */
const RECIPES = [
  { id:"r1", name:"Saffron Chicken & Rice", emoji:"🍗", img:"images/r1.jpg", alt:"Saffron chicken and rice served in a wide pan", hue:"#F6D9A8", diets:["Gluten-Free"], time:35, level:"Easy", perServing:9.50, rating:4.9, blurb:"Golden saffron rice, warm spices, and a cool yogurt sauce.", ingredients:["Chicken thighs","Basmati rice","Saffron","Greek yogurt","Cucumber","Lemon"], steps:["Bloom saffron in warm water.","Sear chicken, set aside.","Cook rice in saffron water, return chicken, rest 10 minutes."] },
  { id:"r2", name:"Smoky Paprika Salmon", emoji:"🐟", img:"images/r2.jpg", alt:"Paprika salmon fillet plated with greens and sauce", hue:"#F3C6B3", diets:["Gluten-Free"], time:25, level:"Easy", perServing:12.00, rating:4.8, blurb:"Paprika-crusted salmon with charred greens and lemon.", ingredients:["Salmon fillets","Smoked paprika","Green beans","Lemon","Garlic"], steps:["Rub salmon with paprika and salt.","Sear skin-side down 6 minutes.","Char beans in the same pan, finish with lemon."] },
  { id:"r3", name:"Sage Butter Gnocchi", emoji:"🍝", img:"images/r3.jpg", alt:"Gnocchi served on a ceramic plate", hue:"#E7DFC8", diets:["Vegetarian"], time:20, level:"Easy", perServing:8.25, rating:4.7, blurb:"Pillowy gnocchi in brown sage butter with crispy edges.", ingredients:["Potato gnocchi","Butter","Fresh sage","Parmesan","Walnuts"], steps:["Boil gnocchi until they float.","Brown butter with sage leaves.","Toss together with parmesan and walnuts."] },
  { id:"r4", name:"Harissa Chickpea Stew", emoji:"🍲", img:"images/r4.jpg", alt:"Chickpea stew served with bread and herbs", hue:"#EBC9A3", diets:["Vegan","Gluten-Free","Spicy"], time:40, level:"Medium", perServing:7.75, rating:4.8, blurb:"A warming one-pot stew with harissa heat and herbs.", ingredients:["Chickpeas","Harissa paste","Crushed tomatoes","Spinach","Red onion"], steps:["Soften onion, add harissa.","Add tomatoes and chickpeas, simmer 25 minutes.","Fold in spinach and serve."] },
  { id:"r5", name:"Herb Garden Pasta", emoji:"🌿", img:"images/r5.jpg", alt:"Pasta coated in green herb sauce with grated cheese", hue:"#CFE0C0", diets:["Vegetarian"], time:22, level:"Easy", perServing:8.00, rating:4.6, blurb:"Pasta tossed with a bright herb, lemon and pea sauce.", ingredients:["Pasta","Peas","Basil","Mint","Lemon","Ricotta"], steps:["Cook pasta, save a cup of water.","Blitz herbs, peas and lemon.","Toss with ricotta and pasta water."] },
  { id:"r6", name:"Ginger Lime Tofu Bowls", emoji:"🥗", img:"images/r6.jpg", alt:"Rice bowl with tofu, black beans, vegetables, and chopsticks", hue:"#D8E6C3", diets:["Vegan","Gluten-Free"], time:30, level:"Medium", perServing:8.75, rating:4.7, blurb:"Crisp tofu, ginger-lime dressing, crunchy vegetables.", ingredients:["Firm tofu","Rice","Ginger","Lime","Carrots","Edamame"], steps:["Press and crisp the tofu.","Whisk ginger, lime and soy dressing.","Build bowls over rice and drizzle."] },
  { id:"r7", name:"Tomato Basil Shakshuka", emoji:"🍅", img:"images/r7.jpg", alt:"Shakshuka in a skillet with eggs, bread, and herbs", hue:"#F2B8A0", diets:["Vegetarian","Gluten-Free","Spicy"], time:28, level:"Easy", perServing:7.50, rating:4.9, blurb:"Eggs poached in spiced tomato sauce, made for dipping.", ingredients:["Eggs","Crushed tomatoes","Bell pepper","Cumin","Feta","Crusty bread"], steps:["Simmer spiced tomato sauce 15 minutes.","Crack in eggs, cover until just set.","Top with feta and serve with bread."] },
  { id:"r8", name:"Mushroom Sage Risotto", emoji:"🍄", img:"images/r8.jpg", alt:"Mushroom risotto served on an oval plate", hue:"#E3D5BE", diets:["Vegetarian","Gluten-Free"], time:45, level:"Hard", perServing:10.25, rating:4.8, blurb:"Slow-stirred risotto with mushrooms and crispy sage.", ingredients:["Arborio rice","Mixed mushrooms","Vegetable stock","Sage","Parmesan"], steps:["Brown mushrooms, set aside.","Stir stock into rice a ladle at a time.","Fold mushrooms back in with parmesan."] },
  { id:"r9", name:"Citrus Herb Shrimp", emoji:"🍤", img:"images/r9.jpg", alt:"Grilled shrimp topped with fresh herbs", hue:"#F6DCAE", diets:["Gluten-Free"], time:18, level:"Easy", perServing:11.50, rating:4.7, blurb:"Fast shrimp with citrus, garlic and a herb finish.", ingredients:["Shrimp","Orange","Garlic","Parsley","Chili flakes"], steps:["Marinate shrimp in citrus 10 minutes.","Sear 2 minutes per side.","Finish with herbs and chili."] },
  { id:"r10", name:"Roasted Veg & Tahini Tray", emoji:"🥕", img:"images/r10.jpg", alt:"Roasted broccoli and carrots in a baking tray", hue:"#EAD9B8", diets:["Vegan","Gluten-Free"], time:38, level:"Easy", perServing:7.25, rating:4.5, blurb:"One tray of roasted vegetables with lemon tahini.", ingredients:["Sweet potato","Chickpeas","Cauliflower","Tahini","Lemon"], steps:["Roast vegetables at 425F for 30 minutes.","Whisk tahini, lemon and water.","Drizzle and serve over grains."] },
  { id:"r11", name:"Chicken Korma, Gentle Heat", emoji:"🍛", img:"images/r11.jpg", alt:"Chicken curry served with basmati rice, lime, and chilies", hue:"#F0D9A8", diets:["Gluten-Free","Spicy"], time:42, level:"Medium", perServing:10.00, rating:4.8, blurb:"Creamy, gently spiced korma with basmati rice.", ingredients:["Chicken breast","Korma paste","Coconut milk","Almonds","Basmati rice"], steps:["Brown chicken with paste.","Simmer in coconut milk 20 minutes.","Serve over rice with almonds."] },
  { id:"r12", name:"Pear & Walnut Salad Kit", emoji:"🍐", img:"images/r12.jpg", alt:"Pear, walnut, cheese, and leafy vegetable salad", hue:"#DCE8CC", diets:["Vegetarian","Gluten-Free"], time:15, level:"Easy", perServing:6.95, rating:4.4, blurb:"A crisp starter kit with honey dressing on the side.", ingredients:["Pears","Walnuts","Mixed greens","Goat cheese","Honey"], steps:["Toast walnuts.","Slice pears just before serving.","Dress, toss and top with cheese."] },
];
const DIETS = ["All","Vegetarian","Vegan","Gluten-Free","Spicy"];
const money = n => "$" + n.toFixed(2);

/* ---- COMPONENT: Header. Props: view, boxCount, callbacks. ---- */
function Header({ view, setView, boxCount, openBox }) {
  return (
    <React.Fragment>
      <div className="topbar">Free delivery on boxes over $60 · Use code SAGE10 for 10% off your first box</div>
      <header className="site"><nav className="nav">
        <a className="logo" href="#" onClick={e=>{e.preventDefault();setView("menu");}}>Saffron <span>&amp; Sage</span></a>
        <div className="navlinks">
          <button className={view==="menu"?"active":""} onClick={()=>setView("menu")}>This Week's Menu</button>
          <button className={view==="how"?"active":""} onClick={()=>setView("how")}>How It Works</button>
          <button className={view==="checkout"?"active":""} onClick={()=>setView("checkout")}>Checkout</button>
          <button className="boxbtn" onClick={openBox}>🧺 My Box ({boxCount})</button>
        </div>
      </nav></header>
    </React.Fragment>
  );
}

/* ---- COMPONENT: FilterBar. Controlled inputs: values come from App
   state, changes flow back up through props (one-way data flow). ---- */
function FilterBar({ diet, setDiet, query, setQuery, sort, setSort, servings, setServings, count }) {
  return (
    <div>
      <div className="filters" role="search">
        <input aria-label="Search recipes" placeholder="Search recipes or ingredients…" value={query} onChange={e=>setQuery(e.target.value)} />
        <select aria-label="Sort recipes" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="popular">Most loved</option><option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option><option value="time">Quickest first</option>
        </select>
        <select aria-label="Servings per recipe" value={servings} onChange={e=>setServings(Number(e.target.value))}>
          <option value={2}>2 servings</option><option value={4}>4 servings</option>
        </select>
      </div>
      <div className="filters">{DIETS.map(d=>(
        <button key={d} className={"chip"+(diet===d?" active":"")} onClick={()=>setDiet(d)}>{d}</button>))}
        <span aria-live="polite">{count} recipe{count===1?"":"s"} this week</span>
      </div>
    </div>
  );
}

/* ---- COMPONENT: RecipeCard. One card per recipe; price reacts to the
   servings prop, so changing servings re-renders every card price. ---- */
function RecipeCard({ r, servings, onAdd, onView, isFav, onFav }) {
  const price = r.perServing * servings;
  return (
    <article className="card">
      <div className="art" style={{background:r.hue}}><img src={r.img} alt={r.alt} loading="lazy" /></div>
      <div className="body">
        <button className="fav" aria-label={"Save "+r.name} onClick={()=>onFav(r.id)}>{isFav?"❤️":"🤍"}</button>
        <h3>{r.name}</h3>
        <div className="meta">{r.diets.join(" · ")} · {r.time} min · {r.level} · ★ {r.rating}</div>
        <p>{r.blurb}</p>
        <div className="price">{money(price)} <small>for {servings}</small></div>
        <div className="row">
          <button className="addbtn" onClick={()=>onAdd(r)}>Add to box</button>
          <button className="ghost" onClick={()=>onView(r)}>Details</button>
        </div>
      </div>
    </article>
  );
}

/* ---- COMPONENT: RecipeModal ---- */
function RecipeModal({ r, servings, onClose, onAdd }) {
  if (!r) return null;
  return (
    <div className="modalback" onClick={onClose}><div className="modal" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}>
      <img className="modalimg" src={r.img} alt={r.alt} />
      <h2>{r.emoji} {r.name}</h2>
      <p className="meta">{r.diets.join(" · ")} · {r.time} minutes · {r.level} · ★ {r.rating}</p>
      <p>{r.blurb}</p><h3>What's in the box</h3>
      <ul>{r.ingredients.map(i=><li key={i}>{i}</li>)}</ul>
      <h3>How it cooks</h3><ol>{r.steps.map(s=><li key={s}>{s}</li>)}</ol>
      <p className="price">{money(r.perServing*servings)} for {servings} servings</p>
      <div className="row" style={{display:"flex",gap:".5rem"}}>
        <button className="addbtn" onClick={()=>{onAdd(r);onClose();}}>Add to box</button>
        <button className="ghost" onClick={onClose}>Close</button>
      </div>
    </div></div>
  );
}

/* ---- COMPONENT: BoxDrawer. Quantity controls call back up to App,
   which owns the box state — the drawer itself stores nothing. ---- */
function BoxDrawer({ open, items, servings, changeQty, removeItem, subtotal, goCheckout, onClose }) {
  if (!open) return null;
  return (
    <aside className="drawer" aria-label="Your box">
      <h2>Your box</h2>
      {items.length===0 ? <p>Your box is empty. Add a recipe from this week's menu and it will show up here, saved even if you close the tab.</p> :
      items.map(({r,qty})=>(
        <div key={r.id} style={{borderBottom:"1px solid #EFE3D3",padding:".6rem 0"}}>
          <strong>{r.emoji} {r.name}</strong>
          <div>{money(r.perServing*servings)} × {qty}</div>
          <div className="qty">
            <button aria-label="Decrease" onClick={()=>changeQty(r.id,-1)}>−</button><span>{qty}</span>
            <button aria-label="Increase" onClick={()=>changeQty(r.id,1)}>+</button>
            <button className="ghost" onClick={()=>removeItem(r.id)}>Remove</button>
          </div>
        </div>))}
      <div className="summary" style={{marginTop:"1rem"}}>
        <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
        <div><span>Delivery</span><span>{subtotal>=60||subtotal===0?"Free":money(6.95)}</span></div>
      </div>
      <div style={{display:"flex",gap:".5rem",marginTop:"1rem"}}>
        <button className="addbtn" disabled={items.length===0} onClick={goCheckout}>Go to checkout</button>
        <button className="ghost" onClick={onClose}>Keep browsing</button>
      </div>
    </aside>
  );
}

/* ---- COMPONENT: FaqItem / accordion (open state lives per item) ---- */
function FaqItem({ q, a }) {
  const [open,setOpen]=useState(false);
  return (<div className="faq"><button aria-expanded={open} onClick={()=>setOpen(!open)}>{q} {open?"−":"+"}</button>
  {open && <p>{a}</p>}</div>);
}

/* ---- COMPONENT: NewsletterForm with validation + duplicate memory ---- */
function NewsletterForm() {
  const [email,setEmail]=useState(""); const [msg,setMsg]=useState("");
  const submit=e=>{ e.preventDefault();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ setMsg("Please enter a valid email address."); return; }
    const saved=JSON.parse(localStorage.getItem("ss-news")||"[]");
    if(saved.includes(email.toLowerCase())){ setMsg("You're already on the Sunday Menu Letter — welcome back."); return; }
    saved.push(email.toLowerCase()); localStorage.setItem("ss-news",JSON.stringify(saved));
    setMsg("You're in! The Sunday Menu Letter arrives this weekend."); setEmail("");
  };
  return (<form onSubmit={submit}><label htmlFor="nl">Get the Sunday Menu Letter</label>
    <input id="nl" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
    {msg && <p className={msg.startsWith("Please")?"err":""}>{msg}</p>}
    <button className="addbtn" type="submit" style={{marginTop:".5rem"}}>Join the letter</button></form>);
}

/* ---- COMPONENT: CheckoutForm. Validates every field, applies the
   SAGE10 promo, and ends in a real confirmation with an order number. ---- */
function CheckoutForm({ items, servings, subtotal, onConfirm }) {
  const [f,setF]=useState({name:"",email:"",address:"",city:"",zip:"",card:"",expiry:"",cvc:"",promo:""});
  const [errs,setErrs]=useState({}); const [promoMsg,setPromoMsg]=useState("");
  const set=(k,v)=>setF({...f,[k]:v});
  const discount = f.promo.trim().toUpperCase()==="SAGE10" ? subtotal*0.10 : 0;
  const delivery = subtotal===0?0:(subtotal-discount>=60?0:6.95);
  const total = Math.max(0, subtotal-discount+delivery);
  const applyPromo=()=> setPromoMsg(f.promo.trim().toUpperCase()==="SAGE10" ? "SAGE10 applied — 10% off." : "That code isn't one of ours. Try SAGE10.");
  const submit=e=>{ e.preventDefault(); const er={};
    if(f.name.trim().length<2) er.name="Please enter the name for the delivery.";
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email="Please enter a valid email.";
    if(f.address.trim().length<5) er.address="Please enter a street address.";
    if(f.city.trim().length<2) er.city="Please enter a city.";
    if(!/^\d{5}(-\d{4})?$/.test(f.zip.trim())) er.zip="Please enter a valid ZIP code.";
    if(!/^\d{16}$/.test(f.card.replace(/\s/g,""))) er.card="Please enter the 16-digit card number.";
    const m=f.expiry.match(/^(\d{2})\/(\d{2})$/);
    if(!m || Number(m[1])<1 || Number(m[1])>12) er.expiry="Use MM/YY.";
    else { const exp=new Date(2000+Number(m[2]),Number(m[1]),0); if(exp<new Date()) er.expiry="That card date is in the past."; }
    if(!/^\d{3,4}$/.test(f.cvc.trim())) er.cvc="Please enter the 3 or 4 digit code.";
    if(items.length===0) er.box="Your box is empty — add a recipe first.";
    setErrs(er); if(Object.keys(er).length) return;
    onConfirm({ name:f.name, email:f.email, total, ref:"SS-"+Math.random().toString(36).slice(2,8).toUpperCase() });
  };
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
      <form onSubmit={submit} noValidate>
        <h2>Delivery &amp; payment</h2>
        {errs.box && <p className="err">{errs.box}</p>}
        <label>Full name</label><input value={f.name} onChange={e=>set("name",e.target.value)}/>{errs.name&&<p className="err">{errs.name}</p>}
        <label>Email</label><input value={f.email} onChange={e=>set("email",e.target.value)}/>{errs.email&&<p className="err">{errs.email}</p>}
        <label>Street address</label><input value={f.address} onChange={e=>set("address",e.target.value)}/>{errs.address&&<p className="err">{errs.address}</p>}
        <label>City</label><input value={f.city} onChange={e=>set("city",e.target.value)}/>{errs.city&&<p className="err">{errs.city}</p>}
        <label>ZIP</label><input value={f.zip} onChange={e=>set("zip",e.target.value)}/>{errs.zip&&<p className="err">{errs.zip}</p>}
        <label>Card number</label><input inputMode="numeric" placeholder="1234 5678 9012 3456" value={f.card} onChange={e=>set("card",e.target.value)}/>{errs.card&&<p className="err">{errs.card}</p>}
        <label>Expiry (MM/YY)</label><input placeholder="MM/YY" value={f.expiry} onChange={e=>set("expiry",e.target.value)}/>{errs.expiry&&<p className="err">{errs.expiry}</p>}
        <label>CVC</label><input inputMode="numeric" value={f.cvc} onChange={e=>set("cvc",e.target.value)}/>{errs.cvc&&<p className="err">{errs.cvc}</p>}
        <label>Promo code</label><input value={f.promo} onChange={e=>set("promo",e.target.value)} placeholder="SAGE10"/>
        <button type="button" className="ghost" onClick={applyPromo} style={{marginTop:".4rem"}}>Apply code</button>
        {promoMsg && <p>{promoMsg}</p>}
        <button className="addbtn" type="submit" style={{marginTop:"1rem",width:"100%"}}>Place order — {money(total)}</button>
      </form>
      <div><h2>Order summary</h2><div className="summary">
        {items.map(({r,qty})=><div key={r.id}><span>{r.name} × {qty}</span><span>{money(r.perServing*servings*qty)}</span></div>)}
        <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
        {discount>0 && <div><span>SAGE10 (10% off)</span><span>−{money(discount)}</span></div>}
        <div><span>Delivery</span><span>{delivery===0?"Free":money(delivery)}</span></div>
        <div style={{borderTop:"2px solid #EFE3D3",fontWeight:"bold"}}><span>Total</span><span>{money(total)}</span></div>
        <p>Delivery is free once your box reaches $60 after discounts. Servings: {servings} per recipe.</p>
      </div></div>
    </div>
  );
}

/* ---- ROOT COMPONENT: App owns the shared state (view, box, favorites)
   and passes it down as props — the classic React pattern. ---- */
function App() {
  const [view,setView]=useState("menu");
  const [diet,setDiet]=useState("All"); const [query,setQuery]=useState("");
  const [sort,setSort]=useState("popular"); const [servings,setServings]=useState(2);
  const [box,setBox]=useState(()=>{ try{return JSON.parse(localStorage.getItem("ss-box")||"{}");}catch(e){return{};} });
  const [favs,setFavs]=useState(()=>{ try{return JSON.parse(localStorage.getItem("ss-favs")||"[]");}catch(e){return[];} });
  const [drawer,setDrawer]=useState(false); const [selected,setSelected]=useState(null);
  const [order,setOrder]=useState(null);
  /* useEffect: persist the box and favorites whenever they change. */
  useEffect(()=>{ localStorage.setItem("ss-box",JSON.stringify(box)); },[box]);
  useEffect(()=>{ localStorage.setItem("ss-favs",JSON.stringify(favs)); },[favs]);
  const items = Object.entries(box).map(([id,qty])=>({r:RECIPES.find(x=>x.id===id),qty})).filter(x=>x.r);
  const boxCount = items.reduce((s,x)=>s+x.qty,0);
  const subtotal = items.reduce((s,x)=>s+x.r.perServing*servings*x.qty,0);
  const add = r => setBox({...box,[r.id]:(box[r.id]||0)+1});
  const changeQty=(id,d)=>{ const q=(box[id]||0)+d; const next={...box}; if(q<=0) delete next[id]; else next[id]=q; setBox(next); };
  const removeItem=id=>{ const next={...box}; delete next[id]; setBox(next); };
  const toggleFav=id=> setFavs(favs.includes(id)?favs.filter(x=>x!==id):[...favs,id]);
  /* useMemo: filtering/sorting only recomputes when its inputs change. */
  const visible = useMemo(()=>{ let list=RECIPES.filter(r=>(diet==="All"||r.diets.includes(diet)) &&
      (r.name+" "+r.ingredients.join(" ")).toLowerCase().includes(query.toLowerCase()));
    if(sort==="price-low") list=[...list].sort((a,b)=>a.perServing-b.perServing);
    if(sort==="price-high") list=[...list].sort((a,b)=>b.perServing-a.perServing);
    if(sort==="time") list=[...list].sort((a,b)=>a.time-b.time);
    if(sort==="popular") list=[...list].sort((a,b)=>b.rating-a.rating);
    return list; },[diet,query,sort]);
  const confirm = o => { setOrder(o);
    const orders=JSON.parse(localStorage.getItem("ss-orders")||"[]"); orders.push({...o,at:new Date().toISOString()});
    localStorage.setItem("ss-orders",JSON.stringify(orders)); setBox({}); setView("done"); window.scrollTo(0,0); };
  return (
    <React.Fragment>
      <Header view={view} setView={setView} boxCount={boxCount} openBox={()=>setDrawer(true)} />
      {view==="menu" && (<React.Fragment>
        <section className="hero"><h1>Dinner, decided.</h1>
          <p>Saffron &amp; Sage sends pre-measured ingredients and a calm, clear recipe card for the week you actually have. Pick your recipes, build your box, and dinner stops being a daily decision.</p>
          <button className="cta" onClick={()=>document.getElementById("menu").scrollIntoView({behavior:"smooth"})}>Browse this week's menu</button>
          <div className="stats"><div><strong>12</strong> recipes weekly</div><div><strong>15–45</strong> minutes to cook</div><div><strong>$6.95</strong> delivery, free over $60</div></div>
          <img className="heroimg" src="images/hero.jpg" alt="Overhead view of a shared table filled with salads, bread, and plated dishes" />
        </section>
        <main className="wrap" id="menu">
          <div className="banner">Demo note: this is a React component app running entirely in your browser. Your box, favorites and orders save in this browser only — no account, no real payment.</div>
          <h2>This week's menu</h2>
          <FilterBar diet={diet} setDiet={setDiet} query={query} setQuery={setQuery} sort={sort} setSort={setSort} servings={servings} setServings={setServings} count={visible.length} />
          {visible.length===0 ? <p>No recipes match that search this week. Try a different ingredient, or clear the diet filter.</p> :
          <div className="grid">{visible.map(r=><RecipeCard key={r.id} r={r} servings={servings} onAdd={add} onView={setSelected} isFav={favs.includes(r.id)} onFav={toggleFav} />)}</div>}
        </main></React.Fragment>)}
      {view==="how" && (<main className="wrap"><h2>How it works</h2>
        <ol style={{lineHeight:1.7}}><li><strong>Pick your recipes</strong> from the weekly menu of 12 — filter by diet, search by ingredient.</li>
        <li><strong>Choose 2 or 4 servings</strong> per recipe; every price on the page updates at once (that is React state doing its job).</li>
        <li><strong>Build your box</strong> — it saves as you go and waits for you if you close the tab.</li>
        <li><strong>Check out once</strong> — delivery is $6.95, free over $60, and SAGE10 takes 10% off a first box.</li></ol>
        <h2>Common questions</h2>
        <FaqItem q="Can I skip a week?" a="Yes. There is no subscription lock-in in this demo concept — you order the weeks you want, and your saved favorites wait for you." />
        <FaqItem q="What if I need 4 servings of one recipe and 2 of another?" a="Servings are set for the whole box in this version, so every recipe is priced for the same household size. It keeps the box simple to pack." />
        <FaqItem q="Is the food spicy?" a="Recipes marked Spicy say so on the card before you add them, and the detail view lists every ingredient so you can check first." />
        <div style={{maxWidth:440}}><NewsletterForm /></div>
      </main>)}
      {view==="checkout" && (<main className="wrap"><h2>Checkout</h2>
        <CheckoutForm items={items} servings={servings} subtotal={subtotal} onConfirm={confirm} /></main>)}
      {view==="done" && order && (<main className="wrap"><div className="ok">
        <h2>Order confirmed — thank you, {order.name.split(" ")[0]}.</h2>
        <p>Your order reference is <strong>{order.ref}</strong>. A confirmation was saved for {order.email} in this browser, and your box total was <strong>{money(order.total)}</strong>. Your Saffron &amp; Sage box arrives Thursday between 4 and 8 PM.</p>
        <button className="addbtn" onClick={()=>setView("menu")}>Plan another week</button>
      </div></main>)}
      <RecipeModal r={selected} servings={servings} onClose={()=>setSelected(null)} onAdd={add} />
      <BoxDrawer open={drawer} items={items} servings={servings} changeQty={changeQty} removeItem={removeItem} subtotal={subtotal} goCheckout={()=>{setDrawer(false);setView("checkout");}} onClose={()=>setDrawer(false)} />
      <footer><p>Saffron &amp; Sage Kitchen — a fictional meal-box service. Original portfolio concept by Brittany Nation · Built with React components, HTML and CSS · Sketch / Webflow design workflow</p></footer>
    </React.Fragment>
  );
}
/* React 18 entry point: createRoot renders <App/> into #root. */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
