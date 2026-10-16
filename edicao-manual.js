/* ============================================================================
   EDIÇÃO MANUAL DA FICHA PRONTA  (só na Ficha de ADM)

   Como funciona:
   - Só existe quando a Ficha é aberta pelo modo ADM (o botão nem é criado nas outras).
   - Apertando "✏️ Edição manual", o texto da Ficha Pronta passa a poder ser editado
     direto, como na Ficha Vazia do site. O que for escrito ali é lido e passado para as
     caixinhas padronizadas (técnicas, nome, altura etc.), que continuam funcionando:
     qualquer edição feita depois nas caixinhas regenera a Ficha Pronta já com a
     formatação padrão.
   - O modo NUNCA fica salvo: ao trocar de personagem/ficha ou recarregar a página, ele
     volta a ficar desligado.
   - Um "↩️ Desfazer" volta ao estado anterior à última edição lida.

   O que é lido do texto:
   - TÉCNICAS (nome, descrição, efeito, não treinada com "~", e o estilo/Akuma pelo
     título « ... »). Uma técnica nova escrita logo abaixo de outra entra no mesmo estilo.
   - Nome, Altura, Idade, Sangue, Recrutado por, Discípulo de Combatente, Nacionalidade,
     Localização e Treinos Acumulados.
   O resto da Ficha Pronta (atributos, classes, Hakis, inventário, aparência etc.) é
   calculado/formatado pelas caixinhas e, se for escrito à mão, é ignorado.
   ============================================================================ */
