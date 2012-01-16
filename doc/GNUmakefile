MAIN = main.ltx
#
# Note: specialfigs are ones for which you don't want a .tex file,
# just a .pdf file (so that you can scale it with includegraphics).
#
# Any .fig files not listed under SPECIALFIGS will generate a .tex and
# a .pdf file, and if you don't include the .tex file you may miss
# some text.
#
SPECIALFIGS = lfs_l.fig lfs_s.fig

BASE := $(basename $(MAIN))
ALLXFIGS := $(wildcard *.fig)
XFIGS := $(filter-out $(SPECIALFIGS), $(ALLXFIGS))
TEXFIGS := $(XFIGS:.fig=.tex)
PDFFIGS := $(ALLXFIGS:.fig=.pdf)
TEXFILES := $(sort $(MAIN) $(wildcard *.tex) $(TEXFIGS))
BIBFILES := $(wildcard *.bib)
STYFILES := $(wildcard *.sty)

LATEX = pdflatex \\nonstopmode\\input
BIBTEX = bibtex -min-crossrefs=1000

XGRAPHS := $(wildcard graph/*.gnuplot)
EPSGRAPHS := $(XGRAPHS:.gnuplot=.eps)
PDFGRAPHS := $(XGRAPHS:.gnuplot=.pdf)

all: $(BASE).pdf

graph/%.eps: graph/%.gnuplot graph/%.data
	cd graph && gnuplot ../$<
graph/%.pdf: graph/%.eps
	epstopdf --outfile=$@ $<
%.pdf %.tex: %.fig
	fig2dev -L pdftex -p1 $< > $*.pdf
	fig2dev -L pstex_t -p $*.pdf $< > $*.tex
$(SPECIALFIGS:.fig=.pdf): %.pdf: %.fig
	fig2dev -L pdf -p1 $< > $*.pdf

RERUN = egrep -q '(^LaTeX Warning:|\(natbib\)).* Rerun'
UNDEFINED = egrep -q '^(LaTeX|Package natbib) Warning:.* undefined'

$(BASE).pdf: $(TEXFILES) $(STYFILES) $(BIBFILES) $(PDFFIGS) $(PDFGRAPHS)
	test ! -s $*.aux || $(BIBTEX) $(BASE) || rm -f $(BASE).aux $(BASE).bbl
	$(LATEX) $(MAIN)
	@if test ! -f $(BASE).bbl || $(RERUN) $(BASE).log \
			|| $(UNDEFINED) $(BASE).log; then \
		set -x; \
		$(BIBTEX) $(BASE); \
		$(LATEX) $(MAIN); \
		! $(RERUN) $(BASE).log || $(LATEX) $(MAIN); \
		! $(RERUN) $(BASE).log || $(LATEX) $(MAIN); \
	fi
	test ! -f .xpdf-running || xpdf -remote $(BASE)-server -reload
	touch $(BASE).dvi

.SECONDARY: $(BASE).pdf $(EPSGRAPHS)

preview: $(BASE).pdf
	open $(BASE).pdf;

ignore:
	rm -f .gitignore
	for file in '*~' '*.aux' '*.bbl' '*.blg' '*.log' '*.dvi' '*.bak' \
			.xpdf-running $(TEXFIGS) $(PDFFIGS) \
			$(EPSGRAPHS) $(PDFGRAPHS) \
			$(BASE).pdf; do \
		echo "$$file" >> .gitignore; \
	done
	git add .gitignore

clean:
	rm -f $(BASE).pdf
	rm -f $(TEXFIGS) $(PDFFIGS) $(EPSGRAPHS) $(PDFGRAPHS)
	rm -f *.dvi *.aux *.log *.bbl *.blg *.lof *.lot *.toc *.bak
	rm -f *~ *.core core

spell:
	for A in *.{tex,ltx}; do aspell -t -p ./aspell.words -c $$A; done

.PHONY: clean all ignore preview spell
