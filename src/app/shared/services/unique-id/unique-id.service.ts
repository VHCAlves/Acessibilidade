import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {

  constructor() { }

  public generateUniqueIdWithPrefix(prefix: string): string {
    const uniqueId = this.generateUniqueID();
    return `${prefix}-${uniqueId}`;
  }

  private generateUniqueID(): string {
    return uuid.v1();
  }
}
