import { Component, DomComponent, Fragment as CoreFragment, Text } from './core.js';

export const Fragment = CoreFragment;

export * from './types/jsx.js';

/**
 * Normalizes JSX children into an array of Components.
 */
function normalizeChildren(children: any): Component[] {
  if (children === null || children === undefined) {
    return [];
  }
  if (Array.isArray(children)) {
    const list: Component[] = [];
    for (const child of children) {
      list.push(...normalizeChildren(child));
    }
    return list;
  }
  if (
    children instanceof Component ||
    (typeof children === 'object' && 'build' in children && typeof children.build === 'function')
  ) {
    return [children];
  }
  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    return [new Text(String(children))];
  }
  if (typeof children === 'object' && Symbol.iterator in children) {
    const list: Component[] = [];
    for (const child of children) {
      list.push(...normalizeChildren(child));
    }
    return list;
  }
  return [];
}

/**
 * Creates a Component from JSX.
 */
export function createComponent(type: any, props: any): Component {
  const { children, ...attributes } = props || {};
  const normalizedChildren = normalizeChildren(children);

  if (typeof type === 'string') {
    // Standard HTML or Blogger tag
    return new DomComponent(type, attributes, ...normalizedChildren);
  }

  if (typeof type === 'function') {
    // Component class or function
    // We check if it is a Component class by seeing if it has a build method on its prototype
    if (type.prototype && typeof type.prototype.build === 'function') {
      // It is a Component class
      // We pass both attributes and children in the config
      const config = { ...attributes };
      if (normalizedChildren.length > 0) {
        config.children = normalizedChildren;
      }
      return new (type as any)(config);
    } else {
      // Functional component
      return type({ ...props, children: normalizedChildren });
    }
  }

  throw new Error(`Invalid JSX element type: ${type}`);
}

export function jsx(type: any, props: any, key?: any): Component {
  return createComponent(type, props);
}

export function jsxs(type: any, props: any, key?: any): Component {
  return createComponent(type, props);
}

export function jsxDEV(type: any, props: any, key?: any, isStaticChildren?: boolean, source?: any, self?: any): Component {
  return createComponent(type, props);
}

/**
 * Classic JSX / Hyperscript factory `h`
 */
export function h(type: any, props: any, ...children: any[]): Component {
  const normalizedProps = { ...(props || {}) };
  if (children.length > 0) {
    normalizedProps.children = children.length === 1 ? children[0] : children;
  }
  return createComponent(type, normalizedProps);
}
