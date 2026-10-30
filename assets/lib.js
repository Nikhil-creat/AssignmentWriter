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
    relevant(q, t) { const ks = L.keyTerms(q); if (!ks.length) return true; const low = t.toLowerCase();
      return ks.filter(k => low.includes(k.slice(0, Math.max(4, k.length - 2)))).length / ks.length >= 0.5; },
    count: t => ({ w: (t.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_|=`\-:]+/g, ' ').match(/\S+/g) || []).length,
      d: (t.match(/```mermaid/g) || []).length, t: (t.match(/^\|.*\|[ \t]*\n\|[ \t:|-]+\|/gm) || []).length })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.ASW = L;
})(typeof window !== 'undefined' ? window : globalThis);
