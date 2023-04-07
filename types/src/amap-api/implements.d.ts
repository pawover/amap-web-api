declare namespace AMap {
  /** 成对的 Get/Set 方法 */
  namespace GetSet {
    /** 所属地图 */
    interface Maps {
      /** 获取所属地图 */
      getMap: (() => Map | null) | undefined;
      /** 设置所属地图 */
      setMap: ((map: Map | null) => void) | undefined;
    }
    /** 锚点 */
    interface Anchor {
      /** 获取锚点 */
      getAnchor: (() => PositionDirection | PixelLike) | undefined;
      /** 设置锚点 */
      setAnchor: ((anchor: PositionDirection | PixelLike) => void) | undefined;
    }
    /** 覆盖范围 */
    interface Bound {
      /** 获取覆盖范围 */
      getBounds: (() => Bounds | undefined) | undefined;
      /** 设置覆盖范围 */
      setBounds:
        | ((bounds: BoundsLike, immediately?: boolean, avoid?: [number, number, number, number]) => void)
        | undefined;
    }
    /** 中心点 */
    interface Center {
      /** 获取中心点 */
      getCenter: (() => LngLat) | undefined;
      /** 设置中心点 */
      setCenter: ((center: LngLatLike) => void) | undefined;
    }
    /** 是否支持鼠标单击事件 */
    interface Clickable {
      /** 获取是否支持鼠标单击事件 */
      getClickable: (() => boolean) | undefined;
      /** 设置是否支持鼠标单击事件 */
      setClickable: ((clickable: boolean) => void) | undefined;
    }
    /** 鼠标样式 */
    interface Cursor {
      /** 获取鼠标悬停时的鼠标样式 */
      getCursor: (() => CursorStyle) | undefined;
      /** 设置鼠标悬停时的鼠标样式 */
      setCursor: ((cursor: CursorStyle) => void) | undefined;
    }
    /** 拖拽移动 */
    interface Draggable {
      /** 获取是否可拖拽移动 */
      getDraggable: (() => boolean) | undefined;
      /** 设置是否可拖拽移动 */
      setDraggable: ((draggable: boolean) => void) | undefined;
    }
    /** 自定义数据 */
    interface ExtData {
      /** 获取自定义数据 */
      getExtData: (() => unknown) | undefined;
      /** 设置自定义数据 */
      setExtData: (<D>(extraData: D) => void) | undefined;
    }
    /** 偏移量 */
    interface Offset {
      /** 获取偏移量 */
      getOffset: (() => Pixel) | undefined;
      /** 设置偏移量 */
      setOffset: ((offset: PixelLike) => void) | undefined;
    }
    /** 透明度 */
    interface Opacity {
      /** 获取透明度 */
      getOpacity: (() => number) | undefined;
      /** 设置透明度 */
      setOpacity: ((opacity: number) => void) | undefined;
    }
    /** 属性配置 */
    interface Options<O> {
      /** 获取属性配置 */
      getOptions: (() => O) | undefined;
      /** 设置属性配置 */
      setOptions: ((options: O) => void) | undefined;
    }
    /** 位置 */
    interface Position {
      /** 获取位置 */
      getPosition: (() => LngLat) | undefined;
      /** 设置位置 */
      setPosition: ((position: LngLatLike) => void) | undefined;
    }
    /** 半径 */
    interface Radius {
      /** 获取半径 */
      getRadius: (() => number) | undefined;
      /** 设置半径 */
      setRadius: ((radius: number) => void) | undefined;
    }
    /** 显示级别范围 */
    interface Zooms {
      /** 获取显示级别范围 */
      getZooms: (() => [number, number]) | undefined;
      /** 设置显示级别范围 */
      setZooms: ((zooms: [number, number]) => void) | undefined;
    }
    /** 叠加层级 */
    interface ZIndex {
      /** 获取叠加层级 */
      getzIndex: (() => number) | undefined;
      /** 设置叠加层级，默认最先添加的在最底层 */
      setzIndex: ((zIndex: number) => void) | undefined;
    }
    /**
     * 高度
     * @deprecated AMap Web API 2.0 中已废弃
     */
    interface Height {
      /** 获取高度 */
      getHeight: (() => number | string) | undefined;
      /** 设置高度 */
      setHeight: ((height?: number | string) => void) | undefined;
    }
  }
}
