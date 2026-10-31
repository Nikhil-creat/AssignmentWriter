// Pure helpers (also unit-testable in Node)
(function (root) {
  const STOP = new Set('explain describe discuss write about with what are the and for from into using give briefly detail details define differentiate distinguish compare between list state short note notes example examples diagram draw neat marks mark any that this these those their how why when which where used working types type'.split(' '));
  const L = {
    clean: t => String(t).replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/^\s*(below is|here is|here's|sure[,!.]|certainly|of course)[^\n]*\n+/i, '').trim(),
    stripNum: s => s.replace(/^\s*(?:q(?:uestion)?\s*)?\d{1,2}\s*[\).:\-]\s*/i, '').trim(),
    detectMarks(q, allowed) { const m = q.match(/(?:\(|\[|\b)(\d{1,2})\s*(?:marks?|m)\b/i), n = m && +m[1]; return allowed.includes(n) ? n : null; },
    detectType(q) {
      if (/\b(program|code|algorithm|implement|pseudo|function|script)\b/i.test(q)) return 'program';
      if (/\b(differentiate|distinguish|compare|comparison|versus|vs\.?|difference)\b/i.test(q)) return 'compare';
      if (/\b(calculate|compute|solve|numerical|evaluate|determine|find the)\b/i.test(q)) return 'numerical';
      if (/\b(short note|write a note|brief note|write short)\b/i.test(q)) return 'note';
      return 'theory';
    },
    detectDiag(q, type) {
      if (/flow ?chart/i.test(q)) return 'flowchart';
      if (/sequence|handshake|message exchange|request.*response/i.test(q)) return 'sequence';
      if (/\ber\b|entity|er diagram/i.test(q)) return 'er';
      if (/class diagram|uml|inherit|object.oriented|\boop\b/i.test(q)) return 'class';
      if (/state (diagram|machine)|life ?cycle|\bfsm\b|automata/i.test(q)) return 'state';
      if (/timeline|history|evolution|generations/i.test(q)) return 'timeline';
      if (/mind ?map|classification|categories|types of/i.test(q)) return 'mindmap';
      if (/gantt|project plan/i.test(q)) return 'gantt';
      if (type === 'program' || /algorithm|steps|process|procedure|phases|stages|working/i.test(q)) return 'flowchart';
      return 'auto';
    },
    keyTerms: q => [...new Set((q.toLowerCase().match(/[a-z][a-z0-9+#]{3,}/g) || []).filter(w => !STOP.has(w)))].slice(0, 8),
    relevant(q, t) { const ks = L.keyTerms(q); if (!ks.length) return true; const low = t.toLowerCase(), head = low.slice(0, 500), st = k => k.slice(0, Math.max(4, k.length - 2));
      return ks.filter(k => low.includes(st(k))).length / ks.length >= 0.5 && ks.some(k => head.includes(st(k))); },
    detectLang(q) {
      if (/c\+\+|\bcpp\b/i.test(q)) return { name: 'C++', tag: 'cpp' };
      if (/\bjava\b(?!\s*script)/i.test(q)) return { name: 'Java', tag: 'java' };
      if (/\bpython\b/i.test(q)) return { name: 'Python', tag: 'python' };
      if (/javascript|\bjs\b|node\.?js/i.test(q)) return { name: 'JavaScript', tag: 'javascript' };
      if (/\bsql\b|\bquery\b|\bqueries\b/i.test(q)) return { name: 'SQL', tag: 'sql' };
      if (/\bc (program|language|code)\b|\b(in|using) c\b/i.test(q)) return { name: 'C', tag: 'c' };
      return null;
    },
    polish(t) { let code = false;
      return String(t).split('\n').filter(l => { if (/^\s*```/.test(l)) { code = !code; return true; } if (code) return true;
        return !/(would|will|can|could)\s+(fetch|secure|score|earn|get)\b.*\bmarks?\b|full\s+\d+\s*marks?|jntuh|exam answer|answer sheet|\bmermaid\b/i.test(l); }).join('\n').replace(/\n{3,}/g, '\n\n').trim(); },
    dropEmptyHeadings: t => String(t).replace(/^#{1,4}[^\n]*(flowchart|diagram|chart|figure|sequence|mind ?map|timeline|gantt)[^\n]*\n+(?=#{1,4}\s|(?![\s\S]))/gim, '').replace(/\n{3,}/g, '\n\n').trim(),
    mermaidSanitize(c) { c = String(c); if (!/^\s*(flowchart|graph)\b/m.test(c)) return c;
      return c.split('\n').map(l => /^\s*(%%|subgraph|end\b|style|classDef|class\b|click|linkStyle)/.test(l) ? l :
        l.replace(/\[([^\]"\n]*[()<>{}&|#;][^\]"\n]*)\]/g, '["$1"]').replace(/\{([^}"\n]*[()<>&|#;][^}"\n]*)\}/g, '{"$1"}')).join('\n'); },
    parseVerdict(t) { try { return JSON.parse(String(t).match(/\{[\s\S]*\}/)[0]); } catch { return null; } },
    count: t => ({ w: (t.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_|=`\-:]+/g, ' ').match(/\S+/g) || []).length,
      d: (t.match(/```mermaid/g) || []).length, t: (t.match(/^\|.*\|[ \t]*\n\|[ \t:|-]+\|/gm) || []).length })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.ASW = L;
})(typeof window !== 'undefined' ? window : globalThis);
