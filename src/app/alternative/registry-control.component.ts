import { RegistryService } from '../../../feature/registry/registry.service';
import { ValidationMessage } from './registry-base.model';

export class RegistryControlComponent {

  constructor(protected registryService: RegistryService) {}

  public hasInfo = (control: string) => this.registryService.hasInfo(control);
  public openInfo = (control: string) => this.registryService.openInfo(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryService.getValidations(control);
  public isInvalid = (control: string, validationType: string): boolean =>
    this.registryService.isInvalid(control, validationType);
}
