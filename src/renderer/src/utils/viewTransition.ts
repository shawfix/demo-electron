// 支持时用视图过渡动画执行主题切换，否则退化为直接切换
export const transitionViewIfSupported = (updateCb: () => void): void => {
  // 系统开启「减弱动态效果」时跳过动画，尊重用户偏好
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateCb();
    return;
  }
  // 浏览器支持视图过渡 API 才用，老环境直接切换
  if (document.startViewTransition) {
    document.startViewTransition(updateCb);
  } else {
    updateCb();
  }
};
