import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appKmItem]'
})
export class KeyboardManagedItemDirective {

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  @Output() public focused = new EventEmitter<void>();
  //foca o elemento ao qual a diretiva está sendo aplicada
  public focus(): void {
    this.elementRef.nativeElement.focus();
    this.focused.emit();
  }

  //verifica se o elemento focado é o elemento com o foco ativo no momento
  public isFocused(): boolean {
    return this.elementRef.nativeElement === document.activeElement;
  }
}

//o elementRef é um wrapper. Ele embrulha o elemento original gerenciado por ele.
//no construtor da diretiva eu posso acessar o elemento do DOM ao qual ela está sendo aplicada = (private elementRef: ElementRef<HTMLElement>
//retorna o elemento focado no DOM = document.activeElement