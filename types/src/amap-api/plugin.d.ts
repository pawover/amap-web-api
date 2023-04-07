declare namespace AMap {
  /** 高德地图 AMap Web API 插件类型 */
  type Plugin =
    | 'AMap.Adaptor'
    | 'AMap.AdvancedInfoWindow'
    | 'AMap.ArrivalRange'
    | 'AMap.Autocomplete' // AMap Web API 1.4.x
    | 'AMap.AutoComplete' // AMap Web API 2.0
    | 'AMap.CloudDataLayer'
    | 'AMap.CloudDataSearch'
    | 'AMap.CircleEditor'
    | 'AMap.CitySearch'
    | 'AMap.ControlBar'
    | 'AMap.DistrictLayer'
    | 'AMap.DistrictSearch'
    | 'AMap.Driving'
    | 'AMap.DragRoute'
    | 'AMap.ElasticMarker'
    | 'AMap.Geocoder'
    | 'AMap.Geolocation'
    | 'AMap.HawkEye'
    | 'AMap.Heatmap' // AMap Web API 1.4.x
    | 'AMap.HeatMap' // AMap Web API 2.0
    | 'AMap.LineSearch'
    | 'AMap.IndoorMap'
    | 'AMap.MapType'
    | 'AMap.MarkerCluster'
    | 'AMap.MouseTool'
    | 'AMap.MoveAnimation'
    | 'AMap.OverView'
    | 'AMap.PlaceSearch'
    | 'AMap.BezierCurveEditor'
    | 'AMap.EllipseEditor'
    | 'AMap.PolyEditor'
    | 'AMap.PolygonEditor'
    | 'AMap.PolylineEditor'
    | 'AMap.RectangleEditor'
    | 'AMap.RangingTool'
    | 'AMap.Riding'
    | 'AMap.RoadInfoSearch'
    | 'AMap.Scale'
    | 'AMap.StationSearch'
    | 'AMap.TruckDriving'
    | 'AMap.Transfer'
    | 'AMap.ToolBar'
    | 'AMap.Walking'
    | 'AMap.Weather';

  /**
   * 加载插件
   *
   * @param {(Plugin | Plugin[])} plugin 插件名称
   * @param {?() => void} [callback] 回调函数
   */
  function plugin(plugin: Plugin | Plugin[], callback?: () => void): void;
}
