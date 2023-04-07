declare namespace AMap {
  type Vector = [number, number];
  type LngLatLike = LngLat | Vector | ControlPoint;
  type SizeLike = Size | Vector;
  type PixelLike = Pixel | Vector;
  type BoundsLike = Bounds | number[];
  type StrokeLineJoin = 'miter' | 'round' | 'bevel';
  type StrokeLineCap = 'butt' | 'round' | 'square';
  type StrokeStyle = 'dashed' | 'solid';
  type Direction = 'top' | 'right' | 'bottom' | 'left' | 'center';
  type Animations = 'AMAP_ANIMATION_NONE' | 'AMAP_ANIMATION_DROP' | 'AMAP_ANIMATION_BOUNCE';
  type MapLayers = RoadNet | Satellite | TileLayer | Traffic;
  type Overlays = OverlayRecord[keyof OverlayRecord];
  type Controls = ControlBar | HawkEye | Geolocation | MapType | Scale | ToolBar;
  type Layers =
    | MapLayers
    | BuildingLayer
    | Buildings
    | CanvasLayer
    | CustomLayer
    | DistrictLayer
    | Flexible
    | GLCustomLayer
    | Heatmap
    | HeatMap
    | ImageLayer
    | IndoorMap
    | LabelsLayer
    | LayerGroup
    | VectorLayer
    | VideoLayer
    | WMS
    | WMTS;
  type PositionDirection =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  type CursorStyle =
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'e-resize'
    | 'n-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'w-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'col-resize'
    | 'row-resize'
    | 'all-scroll'
    | 'zoom-in'
    | 'zoom-out';

  interface OverlayRecord {
    bezierCurve: BezierCurve;
    ellipse: Ellipse;
    marker: Marker;
    circle: Circle;
    circleMarker: CircleMarker;
    labelMarker: LabelMarker;
    polyline: Polyline;
    polygon: Polygon;
    rectangle: Rectangle;
  }
  // | ContextMenu
  // | InfoWindow
}
