declare namespace AMap {
  namespace Browser {
    /**
     * 当前浏览器 userAgent
     */
    const ua: string;
    /**
     * 是否 移动设备
     */
    const mobile: boolean;
    /**
     * 平台类型，如：'windows'、'mac'、'ios'、'android'、'other'
     */
    const plat: 'windows' | 'mac' | 'ios' | 'android' | 'other';
    /**
     * 是否 mac 设备
     */
    const mac: boolean;
    /**
     * 是否 windows 设备
     */
    const windows: boolean;
    /**
     * 是否 iOS 设备
     */
    const ios: boolean;
    /**
     * 是否 iPad 设备
     */
    const iPad: boolean;
    /**
     * 是否 iPhone 设备
     */
    const iPhone: boolean;
    /**
     * 是否 Android 设备
     */
    const android: boolean;
    /**
     * 是否 Android 4 以下系统
     */
    const android23: boolean;
    /**
     * 是否 Chrome浏览器
     */
    const chrome: boolean;
    /**
     * 是否 火狐浏览器
     */
    const firefox: boolean;
    /**
     * 是否 Safari浏览器
     */
    const safari: boolean;
    /**
     * 是否 微信
     */
    const wechat: boolean;
    /**
     * 是否 UC浏览器
     */
    const uc: boolean;
    /**
     * 是否 QQ 或 QQ浏览器
     */
    const qq: boolean;
    /**
     * 是否 IE
     */
    const ie: boolean;
    /**
     * 是否 IE6
     */
    const ie6: boolean;
    /**
     * 是否 IE7
     */
    const ie7: boolean;
    /**
     * 是否 IE8
     */
    const ie8: boolean;
    /**
     * 是否 IE9
     */
    const ie9: boolean;
    /**
     * 是否 IE10
     */
    const ie10: boolean;
    /**
     * 是否 IE11
     */
    const ie11: boolean;
    /**
     * 是否 Edge浏览器
     */
    const edge: boolean;
    /**
     * 是否 IE9 以下
     */
    const ielt9: boolean;
    /**
     * 是否 百度浏览器
     */
    const baidu: boolean;
    /**
     * 是否支持 LocaStorage
     */
    const isLocalStorage: boolean;
    /**
     * 是否支持 Geolocation
     */
    const isGeolocation: boolean;
    /**
     * 是否 Webkit移动浏览器
     */
    const mobileWebkit: boolean;
    /**
     * 是否支持 Css3D 的 Webkit移动端浏览器
     */
    const mobileWebkit3d: boolean;
    /**
     * 是否 Opera移动浏览器
     */
    const mobileOpera: boolean;
    /**
     * 是否 高清屏幕，devicePixelRatio>1
     */
    const retina: boolean;
    /**
     * 是否 触屏
     */
    const touch: boolean;
    /**
     * 是否 msPointer设备
     */
    const msPointer: boolean;
    /**
     * 是否 pointer设备
     */
    const pointer: boolean;
    /**
     * 是否 webkit浏览器
     */
    const webkit: boolean;
    /**
     * 是否支持 Css3D 的 Webkit浏览器
     */
    const webkit3d: boolean;
    /**
     * 是否支持 WebAssembly
     */
    const wasm: boolean;
    /**
     * 是否支持 Css3D 的 ie浏览器
     */
    const ie3d: boolean;
    /**
     * 是否支持 Css3D 的 gecko浏览器
     */
    const gecko3d: boolean;
    /**
     * 是否支持 Css3D 的 opera浏览器
     */
    const opera3d: boolean;
    /**
     * 是否支持 Css3D 的 浏览器
     */
    const any3d: boolean;
    /**
     * 是否支持 canvas
     */
    const isCanvas: boolean;
    /**
     * 是否支持 svg
     */
    const isSvg: boolean;
    /**
     * 是否支持 vml
     */
    const isVML: boolean;
    /**
     * 是否支持 WebWorker
     */
    const isWorker: boolean;
    /**
     * 是否支持 WebSocket
     */
    const isWebsocket: boolean;
    /**
     * 是否支持 WebGL
     * - AMap Web API 1.x 中为 `function` 类型
     * - AMap Web API 2.x 中为 `boolean` 类型
     */
    const isWebGL: boolean | (() => boolean);
    /**
     * 检测是否支持 WebGL
     */
    function checkWebGL(): boolean;
  }
}
