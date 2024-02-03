export class Pager {
    currentPage = 1;
    firstPage = 1;
    lastPage: number;
    private PER_PAGE = 10;
    private total: number;
    paginas: number[] = [];
    pagesInPager = 5;
    newCurrentPage: number = null;
    pagerType: 'ss' | 'cs' = 'cs';
    firstPageInPager = 1;
    lastPageInPager = 1;

    MostrarPaginacion = false;
    firstGeneration = true;
    showLoading = false;
    showNoRowMessage = false;

    get totalRecords(): number {
        return this.total;
    }
    set totalRecords(value: number) {
        this.total = value;

        this.setLastPage();
    }

    get perPage(): number {
        return this.PER_PAGE;
    }
    set perPage(value: number) {
        this.PER_PAGE = value;

        this.setLastPage();
    }

    GenerateSs(obj: any): void {
        const totalRec = getInitialized(obj.totalRecords, this.total);
        const perPage = getInitialized(obj.per_page, this.PER_PAGE);

        if (this.total !== totalRec) {
            this.totalRecords = totalRec;
        }
        if (this.PER_PAGE !== perPage) {
            this.perPage = perPage;
        }

        this.lastPage = getInitialized(obj.paginas, this.lastPage);
        this.pagesInPager = getInitialized(obj.pagesInPager, this.pagesInPager);

        const paginaActual = getInitialized(obj.pagina, this.newCurrentPage, 1);

        if (this.firstGeneration) {
            this.paginas = [];
        }

        if (paginaActual === this.currentPage && !this.firstGeneration) {
            return;
        } else if (paginaActual > this.currentPage) {
            if (paginaActual === this.lastPage) {
                if (this.paginas.indexOf(paginaActual) === -1) {
                    let lstPaginas = [];
                    let pageNumber = this.pagesInPager + 1;

                    whPaginadores:
                    while (pageNumber < this.lastPage) {
                        lstPaginas = [];
                        for (let i = 0; i <= this.pagesInPager; i++) {
                            lstPaginas.push(pageNumber);
                            if (pageNumber >= this.lastPage) {
                                break whPaginadores;
                            }
                            pageNumber++;
                        }
                        pageNumber--;
                    }

                    this.paginas = lstPaginas;
                }
            } else if (paginaActual === this.paginas[this.pagesInPager - 1] + 1) {
                const lstPaginas = [];
                let nextPage = this.paginas[this.pagesInPager - 1] + 1;

                for (let i = 0; i < this.pagesInPager; i++) {
                    lstPaginas.push(nextPage);
                    if (nextPage === this.lastPage) {
                        break;
                    }
                    nextPage++;
                }
                this.paginas = lstPaginas;
            }
        } else {
            if (paginaActual === 1) {
                const lstPaginas = [];

                for (let i = 0; i < this.pagesInPager; i++) {
                    if ((i + 1) > this.lastPage) {
                        break;
                    }
                    lstPaginas.push(i + 1);
                }

                this.paginas = lstPaginas;
                this.firstGeneration = false;
            } else if (paginaActual === this.paginas[0] - 1) {
                const lstPaginas = [];
                let nextPage = this.paginas[0] - 1;

                for (let i = this.pagesInPager - 1; i >= 0; i--) {
                    lstPaginas.push(nextPage);
                    nextPage--;
                }

                this.paginas = lstPaginas.reverse();
            }
        }

        this.firstPageInPager = this.paginas.length > 0 ? this.paginas[0] : 1;
        this.lastPageInPager = this.paginas.length > 0 ? this.paginas[this.paginas.length - 1] : 1;
        this.currentPage = paginaActual;
        this.newCurrentPage = null;

        if (this.paginas.length === 1) {
            if (this.paginas[0] === 1) {
                this.MostrarPaginacion = false;
            }
        } else if (this.paginas.length > 0) {
            this.MostrarPaginacion = true;
        } else {
            this.MostrarPaginacion = false;
        }
    }

    GenerateCs(obj: any): void {
        const b4TotalRec = this.totalRecords;
        const totalRec = getInitialized(obj.totalRecords, this.total);
        const perPage = getInitialized(obj.per_page, this.PER_PAGE);

        if (this.total !== totalRec) {
            this.totalRecords = totalRec;
        }
        if (this.PER_PAGE !== perPage) {
            this.perPage = perPage;
        }

        this.lastPage = getInitialized(obj.paginas, this.lastPage);
        this.pagesInPager = getInitialized(obj.pagesInPager, this.pagesInPager);

        const paginaActual = getInitialized(obj.pagina, this.newCurrentPage, 1);

        if (this.paginas.indexOf(paginaActual) === -1 || b4TotalRec !== totalRec) {
            const lstPaginas = [];
            const numCompleto = paginaActual / this.pagesInPager;
            const numDecimales = (numCompleto) % 1;
            const numEntero = numCompleto - numDecimales;
            const paginaInicial = (numDecimales === 0 ? numEntero - 1 : numEntero) * this.pagesInPager;

            for (let i = 1; i <= this.pagesInPager && i <= this.lastPage; i++) {
                const pagina = paginaInicial + i;

                lstPaginas.push(pagina);

                if (pagina === this.lastPage) {
                    break;
                }
            }

            this.paginas = lstPaginas;
        }

        this.firstPageInPager = this.paginas.length > 0 ? this.paginas[0] : 1;
        this.lastPageInPager = this.paginas.length > 0 ? this.paginas[this.paginas.length - 1] : 1;
        this.currentPage = paginaActual;
        this.newCurrentPage = null;

        if (this.paginas.length === 1 && this.paginas[0] === 1) {
            this.MostrarPaginacion = false;
        } else if (this.paginas.length > 0) {
            this.MostrarPaginacion = true;
        } else {
            this.MostrarPaginacion = false;
        }
    }

    Generate(obj: any): void {
        if (this.pagerType === 'ss') {
            this.GenerateSs(obj);
        } else {
            this.GenerateCs(obj);
        }
    }

    setLastPage(): void {
        let pages = this.total / this.PER_PAGE;
        if (Math.floor(pages) < pages) {
            pages = Math.floor(pages) + 1;
        } else {
            pages = Math.floor(pages);
        }
        this.lastPage = pages;
    }
}

function getInitialized(...args: any[]): any {
    for (const arg of args) {
        if (arg !== null && typeof arg !== 'undefined') {
            return arg;
        }
    }
}
