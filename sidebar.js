/* ==========================================================================
   Menu lateral do site informativo (New Seas OP) dentro da Ficha.
   - Botão "☰ Site do RPG" é inserido no topo do <header>.
   - O menu abre como gaveta lateral por cima da ficha (não mexe no layout).
   - Todos os links abrem em NOVA ABA, para a ficha continuar aberta.
   Para editar o menu, mexa só no array MENU_ITEMS abaixo.
   ========================================================================== */
(function () {
    "use strict";

    const BASE = "https://herikliz.github.io/New-Seas-RPG/";
    const p = (file) => BASE + file;

    // href "#" = item que só abre/fecha o submenu (não leva a lugar nenhum)
    const MENU_ITEMS = [
        {
            t: "INÍCIO",
            href: p("index.html"),
            children: [{ t: "COMO JOGAR O RPG?", href: p("como-jogar.html") }],
        },
        { t: "ÁREA RESTRITA", href: p("area-restrita.html") },
        { t: "REGRAS", href: p("regras.html") },
        {
            t: "CRIAÇÃO DE PERSONAGEM",
            href: p("criacao-de-personagem.html"),
            children: [
                { t: "APARÊNCIAS", href: p("aparencias.html") },
                { t: "CLASSES", href: p("classes.html") },
                {
                    t: "ESTILOS DE LUTA",
                    href: p("estilos-de-luta.html"),
                    children: [{ t: "TÉCNICAS", href: p("tecnicas.html") }],
                },
                { t: "HABILIDADES ÚNICAS", href: p("habilidades-unicas.html") },
                { t: "LINHAGENS", href: p("linhagens.html") },
                { t: "RAÇAS", href: p("racas.html") },
                // É esta própria página: aparece destacado ("você está aqui") e não recarrega nada.
                { t: "FICHA AUTOMÁTICA", href: "https://herikliz.github.io/New-Seas-RPG-Ficha/", current: true },
            ],
        },
        {
            t: "ORGANIZAÇÕES",
            href: "#",
            children: [
                { t: "GOVERNO MUNDIAL", href: p("governo-mundial.html") },
                { t: "MARINHA", href: p("marinha.html") },
                { t: "PIRATA", href: p("pirata.html") },
                { t: "VANGUARDA POPULAR REVOLUCIONÁRIA", href: p("vanguarda-popular-revolucionaria.html") },
                { t: "TRIPULAÇÕES", href: p("tripulacoes.html") },
            ],
        },
        {
            t: "FORÇA VITAL",
            href: "#",
            children: [
                { t: "ATRIBUTOS", href: p("atributos.html") },
                { t: "AKUMA NO MI", href: p("atributos-akuma-no-mi.html") },
                { t: "ESTAMINA", href: p("estamina.html") },
                { t: "HAKI", href: p("haki.html") },
            ],
        },
        {
            t: "EVOLUÇÃO",
            href: "#",
            children: [
                { t: "EXTRA-NARRADA", href: p("extra-narrada.html") },
                { t: "MISSÕES", href: p("missoes.html") },
                { t: "NPCS ESPECIAIS", href: p("npcs-especiais.html") },
                { t: "RECRUTAR NPCS", href: p("recrutar-npcs.html") },
                { t: "TRABALHO", href: p("trabalho.html") },
                { t: "TREINO", href: p("treino.html") },
            ],
        },
        {
            t: "GEOGRAFIA",
            href: p("geografia.html"),
            children: [
                { t: "EAST BLUE", href: p("east-blue.html") },
                { t: "SOUTH BLUE", href: p("south-blue.html") },
                { t: "WEST BLUE", href: p("west-blue.html") },
                { t: "NORTH BLUE", href: p("north-blue.html") },
                { t: "PARAÍSO", href: p("paraiso.html") },
                { t: "NOVO MUNDO", href: p("novo-mundo.html") },
                { t: "CALM BELT", href: p("calm-belt.html") },
                { t: "ILHAS SEM LOCALIZAÇÃO EXATA", href: p("ilhas-sem-localizacao-exata.html") },
            ],
        },
        {
            t: "LOJA GERAL",
            href: p("loja-geral.html"),
            children: [
                { t: "ITENS EXCLUSIVOS", href: p("itens-exclusivos.html") },
                { t: "LOJA DE BARCOS", href: p("loja-de-barcos.html") },
                { t: "LOJA DE CARPINTEIROS", href: p("loja-de-carpinteiros.html") },
                { t: "LOJA DE CRIADORES", href: p("loja-de-criadores.html") },
                { t: "LOJA ESPECIAL", href: p("loja-especial.html") },
                {
                    t: "LOJA DE FERREIROS",
                    href: p("loja-de-ferreiros.html"),
                    children: [{ t: "ESCUDOS", href: p("escudos.html") }],
                },
                { t: "LOJA DE MEITŌS", href: p("loja-de-meitos.html") },
                {
                    t: "SUBMUNDO",
                    href: p("submundo.html"),
                    children: [{ t: "AKUMA NO MI", href: p("akuma-no-mi.html") }],
                },
            ],
        },
        { t: "IMPEL DOWN", href: p("impel-down.html") },
        {
            t: "JORNAL",
            href: p("jornal.html"),
            children: [
                { t: "JORNAIS PROMOCIONAIS", href: p("jornais-promocionais.html") },
                { t: "PROCURADOS", href: p("procurados.html") },
                { t: "IMPERADORES DOS MARES", href: p("imperadores-dos-mares.html") },
            ],
        },
        {
            t: "MECÂNICAS DO RPG",
            href: "#",
            children: [
                { t: "AÇÃO OCULTA", href: p("acao-oculta.html") },
                { t: "CAÇADAS", href: p("cacadas.html") },
                { t: "CRIAÇÃO DE EXPERIMENTOS", href: p("criacao-de-experimentos.html") },
                { t: "CRIAÇÃO DE MEITŌS", href: p("criacao-de-meitos.html") },
                { t: "DESCOBERTA DE ARTEFATOS", href: p("descoberta-de-artefatos.html") },
                { t: "DOMINAÇÕES", href: p("dominacoes.html") },
                { t: "INVESTIMENTO", href: p("investimento.html") },
                { t: "MÉDICOS", href: p("medicos.html") },
                { t: "SANGUE", href: p("sangue.html") },
            ],
        },
    ];

    /* ---------------------------- utilidades ---------------------------- */

    // minúsculo e sem acento, para a pesquisa achar "acao" em "AÇÃO"
    const norm = (s) =>
        s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    function el(tag, className, text) {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    /* ---------------------------- tema (cores) ---------------------------- */
    // Mesmos temas do site informativo. Como a ficha e o site ficam no mesmo
    // domínio (herikliz.github.io), o tema escolhido lá vale aqui também.
    // Chaves lidas: "selectedTheme" e "customThemeColors". Sem nada salvo = escuro.
    const THEMES = {
        claro:    { bg: "#f0f8ff", text: "#2d3748", sidebar: "#ffffff", border: "#e2e8f0", link: "#4a5568", hoverBg: "#edf2f7", accent: "#d32f2f", subMenu: "#f8fafc" },
        escuro:   { bg: "#121212", text: "#e0e0e0", sidebar: "#1e1e1e", border: "#333333", link: "#b0b0b0", hoverBg: "#2d3748", accent: "#f1c40f", subMenu: "#1a1a1a" },
        oceano:   { bg: "#0f172a", text: "#e2e8f0", sidebar: "#1e293b", border: "#334155", link: "#94a3b8", hoverBg: "#334155", accent: "#38bdf8", subMenu: "#0f172a" },
        floresta: { bg: "#064e3b", text: "#ecfdf5", sidebar: "#065f46", border: "#047857", link: "#a7f3d0", hoverBg: "#047857", accent: "#34d399", subMenu: "#064e3b" },
        carmesim: { bg: "#450a0a", text: "#fef2f2", sidebar: "#7f1d1d", border: "#991b1b", link: "#fecaca", hoverBg: "#991b1b", accent: "#f87171", subMenu: "#450a0a" },
        marinha:  { bg: "#ffffff", text: "#1e3a8a", sidebar: "#eff6ff", border: "#bfdbfe", link: "#1e40af", hoverBg: "#dbeafe", accent: "#2563eb", subMenu: "#eff6ff" },
        deserto:  { bg: "#fef3c7", text: "#78350f", sidebar: "#fde68a", border: "#fcd34d", link: "#92400e", hoverBg: "#fef3c7", accent: "#d97706", subMenu: "#fde68a" },
        sakura:   { bg: "#fdf2f8", text: "#831843", sidebar: "#fce7f3", border: "#fbcfe8", link: "#9d174d", hoverBg: "#fdf2f8", accent: "#db2777", subMenu: "#fce7f3" },
        trevas:   { bg: "#2e1065", text: "#f5f3ff", sidebar: "#3b0764", border: "#581c87", link: "#ddd6fe", hoverBg: "#581c87", accent: "#a855f7", subMenu: "#3b0764" },
        ouro:     { bg: "#000000", text: "#fef08a", sidebar: "#1a1a1a", border: "#ca8a04", link: "#fde047", hoverBg: "#333333", accent: "#eab308", subMenu: "#1a1a1a" },
    };

    function applyTheme() {
        let t = THEMES.escuro;
        try {
            const saved = localStorage.getItem("selectedTheme");
            if (saved === "custom") {
                const c = JSON.parse(localStorage.getItem("customThemeColors"));
                if (c && c.sidebar) t = Object.assign({}, THEMES.escuro, c);
            } else if (saved && THEMES[saved]) {
                t = THEMES[saved];
            }
        } catch (e) {
            /* storage bloqueado ou JSON inválido: fica no tema escuro */
        }
        const r = document.documentElement.style;
        r.setProperty("--sbm-page-bg", t.bg);
        r.setProperty("--sbm-text", t.text);
        r.setProperty("--sbm-bg", t.sidebar);
        r.setProperty("--sbm-border", t.border);
        r.setProperty("--sbm-link", t.link);
        r.setProperty("--sbm-hover-bg", t.hoverBg);
        r.setProperty("--sbm-accent", t.accent);
        r.setProperty("--sbm-sub-bg", t.subMenu || t.sidebar);
    }

    /* ------------------------ montagem do menu -------------------------- */

    const nodes = []; // lista plana de todos os itens (para pesquisa)
    let closeMenu = function () {}; // trocada pela função real dentro de init()

    function buildItem(item, depth) {
        const li = el("li", "sbm-item sbm-depth-" + Math.min(depth, 2));
        const node = { li, text: norm(item.t), children: [], open: false };
        const hasKids = Array.isArray(item.children) && item.children.length > 0;
        const isLink = item.href && item.href !== "#";

        const row = el("div", "sbm-row");

        if (isLink) {
            const a = el("a", "sbm-link", item.t);
            a.href = item.href;
            if (item.current) {
                // página atual: marca "você está aqui" e só fecha o menu (não recarrega a ficha)
                a.classList.add("sbm-current");
                a.setAttribute("aria-current", "page");
                a.appendChild(el("span", "sbm-here", "● você está aqui"));
                a.addEventListener("click", (e) => {
                    e.preventDefault();
                    closeMenu();
                });
                node.isCurrent = true;
            } else {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }
            row.appendChild(a);
        } else {
            // grupo sem página própria: o texto inteiro abre/fecha o submenu
            const b = el("button", "sbm-link sbm-group-label", item.t);
            b.type = "button";
            b.addEventListener("click", () => setOpen(node, !node.open));
            row.appendChild(b);
            node.labelBtn = b;
        }

        if (hasKids) {
            const arrow = el("button", "sbm-arrow", "▼");
            arrow.type = "button";
            arrow.setAttribute("aria-label", "Abrir/fechar submenu de " + item.t);
            arrow.setAttribute("aria-expanded", "false");
            arrow.addEventListener("click", () => setOpen(node, !node.open));
            row.appendChild(arrow);
            node.arrow = arrow;
        }
        li.appendChild(row);

        if (hasKids) {
            const ul = el("ul", "sbm-sub");
            item.children.forEach((c) => {
                const child = buildItem(c, depth + 1);
                ul.appendChild(child.li);
                node.children.push(child);
            });
            li.appendChild(ul);
        }

        nodes.push(node);
        return node;
    }

    function setOpen(node, open) {
        node.open = open;
        node.li.classList.toggle("sbm-open", open);
        if (node.arrow) node.arrow.setAttribute("aria-expanded", String(open));
        if (node.labelBtn) node.labelBtn.setAttribute("aria-expanded", String(open));
    }

    /* ----------------------------- pesquisa ----------------------------- */

    let savedOpenState = null; // lembra o que estava aberto antes de pesquisar

    function filterNode(node, q, forceShow) {
        const selfMatch = q === "" || node.text.includes(q);
        let childVisible = false;
        node.children.forEach((c) => {
            if (filterNode(c, q, forceShow || selfMatch)) childVisible = true;
        });
        const visible = forceShow || selfMatch || childVisible;
        node.li.hidden = !visible;
        if (q !== "" && node.children.length) setOpen(node, visible && (childVisible || selfMatch));
        return visible;
    }

    function applySearch(raw) {
        const q = norm(raw);
        if (q !== "" && savedOpenState === null) {
            savedOpenState = nodes.map((n) => n.open);
        }
        topNodes.forEach((n) => filterNode(n, q, false));
        if (q === "" && savedOpenState) {
            nodes.forEach((n, i) => setOpen(n, savedOpenState[i]));
            savedOpenState = null;
        }
        const anyVisible = topNodes.some((n) => !n.li.hidden);
        emptyMsg.hidden = anyVisible;
    }

    /* --------------------------- montagem geral -------------------------- */

    const topNodes = [];
    let emptyMsg;

    function init() {
        const container = document.getElementById("sidebar-container");
        if (!container || container.dataset.ready) return;
        container.dataset.ready = "1";
        applyTheme();

        // botão que abre o menu: pequeno, dentro da linha do título do cabeçalho
        // (assim não cria linha nova nem aumenta a altura do cabeçalho)
        const openBtn = el("button", "sbm-open-btn", "☰");
        openBtn.type = "button";
        openBtn.title = "Menu do site informativo";
        openBtn.setAttribute("aria-label", "Abrir o menu do site informativo");
        openBtn.setAttribute("aria-controls", "sbm-drawer");
        openBtn.setAttribute("aria-expanded", "false");
        const titleRow = document.querySelector("header > span");
        const header = document.querySelector("header");
        const statusDot = document.getElementById("db-status");
        // Fica ao lado da bolinha de status (depois de "Descolapsar Tudo"): no celular
        // essa linha tem folga, então o cabeçalho não ganha altura.
        if (titleRow) titleRow.insertBefore(openBtn, statusDot && statusDot.parentNode === titleRow ? statusDot : titleRow.firstChild);
        else if (header) header.insertBefore(openBtn, header.firstChild);
        else {
            openBtn.classList.add("sbm-floating");
            document.body.appendChild(openBtn);
        }

        const overlay = el("div", "sbm-overlay");

        const aside = el("aside", "sbm-drawer");
        aside.id = "sbm-drawer";
        aside.setAttribute("aria-label", "Menu do site informativo");
        aside.setAttribute("aria-hidden", "true");

        // topo: logo (igual ao do site) + botão de fechar
        const top = el("div", "sbm-logo-box");
        const logo = el("a", "sbm-logo", "New Seas OP");
        logo.href = p("index.html");
        logo.target = "_blank";
        logo.rel = "noopener noreferrer";
        const closeBtn = el("button", "sbm-close", "✕");
        closeBtn.type = "button";
        closeBtn.setAttribute("aria-label", "Fechar menu");
        top.append(logo, closeBtn);

        // pesquisa
        const searchWrap = el("div", "sbm-search");
        const search = document.createElement("input");
        search.type = "text";
        search.id = "menu-search";
        search.placeholder = "Pesquisar no menu...";
        search.setAttribute("autocomplete", "off");
        search.setAttribute("aria-label", "Pesquisar no menu");
        searchWrap.appendChild(search);

        // lista
        const nav = el("nav", "sbm-nav");
        const ul = el("ul", "sbm-list");
        MENU_ITEMS.forEach((it) => {
            const n = buildItem(it, 0);
            topNodes.push(n);
            ul.appendChild(n.li);
        });
        (function openPathToCurrent(list) {
            for (const n of list) {
                if (n.isCurrent) return true;
                if (openPathToCurrent(n.children)) {
                    setOpen(n, true);
                    return true;
                }
            }
            return false;
        })(topNodes);
        emptyMsg = el("p", "sbm-empty", "Nenhum resultado.");
        emptyMsg.hidden = true;
        nav.append(ul, emptyMsg);

        const note = el("div", "sbm-note", "Os links abrem em uma nova aba — sua ficha continua aberta aqui.");

        aside.append(top, searchWrap, nav, note);
        container.append(overlay, aside);

        /* abrir / fechar */
        function open() {
            aside.classList.add("sbm-show");
            overlay.classList.add("sbm-show");
            aside.setAttribute("aria-hidden", "false");
            openBtn.setAttribute("aria-expanded", "true");
            document.documentElement.classList.add("sbm-locked");
            // só foca a pesquisa em telas com mouse (no celular abriria o teclado)
            if (!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches)) {
                setTimeout(() => search.focus(), 50);
            }
        }
        function close() {
            aside.classList.remove("sbm-show");
            overlay.classList.remove("sbm-show");
            aside.setAttribute("aria-hidden", "true");
            openBtn.setAttribute("aria-expanded", "false");
            document.documentElement.classList.remove("sbm-locked");
            if (aside.contains(document.activeElement)) openBtn.focus();
        }

        closeMenu = close;
        openBtn.addEventListener("click", () => (aside.classList.contains("sbm-show") ? close() : open()));
        closeBtn.addEventListener("click", close);
        overlay.addEventListener("click", close);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && aside.classList.contains("sbm-show")) close();
        });
        search.addEventListener("input", () => applySearch(search.value));
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
