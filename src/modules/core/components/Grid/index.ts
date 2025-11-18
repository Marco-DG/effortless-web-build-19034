import { UniversalGrid } from './Grid';
import { GridSchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalGrid, GridSchema };

export function registerGrid() {
    registerComponent(GridSchema.id, UniversalGrid, GridSchema);
}
