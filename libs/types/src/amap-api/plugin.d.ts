declare namespace AMap {
  /** 高德地图 AMap Web API 插件类型 */
  type Plugin =
    | "AMap.Adaptor"
    | "AMap.AdvancedInfoWindow"
    | "AMap.ArrivalRange"
    | "AMap.Autocomplete" // AMap Web API 1.4.x
    | "AMap.AutoComplete" // AMap Web API 2.x
    | "AMap.BezierCurveEditor"
    | "AMap.CircleEditor"
    | "AMap.CitySearch"
    | "AMap.CloudDataLayer"
    | "AMap.CloudDataSearch"
    | "AMap.ControlBar"
    | "AMap.DistrictLayer"
    | "AMap.DistrictSearch"
    | "AMap.DragRoute"
    | "AMap.Driving"
    | "AMap.ElasticMarker"
    | "AMap.EllipseEditor"
    | "AMap.Geocoder"
    | "AMap.Geolocation"
    | "AMap.HawkEye"
    | "AMap.Heatmap" // AMap Web API 1.4.x
    | "AMap.HeatMap" // AMap Web API 2.x
    | "AMap.IndoorMap"
    | "AMap.LineSearch"
    | "AMap.MapType"
    | "AMap.MarkerCluster"
    | "AMap.MouseTool"
    | "AMap.MoveAnimation"
    | "AMap.OverView"
    | "AMap.PlaceSearch"
    | "AMap.PolyEditor"
    | "AMap.PolygonEditor"
    | "AMap.PolylineEditor"
    | "AMap.RangingTool"
    | "AMap.RectangleEditor"
    | "AMap.Riding"
    | "AMap.RoadInfoSearch"
    | "AMap.Scale"
    | "AMap.StationSearch"
    | "AMap.ToolBar"
    | "AMap.Transfer"
    | "AMap.TruckDriving"
    | "AMap.Walking"
    | "AMap.Weather";

  /**
   * 加载插件
   *
   * @param {(Plugin | Plugin[])} plugin 插件名称
   * @param {?() => void} [callback] 回调函数
   */
  function plugin(plugin: Plugin | Plugin[], callback?: () => void): void;
}
