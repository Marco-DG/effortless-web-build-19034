import { UniversalHeader } from './Header';
import { HeaderSchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalHeader, HeaderSchema };

export function registerHeader() {
    registerComponent(HeaderSchema.id, UniversalHeader, HeaderSchema);
}
