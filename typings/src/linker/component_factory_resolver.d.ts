/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../type';
import { ComponentFactory } from './component_factory';
export declare function noComponentFactoryError(component: Function): Error;
export declare function getComponent(error: Error): Type<any>;
/**
 * @stable
 */
export declare abstract class ComponentFactoryResolver {
    static NULL: ComponentFactoryResolver;
    abstract resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
}
export declare class CodegenComponentFactoryResolver implements ComponentFactoryResolver {
    private _parent;
    private _factories;
    constructor(factories: ComponentFactory<any>[], _parent: ComponentFactoryResolver);
    resolveComponentFactory<T>(component: {
        new (...args: any[]): T;
    }): ComponentFactory<T>;
}
