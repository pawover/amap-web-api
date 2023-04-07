declare namespace Loca {
  namespace Container {
    interface Options {
      /** 地图实例 */
      map: AMap.Map;
    }
    interface Lights {
      /** 环境光强度 */
      ambIntensity: number;
      /** 环境光颜色 */
      ambLightColor: number[];
      /** 平行光强度 */
      dirIntensity: number;
      /** 平行光颜色 */
      dirLightColor: number[];
      /** 平行光方向 */
      dirVec: number[];
      /** 点光源强度 */
      pointIntensity: number;
      /** 点光源颜色 */
      pointLightColor: number[];
      /** 点光源位置 */
      pointPosition: [number, number, number];
    }
  }

  /**
   * Loca 实例
   * - Loca 的核心控制类，可以控制光源、视角变换、图层渲染等
   *
   * @class Container
   */
  class Container {
    /** 地图的视角控制器，支持连续的视角动画过渡控制 */
    public viewControl: ViewControl;
    /** 帧控制器，控制地图渲染 */
    public animate: Animate;
    /** 环境光属性 */
    public readonly ambLight: AmbientLight.Options;
    /** 平行光属性 */
    public readonly dirLight: DirectionalLight.Options;
    /** 点光源属性 */
    public readonly pointLight: PointLight.Options;
    /** 所有光源对象 */
    public readonly lights: (AmbientLight | DirectionalLight | PointLight)[];

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param {Container.Options} options 数据可视化组件初始化参数
     */
    public constructor(options: Container.Options);

    /** 将一个图层添加到地图上 */
    public add(layer: Layer): void;
    /** 将一个图层从地图上移除 */
    public remove(layer: Layer): void;
    /** 清空所有图层，包括图层的光源 */
    public clear(): void;
    /** 添加一个光源 */
    public addLight(light: AmbientLight | DirectionalLight | PointLight): void;
    /** 删除一个光源 */
    public removeLight(light: AmbientLight | DirectionalLight | PointLight): void;
    /** 清空所有光源 */
    public clearLight(): void;
    /** 销毁 Loca 实例，如果希望同时销毁 Map，那么需要先销毁 Loca 实例，然后销毁 Map 实例 */
    public destroy(): void;
    /** 主动触发地图渲染 */
    public requestRender(): void;
    /** 获取地图中心点经纬度坐标值 */
    public getCenter(): AMap.Vector;
    /** 设置地图中心点 */
    public setCenter(center: AMap.LngLatLike): void;
    /** 获取控件的 dom 容器 */
    public getControlContainer(): HTMLElement;
    /** 获取所有光源的配置参数 */
    public getLights(): Container.Lights;
    /** 获取最高点 */
    public getPitch(): number;
    /** 设置最高点 */
    public setPitch(pitch: number): void;
    /** 获取旋转角度 */
    public getRotation(): number;
    /** 设置旋转角度 */
    public setRotation(rotation: number): void;
    /** 获取当前地图缩放级别 */
    public getZoom(): number;
    /** 设置当前地图缩放级别 */
    public setZoom(zoom: number): void;
  }
}
