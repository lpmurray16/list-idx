import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';

@Directive({
  selector: '[appLoading]',
  standalone: true,
})
export class LoadingDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appLoading(loading: boolean) {
    this.viewContainer.clear();
    if (loading) {
      this.viewContainer.createComponent(LoaderComponent);
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
