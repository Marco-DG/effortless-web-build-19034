import { UniversalMenu } from './Menu';
import { MenuSchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalMenu, MenuSchema };

export function registerMenu() {
    registerComponent(MenuSchema.id, UniversalMenu, MenuSchema);
}
