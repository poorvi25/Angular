import { trigger, state, animate, transition, style } from '@angular/animations';
export function visibility(){
    return trigger('visibility', [
        state('shown', style({
          transform: 'scale(1.0)',
          opacity: 1
        })),
        state('hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
      ]);
}

export function flyInOut(){
    return trigger('flyInOut', [
        //* means any state
        state('*', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        //void state to any state (:enter)
        //coming in application
        transition(':enter',[
            style({ 
                transform: 'translateX(-100%)', 
                opacity: 0
            }),
            animate('500ms ease-in')
        ]),
        //any state to void state(:leave)
        //leaves the application
        transition(':leave',[
            animate('500ms ease-out', style({ 
                transform: 'translateX(100%)', 
                opacity: 0
            }))
        ])
    ])
}
//expand view from fetched data 
export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity:0 }),
            animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}