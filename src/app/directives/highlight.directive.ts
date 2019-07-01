import { Directive, ElementRef, Renderer2, HostListener, Host } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

    //when mouse is on the element it will highlight
    @HostListener('mouseenter') onmouseenter(){
     //addClass(supported by rendered) is used to add an item to gridlist
     //highlight is a class in style.scss 
     this.renderer.addClass(this.el.nativeElement, 'highlight');
    }
    //remove highlight when mouse leave
    @HostListener('mouseleave') onmouseleave(){
      //removeClass(supported by rendered)
      this.renderer.removeClass(this.el.nativeElement, 'highlight');
    }
}
