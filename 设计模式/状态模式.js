/**
 * @see https://juejin.cn/post/6916295399326105613
 * 在每个状态类里控制自身行为，两种，开关机和切换模式 ，并且通过吹风机类获得吹风机的状态，
 * 状态类解耦了，都通过吹风机实例获取到当前的状态
 */

// 抽象的状态，这应该是个抽象类不允许实例化
class State {
  // 开关
  turnOnOrOff() {
    console.log("----按下吹风机【开关机】按钮----");
  }
  // 切换模式
  switchMode() {
    console.log("----按下吹风机【切换模式】按钮----");
  }
}

// 吹风机的关机状态
class OffState extends State {
  constructor(hairDryer) {
    super();
    this.hairDryer = hairDryer;
  }
  // 开关机按钮
  turnOnOrOff() {
    super.turnOnOrOff();
    this.hairDryer.setState(this.hairDryer.getHotAirState());
    console.log("状态切换: 关闭状态 => 开机热风状态");
  }
  // 切换模式按钮
  switchMode() {
    console.log("===吹风机在关闭的状态下无法切换模式===");
  }
}

// 吹风机的开机热风状态
class HotAirState extends State {
  constructor(hairDryer) {
    super();
    this.hairDryer = hairDryer;
  }
  // 开关机按钮
  turnOnOrOff() {
    super.turnOnOrOff();
    this.hairDryer.setState(this.hairDryer.getOffState());
    console.log("状态切换: 开机热风状态 => 关闭状态");
  }
  // 切换模式按钮
  switchMode() {
    super.switchMode();
    this.hairDryer.setState(this.hairDryer.getAlternateHotAndColdAirState());
    console.log("状态切换: 开机热风状态 => 开机冷热风交替状态");
  }
}

// 吹风机的开机冷热风交替状态
class AlternateHotAndColdAirState extends State {
  constructor(hairDryer) {
    super();
    this.hairDryer = hairDryer;
  }
  // 开关机按钮
  turnOnOrOff() {
    super.turnOnOrOff();
    this.hairDryer.setState(this.hairDryer.getOffState());
    console.log("状态切换: 开机冷热风交替状态 => 关闭状态");
  }
  // 切换模式按钮
  switchMode() {
    super.switchMode();
    this.hairDryer.setState(this.hairDryer.getColdAirState());
    console.log("状态切换: 开机冷热风交替状态 => 开机冷风状态");
  }
}

// 吹风机的开机冷风状态
class ColdAirState extends State {
  constructor(hairDryer) {
    super();
    this.hairDryer = hairDryer;
  }
  // 开关机按钮
  turnOnOrOff() {
    super.turnOnOrOff();
    this.hairDryer.setState(this.hairDryer.getOffState());
    console.log("状态切换: 开机冷风状态 => 关闭状态");
  }
  // 切换模式按钮
  switchMode() {
    super.switchMode();
    this.hairDryer.setState(this.hairDryer.getHotAirState());
    console.log("状态切换: 开机冷风状态 => 开机热风状态");
  }
}

// 状态模式
// 吹风机
class HairDryer {
  // 构造函数
  constructor(state) {
    this.offState = new OffState(this);
    this.hotAirState = new HotAirState(this);
    this.alternateHotAndColdAirState = new AlternateHotAndColdAirState(this);
    this.coldAirState = new ColdAirState(this);
    if (state) {
      this.state = state;
    } else {
      // 默认是关机状态
      this.state = this.offState;
    }
  }

  // 设置吹风机的状态
  setState(state) {
    this.state = state;
  }

  // 开关机按钮
  turnOnOrOff() {
    this.state.turnOnOrOff();
  }
  // 切换模式按钮
  switchMode() {
    this.state.switchMode();
  }

  // 获取吹风机的关机状态
  getOffState() {
    return this.offState;
  }
  // 获取吹风机的开机热风状态
  getHotAirState() {
    return this.hotAirState;
  }
  // 获取吹风机的开机冷热风交替状态
  getAlternateHotAndColdAirState() {
    return this.alternateHotAndColdAirState;
  }
  // 获取吹风机的开机冷风状态
  getColdAirState() {
    return this.coldAirState;
  }
}

const hairDryer = new HairDryer();
// 打开吹风机
hairDryer.turnOnOrOff();
// 切换模式
hairDryer.switchMode();
// 切换模式
hairDryer.switchMode();
// 切换模式
hairDryer.switchMode();
// 关闭吹风机
hairDryer.turnOnOrOff();
// 吹风机在关闭的状态下无法切换模式
hairDryer.switchMode();