(function () {
    "use strict";

    if (typeof MODO_ADMIN === "undefined" || !MODO_ADMIN) return;
    const resBox = document.getElementById("resBox");
    const wrapper = document.getElementById("wrapper-boxRes");
    if (!resBox || !wrapper) return;

    let ativo = false;
    let personagemAtivo = null; // o modo só vale para o personagem em que foi ligado
    let timer = null;
    const desfazer = []; // fotos do personagem antes de cada edição lida (no máximo 20)

    /* ------------------------------ botões ----------------------------------- */
    const barra = document.createElement("div");
    barra.style.cssText = "display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-bottom:10px;";
    const btnLigar = document.createElement("button");
    btnLigar.type = "button";
    btnLigar.className = "btn btn-outline";
    btnLigar.style.cssText = "color:var(--danger); border-color:var(--danger);";
    const btnDesfazer = document.createElement("button");
    btnDesfazer.type = "button";
    btnDesfazer.className = "btn btn-outline";
    btnDesfazer.style.cssText = "color:var(--warning); border-color:var(--warning); display:none;";
    btnDesfazer.textContent = "↩️ Desfazer edição manual";
    const aviso = document.createElement("span");
    aviso.style.cssText = "font-size:12px; opacity:.85;";
    barra.append(btnLigar, btnDesfazer, aviso);
    resBox.parentNode.insertBefore(barra, resBox);

    function atualizarBotoes() {
        btnLigar.textContent = ativo ? "✅ Edição manual LIGADA (clique para desligar)" : "✏️ Edição manual (ADM)";
        btnDesfazer.style.display = ativo && desfazer.length ? "" : "none";
        if (!ativo) aviso.textContent = "";
    }

    // Ocultamentos da Ficha Pronta: ao ligar, todos são desligados (tudo aparece, para a edição
    // ser completa); ao desligar, voltam como estavam.
    const FLAGS_OCULTAR = [
        "hidePersonality", "hideHistoria", "hideSexo", "hideGenero",
        "hideTecNome", "hideTecDesc", "hideTecEfeito", "hideNaoTreinadas", "showApenasNaoTreinadas",
    ];
    let ocultosGuardados = null;

    function mostrarTudo(info) {
        ocultosGuardados = { hiddenStyles: JSON.parse(JSON.stringify(info.hiddenStyles || [])) };
        FLAGS_OCULTAR.forEach((f) => { ocultosGuardados[f] = info[f]; info[f] = false; });
        info.hiddenStyles = [];
    }

    function restaurarOcultos(info) {
        if (!ocultosGuardados || !info) return;
        FLAGS_OCULTAR.forEach((f) => { info[f] = ocultosGuardados[f]; });
        info.hiddenStyles = ocultosGuardados.hiddenStyles;
        ocultosGuardados = null;
    }

    function ligar() {
        if (typeof isReadOnly !== "undefined" && isReadOnly) return;
        ativo = true;
        personagemAtivo = currentChar;
        window.__edicaoManualAtiva = true;
        mostrarTudo(currentChar.info);
        aplicarNasTelas(true);
        resBox.contentEditable = "plaintext-only";
        if (resBox.contentEditable !== "plaintext-only") resBox.contentEditable = "true";
        resBox.spellcheck = false;
        resBox.style.outline = "2px dashed var(--danger)";
        resBox.style.cursor = "text";
        aviso.textContent = "Escreva direto na Ficha Pronta; as caixinhas acompanham.";
        atualizarBotoes();
    }

    function desligar() {
        clearTimeout(timer);
        let personagem = personagemAtivo;
        ativo = false;
        personagemAtivo = null;
        window.__edicaoManualAtiva = false;
        if (personagem && personagem.info && ocultosGuardados) {
            restaurarOcultos(personagem.info);
            // fora do updateUI atual (o desligamento automático acontece dentro dele)
            setTimeout(() => {
                if (typeof saveData === "function") saveData();
                if (typeof renderTecnicas === "function") renderTecnicas();
                updateUI();
            }, 0);
        }
        desfazer.length = 0;
        resBox.contentEditable = "false";
        resBox.style.outline = "";
        resBox.style.cursor = "";
        atualizarBotoes();
    }

    btnLigar.addEventListener("click", () => (ativo ? desligar() : ligar()));
    btnDesfazer.addEventListener("click", () => {
        if (!ativo || !desfazer.length || currentChar !== personagemAtivo) return;
        let foto = JSON.parse(desfazer.pop());
        Object.keys(currentChar).forEach((k) => delete currentChar[k]);
        Object.assign(currentChar, foto);
        aplicarNasTelas(true);
        aviso.textContent = "Edição desfeita.";
        atualizarBotoes();
    });

    // Chamado pelo updateUI(): se o personagem mudou (outra aba/ficha), desliga sozinho.
    window.__edicaoManualVerificar = function () {
        if (ativo && currentChar !== personagemAtivo) desligar();
    };
    window.addEventListener("beforeunload", () => { ativo = false; });

    /* ------------------------------ leitura ---------------------------------- */
    const norm = (t) => String(t || "").replace(/~/g, "").replace(/\s+/g, " ").trim().toLowerCase();

    function idDoEstilo(nomeGrupo) {
        if (nomeGrupo === "Sem Estilo") return "";
        const mapa = window.__estilosMapa || {};
        let id = Object.keys(mapa).find((k) => mapa[k] === nomeGrupo);
        return id === undefined ? null : id; // null = não reconhecido
    }

    function fecharTecnica(cur, lista) {
        if (!cur) return;
        let corpo = cur.corpo;
        let desc = corpo;
        let efeito = [];
        let iEf = corpo.findIndex((l) => /^Efeito:/i.test(l));
        if (iEf >= 0) {
            desc = corpo.slice(0, iEf);
            efeito = corpo.slice(iEf);
            efeito[0] = efeito[0].replace(/^Efeito:\s*/i, "");
        } else if (corpo.length >= 2 && /^([+\-−±]\s*\d|\d[\d.,]*\s*%)/.test(corpo[corpo.length - 1])) {
            desc = corpo.slice(0, -1);
            efeito = [corpo[corpo.length - 1]];
        }
        lista.push({
            nome: cur.nome,
            desc: desc.join("\n"),
            efeito: efeito.join("\n"),
            naoTreinada: cur.naoTreinada,
            estilo: cur.estilo,
        });
    }

    function lerTecnicas(linhas) {
        let ini = linhas.findIndex((l) => /\[\s*𝐓ᴇ́ᴄɴɪᴄᴀs\s*\]/.test(l));
        if (ini < 0) return null; // seção não encontrada: não mexe nas técnicas
        const lista = [];
        let estilo = undefined;
        let cur = null;
        for (let k = ini + 1; k < linhas.length; k++) {
            let t = linhas[k].trim();
            if (/^«▬/.test(t)) break;
            let h = /^«\s*(.+?)\s*»$/.exec(t);
            if (h) {
                fecharTecnica(cur, lista);
                cur = null;
                estilo = idDoEstilo(h[1]);
                continue;
            }
            if (t === "") { fecharTecnica(cur, lista); cur = null; continue; }
            if (/^Treinos Acumulados/i.test(t)) continue;
            if (/^\*/.test(t)) {
                fecharTecnica(cur, lista);
                let raw = /^\*\s+/.test(t) ? t.replace(/^\*\s+/, "") : t; // "* Nome" ou "*Nome* [..]"
                let nao = raw.length > 1 && raw.startsWith("~") && raw.endsWith("~");
                if (nao) raw = raw.slice(1, -1);
                cur = { nome: raw.trim(), naoTreinada: nao, estilo, corpo: [] };
                continue;
            }
            if (cur) {
                let l = t.replace(/^>\s*/, "");
                if (l.length > 1 && l.startsWith("~") && l.endsWith("~")) l = l.slice(1, -1);
                if (l.trim() !== "") cur.corpo.push(l.trim());
            }
        }
        fecharTecnica(cur, lista);
        return lista;
    }

    // Campos de uma linha: título "  : ᓩ _TÍTULO:_" seguido de "> valor".
    const CAMPOS = [
        { chave: "𝐍ᴏᴍᴇ", campo: "@nome" },
        { chave: "𝐀ʟᴛᴜʀᴀ", campo: "altura" },
        { chave: "𝐈ᴅᴀᴅᴇ", campo: "idade", vazio: "(Mínimo: 15)" },
        { chave: "𝐒ᴀɴɢᴜᴇ", campo: "sangue" },
        { chave: "𝐑ᴇᴄʀᴜᴛᴀᴅᴏ ᴘᴏʀ", campo: "recrutadoPor" },
        { chave: "𝐃ɪsᴄɪ", campo: "padrinhoNome", prefixo: true },
        { chave: "𝐍ᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ", campo: "nacionalidade", vazio: "Desconhecida" },
        { chave: "𝐋ᴏᴄᴀʟɪᴢᴀᴄ̧ᴀ̃ᴏ ᴀᴛᴜᴀʟ", campo: "localizacao", vazio: "(Local presente no mapa do RPG)" },
    ];

    function lerCampos(linhas) {
        const achados = {};
        for (let k = 0; k < linhas.length; k++) {
            let m = /^\s*:\s*ᓩ\s*_(.+?):_\s*$/.exec(linhas[k]);
            if (!m) continue;
            let def = CAMPOS.find((c) => (c.prefixo ? m[1].startsWith(c.chave) : m[1] === c.chave));
            if (!def) continue;
            let prox = linhas[k + 1];
            if (prox === undefined || !/^\s*>/.test(prox)) continue;
            let v = prox.replace(/^\s*>\s?/, "").trim();
            if (def.vazio && v === def.vazio) v = "";
            achados[def.campo] = v;
        }
        let tr = linhas.map((l) => /^Treinos Acumulados:\s*([\d.\s]+)/i.exec(l.trim())).find(Boolean);
        if (tr) achados["@treinos"] = parseInt(tr[1].replace(/\D/g, ""), 10) || 0;
        return achados;
    }

    /* --------------------------- aplicar nas caixinhas ----------------------- */
    function tecnicaVisivelNoTexto(t, i) {
        if (!(t.nome || t.desc || t.efeito) || !t.nome || i.hideTecNome) return false;
        if (i.hideNaoTreinadas && t.naoTreinada) return false;
        if (i.showApenasNaoTreinadas && !t.naoTreinada) return false;
        const mapa = window.__estilosMapa || {};
        let nomeGrupo = (t.estilo && mapa[t.estilo]) || "Sem Estilo";
        return !(i.hiddenStyles || []).includes(chaveEstiloSalvo(nomeGrupo));
    }

    function aplicarTecnicas(lidas) {
        const i = currentChar.info;
        if (!lidas || i.hideTecNome) return;
        const existentes = currentChar.tecnicasList;
        const usados = new Set();
        const resultado = existentes.slice();
        let ultimo = -1; // posição (em "resultado") da última técnica lida, para inserir as novas em ordem

        lidas.forEach((p) => {
            let chave = norm(p.nome);
            let idx = existentes.findIndex((t, k) => !usados.has(k) && norm(t.nome) === chave && (t.estilo || "") === (p.estilo || ""));
            if (idx < 0) {
                let cand = existentes.map((t, k) => k).filter((k) => !usados.has(k) && norm(existentes[k].nome) === chave);
                if (cand.length === 1) idx = cand[0];
            }
            if (idx >= 0) {
                usados.add(idx);
                let t = existentes[idx];
                t.nome = p.nome;
                if (!i.hideTecDesc) t.desc = p.desc;
                if (!i.hideTecEfeito) t.efeito = p.efeito;
                t.naoTreinada = p.naoTreinada;
                if (p.estilo !== null && p.estilo !== undefined) t.estilo = p.estilo;
                ultimo = resultado.indexOf(t);
            } else {
                let nova = { nome: p.nome, desc: p.desc, efeito: p.efeito, estilo: p.estilo === null || p.estilo === undefined ? "" : p.estilo, naoTreinada: p.naoTreinada };
                resultado.splice(ultimo + 1, 0, nova);
                ultimo = ultimo + 1;
            }
        });

        // Técnica que aparecia no texto e sumiu: foi apagada à mão.
        existentes.forEach((t, k) => {
            if (!usados.has(k) && tecnicaVisivelNoTexto(t, i)) {
                let pos = resultado.indexOf(t);
                if (pos >= 0) resultado.splice(pos, 1);
            }
        });
        currentChar.tecnicasList = resultado;
    }

    function aplicarCampos(achados) {
        const i = currentChar.info;
        Object.keys(achados).forEach((f) => {
            let v = achados[f];
            if (f === "@nome") { currentChar.name = v; return; }
            if (f === "@treinos") { i.treinosAcumulados = v; return; }
            let el = document.getElementById("info-" + f);
            if (el && el.tagName === "SELECT" && v !== "" && !Array.from(el.options).some((o) => o.value === v)) {
                if (f === "nacionalidade" || f === "localizacao") garantirOpcaoNoSelect(el, v);
                else return; // valor que não existe no seletor: ignora
            }
            i[f] = v;
        });
    }

    // Atualiza caixinhas/abas SEM reescrever o texto que a pessoa está digitando.
    function aplicarNasTelas(regenerarTexto) {
        window.__manualPreservar = !regenerarTexto;
        try {
            if (typeof saveData === "function") saveData();
            if (typeof renderTabs === "function") renderTabs();
            if (typeof renderTecnicas === "function") renderTecnicas();
            updateUI();
            if (typeof toggleEditability === "function") toggleEditability();
        } finally {
            window.__manualPreservar = false;
        }
    }

    function processar() {
        if (!ativo || currentChar !== personagemAtivo) return;
        const texto = resBox.innerText || resBox.textContent || "";
        const linhas = texto.replace(/\r/g, "").split("\n");
        const antes = JSON.stringify(currentChar);
        const fotoAntes = antes;

        let tecnicas = lerTecnicas(linhas);
        let campos = lerCampos(linhas);
        try {
            aplicarTecnicas(tecnicas);
            aplicarCampos(campos);
        } catch (e) {
            console.error("Edição manual:", e);
            let foto = JSON.parse(fotoAntes);
            Object.keys(currentChar).forEach((k) => delete currentChar[k]);
            Object.assign(currentChar, foto);
            aviso.textContent = "Não foi possível ler o texto; nada foi alterado.";
            return;
        }
        if (JSON.stringify(currentChar) === antes) return; // nada mudou de fato
        desfazer.push(fotoAntes);
        if (desfazer.length > 20) desfazer.shift();
        aplicarNasTelas(false);
        aviso.textContent = "Lido e aplicado nas caixinhas.";
        atualizarBotoes();
    }

    resBox.addEventListener("input", () => {
        if (!ativo) return;
        clearTimeout(timer);
        timer = setTimeout(processar, 700);
    });
    resBox.addEventListener("blur", () => {
        if (!ativo) return;
        clearTimeout(timer);
        processar();
    });
    // Colar sempre como texto puro.
    resBox.addEventListener("paste", (e) => {
        if (!ativo) return;
        e.preventDefault();
        let t = (e.clipboardData || window.clipboardData).getData("text");
        document.execCommand("insertText", false, t);
    });

    atualizarBotoes();
})();