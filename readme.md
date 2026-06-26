# Reviewer Response

A LaTeX template for writing structured **reviewer response letters** — the kind journals ask for after a revise-and-resubmit. Comments, author replies, and revised manuscript excerpts live in one document with consistent formatting, per-section bibliographies, and citation numbers aligned to your paper.

**Live demo:** open [`ui/index.html`](ui/index.html) in a browser, or browse the static site in [`ui/`](ui/).

**Author:** [Tan Jing Jie](https://jingjietan.com/)

---

## Features

- **Colour-coded blocks** — reviewer comments (grey), author responses (green), and manuscript change excerpts (orange) are easy to scan.
- **One file per reviewer** — `reviewer1.tex`, `reviewer2.tex`, … keep long rebuttals manageable.
- **Merged comments** — group related reviewer points in a single `reviewercomment` block and split your reply with `\SplitChangeSection` where needed.
- **Citation numbers match your paper** — copy the cite order from your manuscript `.bbl` / `.aux` into `rr_paper_cite_order.tex` so `\cite{key}` in the response uses the same numbers as the submitted manuscript.
- **Per-section bibliographies** — each comment segment ends with `\RRSectionBibliography`; only references cited in that segment are printed.
- **Tracked-changes PDF** — append a latexdiff output (`diff.pdf`) at the end for journals that require a marked-up revised manuscript.
- **Cover letter & associate editor** — optional `coverletter.tex` and `associateeditor.tex` chapters use the same environments.

---

## Quick start

### Overleaf (recommended)

1. Open the template: [overleaf.com/read/pymfgmnhtmbq](https://www.overleaf.com/read/pymfgmnhtmbq#e5f83a)
2. **Menu → Copy project** into your account.
3. Edit `reviewer*.tex`, `coverletter.tex`, and metadata in `main.tex`, then recompile `main.tex`.

### GitHub / local

```bash
git clone https://github.com/jingjie00/reviewer-response.git
cd reviewer-response/source
latexmk -pdf main.tex
```

Requirements: a TeX distribution with `latexmk`, `biber`, and standard packages. The class file is `reviewerresponse.sty` (`\usepackage{reviewerresponse}`).

---

## Repository layout

```
reviewer-response/
├── source/                  # LaTeX template — compile main.tex here
│   ├── main.tex             # Document structure, metadata, includes
│   ├── reviewerresponse.sty # Class/style (loaded by main.tex)
│   ├── coverletter.tex
│   ├── associateeditor.tex  # Optional; uncomment in main.tex
│   ├── reviewer1.tex …      # One file per reviewer
│   ├── references.bib
│   ├── rr_paper_cite_order.tex
│   └── img/                 # Figure PDFs for authorchange blocks
└── ui/                      # Static promo / documentation site
    ├── index.html
    ├── sample.pdf           # Example compiled output
    └── …
```

---

## Customizing the template

### Metadata (`main.tex`)

Set these before `\begin{document}`:

| Command | Purpose |
|--------|---------|
| `\RRManuscriptTitle` | Title shown on the cover page and cover letter |
| `\RRManuscriptMeta` | Manuscript ID or submission reference |
| `\RRAuthorBlock` | Author names, affiliation, or contact block |

### Comment structure

Each response section typically follows this pattern:

```latex
\section{Comment 1.1}
\begin{reviewercomment}
  … reviewer text …
\end{reviewercomment}

\begin{refsegment}
\begin{authorresponse}
  … your reply; use \cite{key} as needed …
\end{authorresponse}

\begin{authorchange}
  \TitleChangeSection{Section X.Y: …}
  … revised manuscript excerpt, figures, tables …
\end{authorchange}
\RRSectionBibliography
\end{refsegment}
```

- **`reviewercomment`** — quote or paraphrase the reviewer (supports merged sub-comments).
- **`authorresponse`** — your point-by-point reply.
- **`authorchange`** — optional excerpt showing what changed in the manuscript; use `\TitleChangeSection{…}` for a heading.
- **`\RRSectionBibliography`** — prints references cited only in this segment.

Swap placeholder figures in `img/fig-*.pdf` for your own PDFs or images.

### Associate editor

Uncomment the associate-editor block in `main.tex` and set `\RRChapterRole` as needed. The same environments apply.

---

## Citation numbering

Journals often require response-letter citations to use the **same numbers as the original paper**. This template defers numbering to match your manuscript bibliography order.

1. Compile your **paper** and locate citation order in `manuscript.aux` (or copy keys from `manuscript.bbl`).
2. Edit `rr_paper_cite_order.tex` — list keys in that order inside `\RRApplyPaperCiteOrder`.
3. Keep `\RRApplyPaperCiteOrder` in `main.tex` (already enabled).
4. Add any **rebuttal-only** references to `references.bib` and append their keys after the manuscript keys in `rr_paper_cite_order.tex`.

Each `\RRSectionBibliography` then lists only what was cited in that comment block.

**Optional:** if you compile the paper in the same project, `\RRExternalManuscript{manuscript}` can read `manuscript.aux` for cross-references (see comment at top of `main.tex`).

---

## Tracked changes (latexdiff)

Many journals want a PDF of the revised manuscript with additions and deletions highlighted.

1. Paste your **submitted** and **revised** `.tex` files into [LaTeX Different](https://latexdiff.web.app/) (in-browser, nothing uploaded).
2. Compile the generated `diff.tex` to `diff.pdf`.
3. Replace `tracked-changes-guide.pdf` in `source/`, or change the `\includepdf` path in `main.tex`:

   ```latex
   \includepdf[pages=-]{diff.pdf}
   ```

Blue = added text; red = removed text (standard latexdiff colouring).

---

## Building & troubleshooting

```bash
cd source
latexmk -pdf main.tex    # full build (runs biber for bibliographies)
latexmk -c               # clean auxiliary files
```

Common issues:

- **Missing `reviewerresponse.sty`** — ensure the `.sty` file is in `source/` (or on your TEXINPUTS path).
- **Bibliography empty** — check `references.bib`, run `latexmk` (not plain `pdflatex` once), and confirm keys in `\cite{…}` match the `.bib` file.
- **Wrong cite numbers** — re-check key order in `rr_paper_cite_order.tex` against your paper’s `.bbl`.

Build artifacts (`*.aux`, `*.log`, `*.bbl`, …) are listed in [`.gitignore`](.gitignore).

---

## Links

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/jingjie00/reviewer-response |
| Overleaf template | https://www.overleaf.com/read/pymfgmnhtmbq#e5f83a |
| LaTeX Different (latexdiff) | https://latexdiff.web.app/ |
| Author | https://jingjietan.com/ |

---

## License

Use and adapt freely for your own rebuttals. If you publish a fork or derivative, a link back to the original repo is appreciated.
