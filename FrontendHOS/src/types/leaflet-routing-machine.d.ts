declare module 'leaflet-routing-machine' {
  import * as L from 'leaflet';

  namespace Routing {
    interface ControlOptions extends L.ControlOptions {
      waypoints?: L.LatLngExpression[];
      routeWhileDragging?: boolean;
    }
  }

  function control(options?: Routing.ControlOptions): L.Control;
  namespace control {}
  export { control };
}
