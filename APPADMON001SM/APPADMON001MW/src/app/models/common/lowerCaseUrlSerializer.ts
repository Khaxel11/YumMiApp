import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(this.lowerCaseUrl(url));
    }

    lowerCaseUrl(url: string): string{
        const iH = url.indexOf('#');
        const iQ = url.indexOf('?');

        const index = iH === -1 && iQ === -1 ? url.length :
            iH === -1 ? iQ :
            iQ === -1 ? iH :
            iH < iQ ? iH : iQ;
        const urlPart1 = url.substring(0, index).toLowerCase();
        const urlPart2 = url.substring(index, url.length);
        return urlPart1 + urlPart2;
    }
}
