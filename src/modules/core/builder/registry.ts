import React from 'react';
import { ComponentDefinition, ComponentSchema } from './types';

// The Registry Store
const registry: Record<string, ComponentDefinition> = {};

/**
 * Register a new component to the builder engine.
 * @param type The unique identifier for the component (e.g., 'hero', 'features')
 * @param component The React component to render
 * @param schema The schema defining the component's editable fields
 */
export function registerComponent(
    type: string,
    component: React.FC<any>,
    schema: ComponentSchema
) {
    if (registry[type]) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Component "${type}" is already registered. Overwriting.`);
        }
    }

    registry[type] = {
        component,
        schema
    };

    if (process.env.NODE_ENV === 'development') {
        console.log(`[Registry] Registered component: ${type}`);
    }
}

/**
 * Retrieve a component definition by its type.
 */
export function getComponentDefinition(type: string): ComponentDefinition | undefined {
    return registry[type];
}

/**
 * Retrieve just the React component for rendering.
 */
export function getComponent(type: string): React.FC<any> | undefined {
    return registry[type]?.component;
}

/**
 * Get all registered component schemas (for the Editor UI).
 */
export function getAllSchemas(): ComponentSchema[] {
    return Object.values(registry).map(def => def.schema);
}

/**
 * Debug: List all registered components
 */
export function getRegistryDebugInfo() {
    return Object.keys(registry);
}
