import { Injectable, ViewContainerRef } from "@angular/core";
import { Aso } from "../models/aso.model";
import { PdfPageComponent } from "../components/pdf-page/pdf-page.component";
// @ts-ignore 
import * as html2pdf from 'html2pdf.js';

export type OutputType = 'download' | 'newWindow';

@Injectable({
	providedIn: 'root'
})
export class PdfService {

    createPDF(containerRef: ViewContainerRef, aso: Aso, outputType: OutputType): void {
		containerRef.clear();
		const componentRef = containerRef.createComponent(PdfPageComponent);

		componentRef.instance.aso = aso;

		componentRef.instance.emitter.subscribe(() => {
			const config = {
				html2canvas: {
                    scale: 3,
                    scrollX: 0,
                    scrollY: 0,
				},
			};

            if(outputType === 'download'){
                this.downloadPdf(componentRef.location.nativeElement, config, aso);
            } else {
                this.openPdf(componentRef.location.nativeElement, config);
            }
			componentRef.destroy();

		});
	}

	private openPdf(content: any, config: any): void {
		html2pdf()
		.set(config)
		.from(content)
		.toPdf()
		.outputPdf('dataurlnewwindow')
	}

    private downloadPdf(content: any, config: any, aso: Aso): void {
		html2pdf()
		.set(config)
		.from(content)
		.toPdf()
		.save(`ASO_${aso.tipoASO}_${this.getFullName(aso)}`)
	}

	private getFullName(aso: Aso){
		let fullName = aso.pessoa.primeiroNome;
		aso.pessoa.ultimoNome.split(' ').forEach(name => {
			fullName = fullName.concat(`_${name}`)
		})

		console.log(fullName)
		return fullName;
	}
}