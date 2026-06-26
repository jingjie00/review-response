# Reviewer Response

LaTeX template for structured reviewer responses — colour-coded comments, per-section bibliographies, and tracked-change PDFs.

- **LaTeX source:** [`source/`](source/) — compile `main.tex` with `latexmk -pdf`
- **Promo site:** [`ui/`](ui/) — static HTML/CSS/JS

```bash
git clone https://github.com/jingjie00/reviewer-response.git
cd reviewer-response/source && latexmk -pdf main.tex
```

The class file is `reviewerresponse.sty` (`\usepackage{reviewerresponse}`).
