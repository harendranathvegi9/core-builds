export declare const AUTO_STYLE: string;
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link trigger trigger animation function} is called.
 */
export declare class AnimationEntryMetadata {
    name: string;
    definitions: AnimationStateMetadata[];
    constructor(name: string, definitions: AnimationStateMetadata[]);
}
export declare abstract class AnimationStateMetadata {
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link state state animation function} is called.
 */
export declare class AnimationStateDeclarationMetadata extends AnimationStateMetadata {
    stateNameExpr: string;
    styles: AnimationStyleMetadata;
    constructor(stateNameExpr: string, styles: AnimationStyleMetadata);
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the
 * {@link transition transition animation function} is called.
 */
export declare class AnimationStateTransitionMetadata extends AnimationStateMetadata {
    stateChangeExpr: string;
    steps: AnimationMetadata;
    constructor(stateChangeExpr: string, steps: AnimationMetadata);
}
export declare abstract class AnimationMetadata {
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link keyframes keyframes animation function} is called.
 */
export declare class AnimationKeyframesSequenceMetadata extends AnimationMetadata {
    steps: AnimationStyleMetadata[];
    constructor(steps: AnimationStyleMetadata[]);
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link style style animation function} is called.
 */
export declare class AnimationStyleMetadata extends AnimationMetadata {
    styles: Array<string | {
        [key: string]: string | number;
    }>;
    offset: number;
    constructor(styles: Array<string | {
        [key: string]: string | number;
    }>, offset?: number);
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link animate animate animation function} is called.
 */
export declare class AnimationAnimateMetadata extends AnimationMetadata {
    timings: string | number;
    styles: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata;
    constructor(timings: string | number, styles: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata);
}
export declare abstract class AnimationWithStepsMetadata extends AnimationMetadata {
    constructor();
    readonly steps: AnimationMetadata[];
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link sequence sequence animation function} is called.
 */
export declare class AnimationSequenceMetadata extends AnimationWithStepsMetadata {
    private _steps;
    constructor(_steps: AnimationMetadata[]);
    readonly steps: AnimationMetadata[];
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link group group animation function} is called.
 */
export declare class AnimationGroupMetadata extends AnimationWithStepsMetadata {
    private _steps;
    constructor(_steps: AnimationMetadata[]);
    readonly steps: AnimationMetadata[];
}
/**
 * `animate` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `animate` specifies an animation step that will apply the provided `styles` data for a given amount of
 * time based on the provided `timing` expression value. Calls to `animate` are expected to be
 * used within {@link sequence an animation sequence}, {@link group group}, or {@link transition transition}.
 *
 * ### Usage
 *
 * The `animate` function accepts two input parameters: `timing` and `styles`:
 *
 * - `timing` is a string based value that can be a combination of a duration with optional
 * delay and easing values. The format for the expression breaks down to `duration delay easing`
 * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000, delay=100, easing=ease-out`.
 * If a numeric value is provided then that will be used as the `duration` value in millisecond form.
 * - `styles` is the style input data which can either be a call to {@link style style} or {@link keyframes keyframes}.
 * If left empty then the styles from the destination state will be collected and used (this is useful when
 * describing an animation step that will complete an animation by {@link transition#the-final-animate-call animating to the final state}).
 *
 * ```typescript
 * // various functions for specifying timing data
 * animate(500, style(...))
 * animate("1s", style(...))
 * animate("100ms 0.5s", style(...))
 * animate("5s ease", style(...))
 * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
 *
 * // either style() of keyframes() can be used
 * animate(500, style({ background: "red" }))
 * animate(500, keyframes([
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function animate(timing: string | number, styles?: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata): AnimationAnimateMetadata;
/**
 * `group` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
 * are useful when a series of styles must be animated/closed off
 * at different statrting/ending times.
 *
 * The `group` function can either be used within a {@link sequence sequence} or a {@link transition transition}
 * and it will only continue to the next instruction once all of the inner animation steps
 * have completed.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `group` animation function can either consist
 * of {@link style style} or {@link animate animate} function calls. Each call to `style()` or `animate()`
 * within a group will be executed instantly (use {@link keyframes keyframes} or a
 * {@link animate#usage animate() with a delay value} to offset styles to be applied at a later time).
 *
 * ```typescript
 * group([
 *   animate("1s", { background: "black" }))
 *   animate("2s", { color: "white" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function group(steps: AnimationMetadata[]): AnimationGroupMetadata;
/**
 * `sequence` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
 * by default when an array is passed as animation data into {@link transition transition}.)
 *
 * The `sequence` function can either be used within a {@link group group} or a {@link transition transition}
 * and it will only continue to the next instruction once each of the inner animation steps
 * have completed.
 *
 * To perform animation styling in parallel with other animation steps then
 * have a look at the {@link group group} animation function.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `sequence` animation function can either consist
 * of {@link style style} or {@link animate animate} function calls. A call to `style()` will apply the
 * provided styling data immediately while a call to `animate()` will apply its styling
 * data over a given time depending on its timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 })),
 *   animate("1s", { opacity: 1 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function sequence(steps: AnimationMetadata[]): AnimationSequenceMetadata;
/**
 * `style` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `style` declares a key/value object containing CSS properties/styles that can then
 * be used for {@link state animation states}, within an {@link sequence animation sequence}, or as styling data for both {@link animate animate} and {@link keyframes keyframes}.
 *
 * ### Usage
 *
 * `style` takes in a key/value string map as data and expects one or more CSS property/value
 * pairs to be defined.
 *
 * ```typescript
 * // string values are used for css properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical (pixel) values are also supported
 * style({ width: 100, height: 0 })
 * ```
 *
 * #### Auto-styles (using `*`)
 *
 * When an asterix (`*`) character is used as a value then it will be detected from the element being animated
 * and applied as animation data when the animation starts.
 *
 * This feature proves useful for a state depending on layout and/or environment factors; in such cases
 * the styles are calculated just before the animation starts.
 *
 * ```typescript
 * // the steps below will animate from 0 to the
 * // actual height of the element
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function style(tokens: string | {
    [key: string]: string | number;
} | Array<string | {
    [key: string]: string | number;
}>): AnimationStyleMetadata;
/**
 * `state` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `state` declares an animation state within the given trigger. When a state is
 * active within a component then its associated styles will persist on
 * the element that the trigger is attached to (even when the animation ends).
 *
 * To animate between states, have a look at the animation {@link transition transition}
 * DSL function. To register states to an animation trigger please have a look
 * at the {@link trigger trigger} function.
 *
 * #### The `void` state
 *
 * The `void` state value is a reserved word that angular uses to determine when the element is not apart
 * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the associated element
 * is void).
 *
 * #### The `*` (default) state
 *
 * The `*` state (when styled) is a fallback state that will be used if
 * the state that is being animated is not declared within the trigger.
 *
 * ### Usage
 *
 * `state` will declare an animation state with its associated styles
 * within the given trigger.
 *
 * - `stateNameExpr` can be one or more state names separated by commas.
 * - `styles` refers to the {@link style styling data} that will be persisted on the element once the state
 * has been reached.
 *
 * ```typescript
 * // "void" is a reserved name for a state and is used to represent
 * // the state in which an element is detached from from the application.
 * state("void", style({ height: 0 }))
 *
 * // user-defined states
 * state("closed", style({ height: 0 }))
 * state("open, visible", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function state(stateNameExpr: string, styles: AnimationStyleMetadata): AnimationStateDeclarationMetadata;
/**
 * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `keyframes` specifies a collection of {@link style style} entries each optionally characterized by an `offset` value.
 *
 * ### Usage
 *
 * The `keyframes` animation function is designed to be used alongside the {@link animate animate}
 * animation function. Instead of applying animations from where they are
 * currently to their destination, keyframes can describe how each style entry is applied
 * and at what point within the animation arc (much like CSS Keyframe Animations do).
 *
 * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
 * what percentage of the animate time the styles will be applied.
 *
 * ```typescript
 * // the provided offset values describe when each backgroundColor value is applied.
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * Alternatively, if there are no `offset` values used within the style entries then the offsets will
 * be calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function keyframes(steps: AnimationStyleMetadata[]): AnimationKeyframesSequenceMetadata;
/**
 * `transition` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `transition` declares the {@link sequence sequence of animation steps} that will be run when the provided
 * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2` which consists
 * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
 *
 * Animation transitions are placed within an {@link trigger animation trigger}. For an transition to animate to
 * a state value and persist its styles then one or more {@link state animation states} is expected to be defined.
 *
 * ### Usage
 *
 * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on what the
 * previous state is and what the current state has become. In other words, if a transition is defined that
 * matches the old/current state criteria then the associated animation will be triggered.
 *
 * ```typescript
 * // all transition/state changes are defined within an animation trigger
 * trigger("myAnimationTrigger", [
 *   // if a state is defined then its styles will be persisted when the
 *   // animation has fully completed itself
 *   state("on", style({ background: "green" })),
 *   state("off", style({ background: "grey" })),
 *
 *   // a transition animation that will be kicked off when the state value
 *   // bound to "myAnimationTrigger" changes from "on" to "off"
 *   transition("on => off", animate(500)),
 *
 *   // it is also possible to do run the same animation for both directions
 *   transition("on <=> off", animate(500)),
 *
 *   // or to define multiple states pairs separated by commas
 *   transition("on => off, off => void", animate(500)),
 *
 *   // this is a catch-all state change for when an element is inserted into
 *   // the page and the destination state is unknown
 *   transition("void => *", [
 *     style({ opacity: 0 }),
 *     animate(500)
 *   ]),
 *
 *   // this will capture a state change between any states
 *   transition("* => *", animate("1s 0s")),
 * ])
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div @myAnimationTrigger="myStatusExp">...</div>
 * ```
 *
 * #### The final `animate` call
 *
 * If the final step within the transition steps is a call to `animate()` that **only**
 * uses a timing value with **no style data** then it will be automatically used as the final animation
 * arc for the element to animate itself to the final state. This involves an automatic mix of
 * adding/removing CSS styles so that the element will be in the exact state it should be for the
 * applied state to be presented correctly.
 *
 * ```
 * // start off by hiding the element, but make sure that it animates properly to whatever state
 * // is currently active for "myAnimationTrigger"
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function transition(stateChangeExpr: string, steps: AnimationMetadata | AnimationMetadata[]): AnimationStateTransitionMetadata;
/**
 * `trigger` is an animation-specific function that is designed to be used inside of Angular2's animation
 * DSL language. If this information is new, please navigate to the
 * {@link ComponentMetadata#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `trigger` Creates an animation trigger which will a list of {@link state state} and {@link transition transition}
 * entries that will be evaluated when the expression bound to the trigger changes.
 *
 * Triggers are registered within the component annotation data under the
 * {@link ComponentMetadata#animations-anchor animations section}. An animation trigger can
 * be placed on an element within a template by referencing the name of the
 * trigger followed by the expression value that the trigger is bound to
 * (in the form of `@triggerName="expression"`.
 *
 * ### Usage
 *
 * `trigger` will create an animation trigger reference based on the provided `name` value.
 * The provided `animation` value is expected to be an array consisting of {@link state state} and {@link transition transition}
 * declarations.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div @myAnimationTrigger="myStatusExp">...</div>
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 */
export declare function trigger(name: string, animation: AnimationMetadata[]): AnimationEntryMetadata;
