declare namespace AMap {
  type Vector = [number, number];
  type PointLike = LngLat | ControlPoint;
  type LngLatLike = PointLike | Vector;
  type SizeLike = Size | Vector;
  type PixelLike = Pixel | Vector;
  type BoundsLike = Bounds | number[];
  type FourSide = [number, number, number, number];
  type StrokeLineJoin = 'miter' | 'round' | 'bevel';
  type StrokeLineCap = 'butt' | 'round' | 'square';
  type StrokeStyle = 'dashed' | 'solid';
  type Direction = 'top' | 'right' | 'bottom' | 'left' | 'center';
  type Animations = 'AMAP_ANIMATION_NONE' | 'AMAP_ANIMATION_DROP' | 'AMAP_ANIMATION_BOUNCE';
  type MapLayerType = RoadNet | Satellite | TileLayer | Traffic;
  type ControlType = ControlBar | HawkEye | Geolocation | MapType | Scale | ToolBar;
  type OverlayType =
    | BezierCurve
    | Ellipse
    | Marker
    | LabelMarker
    | CircleMarker
    | Circle
    | Polyline
    | Polygon
    | Rectangle
    | InfoWindow;
  // | ContextMenu;
  type LayerType =
    | MapLayerType
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
}
