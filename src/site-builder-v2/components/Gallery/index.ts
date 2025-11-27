import { UniversalGallery } from './Gallery';
import { GallerySchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalGallery, GallerySchema };

export function registerGallery() {
    registerComponent(GallerySchema.id, UniversalGallery, GallerySchema);
}
