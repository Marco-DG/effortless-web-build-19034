import { registerComponent } from '../../builder/registry';
import { UniversalFeatures } from './Features';
import { FeaturesSchema } from './schema';

export const registerFeatures = () => {
    registerComponent('features', UniversalFeatures, FeaturesSchema);
};

export { UniversalFeatures, FeaturesSchema };
