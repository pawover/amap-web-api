declare namespace AMap {
  namespace DistrictLayer {
    /** 县境线类型 */
    interface CountyStrokeType {
      /** 类别 */
      type: 'County_Border_China';
    }
    /** 市境线类型 */
    interface CityStrokeType {
      /** 类别 */
      type: 'City_Border_China';
    }
    /** 省境线类型 */
    interface ProvinceStrokeType {
      /** 类别 */
      type: 'Province_Border_China' | 'Province_Border_Foreign';
    }
    /** 国境线类型 */
    interface NationStrokeType {
      /** 类别 */
      type: 'Nation_Border_China' | 'Nation_Border_Foreign';
    }
    /** 海岸线类型 */
    interface CoastlineStrokeType {
      type: 'Coastline_China' | 'Coastline_Foreign';
    }
    interface DistrictCenter {
      /** 行政区中心点经度 */
      x: number;
      /** 行政区中心点纬度 */
      y: number;
    }
    /** 行政区参数 */
    interface District extends DistrictCenter {
      /** 国家编码 */
      SOC?: string;
      /** 中文名 */
      NAME_CHN: string;
      /** 行政区编码 */
      adcode: `${number}`;
      /** 市级行政区编码 */
      adcode_cit: string;
      /** 省级行政区编码 */
      adcode_pro: string;
      /** 城市编号（区号） */
      citycode: `${number}`;
      /** 行政级别 */
      level: number;
    }
    interface FillProps extends Partial<District> {
      /** 国家编码 */
      SOC: string;
      /** 中文名 */
      NAME_CHN: string;
      /** 英文名 */
      NAME_ENG: string;
    }
    interface Options extends Layer.Options {
      /**
       * 行政区编码
       * - [下载 adcode 与省市行政区对照表](https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip)
       */
      adcode?: string;
      /**
       * 设定显示国家
       * - [SOC 国家代码、名称、Bounds对照表下载](https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json)
       * @default "CHN"
       */
      SOC?: string;
      /**
       * 设定数据的层级深度，`depth` 为 `0` 的时候只显示国家面，`depth` 为 `1` 的时候显示省级，当国家为中国时设置 `depth` 为 `2` 时可以显示市级
       *
       * @default 0
       */
      depth?: number;
      /**
       * 为简易行政区图设定各面的填充颜色和描边颜色
       * - styles各字段的值可以是颜色值，也可以是一个返回颜色值的函数
       * - 支持的颜色格式有：
       *   - #RRGGBB，如：'#FFFFFF'
       *   - rgba()，如：'rgba(255,255,255,1)'
       *   - rgb()，如：'rgb(255,255,255)'
       *   - [r,g,b,a] ，如：[1,1,1,1]
       *   - ''，代表不赋予颜色
       */
      styles?: {
        fill?: string | ((props: FillProps) => string);
        'stroke-width'?: number | ((...args: any[]) => number);
        /** 县境线 */
        'county-stroke'?: string | ((props: District & CountyStrokeType) => string);
        /** 市境线 */
        'city-stroke'?: string | ((props: District & CityStrokeType) => string);
        /** 省境线 */
        'province-stroke'?: string | ((props: District & ProvinceStrokeType) => string);
        /** 国境线 */
        'nation-stroke'?: string | ((props: District & NationStrokeType) => string);
        /** 海岸线 */
        'coastline-stroke'?: string | ((props: District & CoastlineStrokeType) => string);
      };
    }

    /** 世界简易行政区图层 */
    class World extends DistrictLayer {}
    /** 国家简易行政区图层 */
    class Country extends DistrictLayer {}
    /** 省市简易行政区图层 */
    class Province extends DistrictLayer {}

    interface Events {
      /** 加载完成事件 */
      onComplete?: (event: { type: 'complete' }) => void;
    }
  }

  /**
   * 图层 - 简易行政区
   * - 提供行政区块的数据可视化、行政区边界展示，包括：
   *   - `AMap.DistrictLayer.World` 世界简易行政区图层
   *   - `AMap.DistrictLayer.Country` 国家简易行政区图层
   *   - `AMap.DistrictLayer.Province` 省市简易行政区图层
   *
   * @class DistrictLayer
   * @extends {Layer<DistrictLayer.Options, OverlayEventList>} 抽象类 - 图层
   */
  class DistrictLayer extends Layer<DistrictLayer.Options, OverlayEventList> {
    public World: typeof DistrictLayer.World;
    public Country: typeof DistrictLayer.Country;
    public Province: typeof DistrictLayer.Province;

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {DistrictLayer.Options} options 构造参数
     */
    public constructor(options?: DistrictLayer.Options);

    /** 设定显示的国家 SOC */
    public setSOC(SOC: string): void;
    /** 设置行政区编码，同 `setDistricts` */
    public setAdcode(adcode: string | number | (string | number)[]): void;
    /**
     * 根据当前行政区编码自动缩放地图到合适的视野级别
     *
     * @public
     * @param {(string | number | (string | number)[])} adcode 行政区编码
     * @param {?boolean} [immediately] 是否禁用过渡动画
     * @param {?[number, number, number, number]} [avoid] 四周边距，上、下、左、右
     */
    public setFitViewByAdcode(
      adcode: string | number | (string | number)[],
      immediately?: boolean,
      avoid?: [number, number, number, number],
    ): void;

    /** 获取行政区编码 */
    public getDistricts(): Recordable<string, number> | undefined;
    /** 设置行政区编码，同 `setAdcode` */
    public setDistricts(adcode: string | number | (string | number)[]): void;

    /** 获取样式信息 */
    public getStyle(): DistrictLayer.Options['styles'];
    /** 设置样式信息 */
    public setStyles(styles: DistrictLayer.Options['styles']): void;
  }
}
