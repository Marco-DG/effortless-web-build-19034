import { registerComponent } from '../../builder/registry';
import { UniversalReservation } from './Reservation';
import { ReservationSchema } from './schema';

export const registerReservation = () => {
    registerComponent('reservation', UniversalReservation, ReservationSchema);
};

export { UniversalReservation, ReservationSchema };
