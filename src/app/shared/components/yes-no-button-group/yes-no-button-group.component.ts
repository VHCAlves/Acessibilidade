import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @Input() public value: string = null;
  @Input() public label = '';
  @Output() public valueChange = new EventEmitter<string>();

  public options = YesNoButtonGroupOptions;
  public onChange = (value: string) => { };
  public onTouched = () => { };
  public id: string = null;

  constructor(uniqueIdService: UniqueIdService) {
    this.id = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  ngOnInit(): void {
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string): void {
    this.writeValue(value);
    this.onChange(this.value);
    this.valueChange.emit(this.value)
  }
}

enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}

//no binding para o atributo de um elemento, se você retorna null, o atributo não é criado.

//Dica: se você precisa de um botão que esteja desabilitado mas que ainda possa ganhar foco, utilize o atributo aria-disabled. Screen readers irão anunciar o elemento como disabled, mas lembre-se: você precisará garantir que a ação do botão só seja disparada quando ele estiver habilitado novamente, geralmente no método chamado pelo botão.
